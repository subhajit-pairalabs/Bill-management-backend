/**
 * @file controllers/bills.controller.js
 */
const billsService = require('../services/bills.service');
const { success } = require('../utils/response');

const createBill = async (req, res) => {
    const bill = await billsService.createBill(req.user, req.body);
    return success(res, 201, { bill }, 'Bill created successfully');
};

const createManualBill = async (req, res) => {
    const bill = await billsService.createBill(req.user, req.body, req.files);
    return success(res, 201, { bill }, 'Bill created successfully');
};

const getBills = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const result = await billsService.getBills(req.user, pageNumber, limitNumber);
    return success(res, 200, result, 'Bills retrieved successfully');
};

const searchBills = async (req, res) => {
    const { q, category, payment_status, page = 1, limit = 10 } = req.query;
    if (!q || typeof q !== 'string' || q.trim() === '') {
        return res.status(400).json({ success: false, message: 'Search keyword is required' });
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const result = await billsService.searchBills(req.user, q.trim(), category, payment_status, pageNumber, limitNumber);
    return success(res, 200, result, 'Bills retrieved successfully');
};

const getBillById = async (req, res) => {
    const bill = await billsService.getBillById(req.user, req.params.id);
    return success(res, 200, { bill }, 'Bill retrieved successfully');
};

const updateBill = async (req, res) => {
    const bill = await billsService.updateBill(req.user, req.params.id, req.body);
    return success(res, 200, { bill }, 'Bill updated successfully');
};

const deleteBill = async (req, res) => {
    await billsService.deleteBill(req.user, req.params.id);
    return success(res, 200, null, 'Bill deleted successfully');
};

module.exports = {
    createBill,
    createManualBill,
    getBills,
    searchBills,
    getBillById,
    updateBill,
    deleteBill
};
