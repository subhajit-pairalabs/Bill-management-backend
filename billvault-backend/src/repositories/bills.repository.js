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

const findBills = async (userId) => {
    const { data, error } = await supabase
        .from('bills')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
};

const findBillById = async (userId, billId) => {
    const { data, error } = await supabase
        .from('bills')
        .select('*')
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

module.exports = {
    createBill,
    findBills,
    findBillById,
    updateBill,
    softDeleteBill
};
