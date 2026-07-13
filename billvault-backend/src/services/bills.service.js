/**
 * @file services/bills.service.js
 */
const billsRepository = require('../repositories/bills.repository');
const ApiError = require('../utils/ApiError');

const createBill = async (jwtUser, payload) => {
    const userId = jwtUser.sub;
    const { bill_items, ...billData } = payload;

    let finalBillData = { ...billData };
    let processedItems = [];

    if (bill_items && bill_items.length > 0) {
        let subtotal = 0;
        let calculatedTax = 0;
        processedItems = bill_items.map(item => {
            const quantity = Number(item.quantity);
            const unitPrice = Number(item.unit_price);
            const lineTotal = quantity * unitPrice;
            const itemTax = Number(item.tax_amount ?? 0);

            subtotal += lineTotal;
            calculatedTax += itemTax;

            return {
                ...item,
                total_price: lineTotal
            };
        });

        const taxAmount = calculatedTax;
        const discountAmount = Number(finalBillData.discount_amount || 0);

        finalBillData.subtotal = subtotal;
        finalBillData.tax_amount = taxAmount;
        finalBillData.total_amount = subtotal + taxAmount - discountAmount;
    }

    try {
        const createdBill = await billsRepository.createBill(userId, finalBillData);

        if (processedItems.length > 0) {
            const itemsToInsert = processedItems.map(item => ({
                ...item,
                bill_id: createdBill.id
            }));
            await billsRepository.createBillItems(itemsToInsert);
        }

        return await billsRepository.findBillById(userId, createdBill.id);
    } catch (error) {
        if (error.code === '23503') { // Foreign Key Violation
            throw new ApiError(400, 'Invalid merchant_id or category_id');
        }
        throw error;
    }
};

const getBills = async (jwtUser) => {
    const userId = jwtUser.sub;
    return await billsRepository.findBills(userId);
};

const getBillById = async (jwtUser, billId) => {
    const userId = jwtUser.sub;
    const bill = await billsRepository.findBillById(userId, billId);

    if (!bill) {
        throw new ApiError(404, 'Bill not found');
    }

    return bill;
};

const updateBill = async (jwtUser, billId, payload) => {
    const userId = jwtUser.sub;
    const { bill_items, ...billData } = payload;

    // Check existence and ownership first to throw a clean 404
    const bill = await billsRepository.findBillById(userId, billId);
    if (!bill) {
        throw new ApiError(404, 'Bill not found');
    }

    let finalBillData = { ...billData };
    let processedItems = [];

    if (bill_items && bill_items.length > 0) {
        let subtotal = 0;
        let calculatedTax = 0;
        processedItems = bill_items.map(item => {
            const quantity = Number(item.quantity);
            const unitPrice = Number(item.unit_price);
            const lineTotal = quantity * unitPrice;
            const itemTax = Number(item.tax_amount ?? 0);

            subtotal += lineTotal;
            calculatedTax += itemTax;

            return {
                ...item,
                total_price: lineTotal
            };
        });

        const taxAmount = calculatedTax;
        const discountAmount = finalBillData.discount_amount !== undefined ? Number(finalBillData.discount_amount) : Number(bill.discount_amount || 0);

        finalBillData.subtotal = subtotal;
        finalBillData.tax_amount = taxAmount;
        finalBillData.total_amount = subtotal + taxAmount - discountAmount;
    }

    // Inject updated_at
    const updateData = {
        ...finalBillData,
        updated_at: new Date().toISOString()
    };

    try {
        await billsRepository.updateBill(userId, billId, updateData);

        if (bill_items && bill_items.length > 0) {
            await billsRepository.deleteBillItems(billId);

            const itemsToInsert = processedItems.map(item => ({
                ...item,
                bill_id: billId
            }));
            await billsRepository.createBillItems(itemsToInsert);
        }

        return await billsRepository.findBillById(userId, billId);
    } catch (error) {
        if (error.code === 'PGRST116' || (error.message && error.message.includes('PGRST116'))) {
            throw new ApiError(404, 'Bill not found');
        }
        if (error.code === '23503') { // Foreign Key Violation
            throw new ApiError(400, 'Invalid merchant_id or category_id');
        }
        throw error;
    }
};

const deleteBill = async (jwtUser, billId) => {
    const userId = jwtUser.sub;

    // Check existence and ownership first
    const bill = await billsRepository.findBillById(userId, billId);
    if (!bill) {
        throw new ApiError(404, 'Bill not found');
    }

    try {
        await billsRepository.softDeleteBill(userId, billId);
        return { success: true };
    } catch (error) {
        if (error.code === 'PGRST116' || (error.message && error.message.includes('PGRST116'))) {
            throw new ApiError(404, 'Bill not found');
        }
        throw error;
    }
};

module.exports = {
    createBill,
    getBills,
    getBillById,
    updateBill,
    deleteBill
};
