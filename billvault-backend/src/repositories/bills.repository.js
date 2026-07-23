/**
 * @file repositories/bills.repository.js
 */
const { supabase } = require('../config/database');

const createBill = async (userId, billData) => {
    const payload = {
        ...billData,
        user_id: userId
    };

    const { data, error } = await supabase
        .from('bills')
        .insert([payload])
        .select('*')
        .single();

    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return data;
};

const getBillStats = async (userId) => {
    const { data: statsData } = await supabase
        .from('bills')
        .select('category_id, warranty_until, purchase_date, total_amount, bill_items(warranty_months)')
        .eq('user_id', userId)
        .is('deleted_at', null);

    let activeWarrantyCount = 0;
    let activeCategoryCount = 0;
    let totalAmountSum = 0;

    if (statsData) {
        const categories = new Set();
        const now = new Date();
        
        statsData.forEach(bill => {
            if (bill.category_id) {
                categories.add(bill.category_id);
            }
            
            if (bill.total_amount) {
                totalAmountSum += Number(bill.total_amount) || 0;
            }
            
            let hasActiveWarranty = false;
            
            if (bill.warranty_until && new Date(bill.warranty_until) >= now) {
                hasActiveWarranty = true;
            } else if (bill.purchase_date && bill.bill_items && bill.bill_items.length > 0) {
                const purchaseDate = new Date(bill.purchase_date);
                for (const item of bill.bill_items) {
                    if (item.warranty_months) {
                        const expiryDate = new Date(purchaseDate);
                        expiryDate.setMonth(expiryDate.getMonth() + item.warranty_months);
                        if (expiryDate >= now) {
                            hasActiveWarranty = true;
                            break;
                        }
                    }
                }
            }
            
            if (hasActiveWarranty) {
                activeWarrantyCount++;
            }
        });
        
        activeCategoryCount = categories.size;
    }
    
    return { activeWarrantyCount, activeCategoryCount, totalAmountSum };
};

const findBills = async (userId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const [billsRes, stats] = await Promise.all([
        supabase
            .from('bills')
            .select('*, bill_items(*), attachments(id, file_name, mime_type, file_size, created_at), category:categories(id, name, icon, color, description)', { count: 'exact' })
            .eq('user_id', userId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1),
        getBillStats(userId)
    ]);

    const { data, error, count } = billsRes;

    if (error) {
        throw new Error(error.message);
    }

    return {
        bills: data || [],
        stats,
        pagination: {
            total: count || 0,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit)
        }
    };
};

const searchBills = async (userId, q, category, paymentStatus, page = 1, limit = 10) => {
    const safeQ = q.replace(/,/g, ' ').trim();
    const searchPattern = `%${safeQ}%`;
    const offset = (page - 1) * limit;

    const p1 = supabase
        .from('bills')
        .select('id')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .or(`invoice_number.ilike.${searchPattern},purchase_location.ilike.${searchPattern},notes.ilike.${searchPattern}`);

    const p2 = supabase
        .from('bills')
        .select('id, categories!inner(name)')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .ilike('categories.name', searchPattern);

    const p3 = supabase
        .from('bills')
        .select('id, bill_items!inner(item_name,description)')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .or(`item_name.ilike.${searchPattern},description.ilike.${searchPattern}`, { foreignTable: 'bill_items' });

    const [res1, res2, res3, stats] = await Promise.all([p1, p2, p3, getBillStats(userId)]);

    if (res1.error) throw new Error(res1.error.message);
    if (res2.error && res2.error.code !== 'PGRST116') throw new Error(res2.error.message);
    if (res3.error && res3.error.code !== 'PGRST116') throw new Error(res3.error.message);

    const matchedIds = new Set([
        ...(res1.data || []).map(b => b.id),
        ...(res2.data || []).map(b => b.id),
        ...(res3.data || []).map(b => b.id)
    ]);

    if (matchedIds.size === 0) {
        return {
            bills: [],
            stats,
            pagination: { total: 0, page, limit, totalPages: 0 }
        };
    }

    let query = supabase
        .from('bills')
        .select('*, bill_items(*), attachments(id, file_name, mime_type, file_size, created_at), category:categories!inner(id, name, icon, color, description)', { count: 'exact' })
        .eq('user_id', userId)
        .is('deleted_at', null)
        .in('id', Array.from(matchedIds));

    if (category) {
        query = query.ilike('categories.name', `%${category}%`);
    }
    
    if (paymentStatus) {
        query = query.eq('payment_status', paymentStatus);
    }

    query = query.order('created_at', { ascending: false })
                 .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return {
        bills: data || [],
        stats,
        pagination: {
            total: count || 0,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit)
        }
    };
};

const findBillById = async (userId, billId) => {
    const { data, error } = await supabase
        .from('bills')
        .select('*, bill_items(*), attachments(id, file_name, mime_type, file_size, created_at), category:categories(id, name, icon, color, description)')
        .eq('user_id', userId)
        .eq('id', billId)
        .is('deleted_at', null)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is No Rows
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }

    return data || null;
};

const updateBill = async (userId, billId, updateData) => {
    const { data, error } = await supabase
        .from('bills')
        .update(updateData)
        .eq('user_id', userId)
        .eq('id', billId)
        .is('deleted_at', null)
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const softDeleteBill = async (userId, billId) => {
    const { data, error } = await supabase
        .from('bills')
        .update({ deleted_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('id', billId)
        .is('deleted_at', null)
        .select('*')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

const hardDeleteBill = async (userId, billId) => {
    const { error } = await supabase
        .from('bills')
        .delete()
        .eq('user_id', userId)
        .eq('id', billId);

    if (error) {
        throw new Error(error.message);
    }

    return true;
};

const createBillItems = async (itemsArray) => {
    if (!itemsArray || itemsArray.length === 0) return [];

    const { data, error } = await supabase
        .from('bill_items')
        .insert(itemsArray)
        .select('*');

    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }

    return data;
};

const deleteBillItems = async (billId) => {
    const { error } = await supabase
        .from('bill_items')
        .delete()
        .eq('bill_id', billId);

    if (error) {
        throw new Error(error.message);
    }
    return true;
};

module.exports = {
    createBill,
    findBills,
    searchBills,
    findBillById,
    updateBill,
    softDeleteBill,
    hardDeleteBill,
    createBillItems,
    deleteBillItems
};
