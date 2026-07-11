/**
 * @file controllers/bills.controller.js
 */
const billsService = require('../services/bills.service');
const { success } = require('../utils/response');

const createBill = async (req, res) => {
    const bill = await billsService.createBill(req.user, req.body);
    return success(res, 201, { bill }, 'Bill created successfully');
};

const getBills = async (req, res) => {
    const bills = await billsService.getBills(req.user);
    return success(res, 200, { bills }, 'Bills retrieved successfully');
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
    getBills,
    getBillById,
    updateBill,
    deleteBill
};
