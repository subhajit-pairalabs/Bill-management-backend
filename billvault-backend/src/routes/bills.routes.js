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
const upload = require('../middlewares/upload.middleware');
const { MAX_ATTACHMENTS } = require('../config/constants');

// Middleware to parse stringified JSON from form-data (e.g., bill_items)
const parseFormDataJson = (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                try {
                    // Try to parse if it looks like a JSON array or object
                    const trimmed = req.body[key].trim();
                    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || 
                        (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
                        req.body[key] = JSON.parse(trimmed);
                    }
                } catch (e) {
                    // Ignore parse errors, let Joi validation handle invalid types
                }
            }
        }
    }
    next();
};

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
 *                 description: Total amount (only used if bill_items are not provided).
 *               tax_amount:
 *                 type: number
 *               discount_amount:
 *                 type: number
 *               bill_items:
 *                 type: array
 *                 description: Array of line items. The backend will calculate line totals and override total_amount.
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                     unit_price:
 *                       type: number
 *                       minimum: 0
 *     responses:
 *       201:
 *         description: Bill created successfully. The response will include calculated total_price for each item and the recalculated total_amount for the bill.
 */
router.post('/', authenticate, validate(createBillSchema, 'body'), catchAsync(billsController.createBill));

/**
 * @swagger
 * /bills/manual:
 *   post:
 *     summary: Create a new bill manually with optional attachments
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Bill created successfully with attachments linked.
 */
router.post(
    '/manual',
    authenticate,
    upload.array('attachments', MAX_ATTACHMENTS),
    parseFormDataJson,
    validate(createBillSchema, 'body'),
    catchAsync(billsController.createManualBill)
);

/**
 * @swagger
 * /bills/search:
 *   get:
 *     summary: Search bills by keyword
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *       400:
 *         description: Search keyword is required
 */
router.get('/search', authenticate, catchAsync(billsController.searchBills));

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
 *             properties:
 *               total_amount:
 *                 type: number
 *                 description: Total amount (only used if bill_items are not provided).
 *               bill_items:
 *                 type: array
 *                 description: Array of line items. Replaces existing items. The backend will calculate line totals and override total_amount.
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                     unit_price:
 *                       type: number
 *                       minimum: 0
 *     responses:
 *       200:
 *         description: Bill updated successfully. The response will include calculated total_price for each item and the recalculated total_amount for the bill.
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
