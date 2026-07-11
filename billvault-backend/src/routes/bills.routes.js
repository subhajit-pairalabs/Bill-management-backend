/**
 * @file routes/bills.routes.js
 */
const express = require('express');
const router = express.Router();

const billsController = require('../controllers/bills.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const { createBillSchema, updateBillSchema } = require('../validators/bills.validator');
const catchAsync = require('../utils/catchAsync');

/**
 * @swagger
 * /bills:
 *   post:
 *     summary: Create a new bill
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Bill created successfully
 */
router.post('/', authenticate, validate(createBillSchema, 'body'), catchAsync(billsController.createBill));

/**
 * @swagger
 * /bills:
 *   get:
 *     summary: Get all bills for the authenticated user
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bills retrieved successfully
 */
router.get('/', authenticate, catchAsync(billsController.getBills));

/**
 * @swagger
 * /bills/{id}:
 *   get:
 *     summary: Get a specific bill by ID
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Bill retrieved successfully
 *       404:
 *         description: Bill not found
 */
router.get('/:id', authenticate, catchAsync(billsController.getBillById));

/**
 * @swagger
 * /bills/{id}:
 *   patch:
 *     summary: Update a specific bill
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Bill updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Bill not found
 */
router.patch('/:id', authenticate, validate(updateBillSchema, 'body'), catchAsync(billsController.updateBill));

/**
 * @swagger
 * /bills/{id}:
 *   delete:
 *     summary: Soft delete a specific bill
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Bill deleted successfully
 *       404:
 *         description: Bill not found
 */
router.delete('/:id', authenticate, catchAsync(billsController.deleteBill));

module.exports = router;
