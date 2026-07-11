/**
 * @file services/bills.service.js
 */
const billsRepository = require('../repositories/bills.repository');
const ApiError = require('../utils/ApiError');

const createBill = async (jwtUser, payload) => {
    const userId = jwtUser.sub;

    try {
        return await billsRepository.createBill(userId, payload);
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

    // Check existence and ownership first to throw a clean 404
    const bill = await billsRepository.findBillById(userId, billId);
    if (!bill) {
        throw new ApiError(404, 'Bill not found');
    }

    // Inject updated_at
    const updateData = {
        ...payload,
        updated_at: new Date().toISOString()
    };

    try {
        return await billsRepository.updateBill(userId, billId, updateData);
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
