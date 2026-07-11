/**
 * @file validators/bills.validator.js
 */
const Joi = require('joi');

const commonRules = {
    invoice_number: Joi.string().max(255).allow(null, '').optional(),
    purchase_date: Joi.date().max('now').optional(),
    subtotal: Joi.number().min(0).optional(),
    tax_amount: Joi.number().min(0).optional(),
    discount_amount: Joi.number().min(0).optional(),
    total_amount: Joi.number().min(0).optional(),
    currency: Joi.string().length(3).uppercase().optional().messages({
        'string.length': 'Currency must be exactly 3 uppercase letters'
    }),
    payment_method: Joi.string().max(100).allow(null, '').optional(),
    payment_status: Joi.string().valid('PAID', 'UNPAID', 'PARTIAL', 'REFUNDED').optional(),
    bill_status: Joi.string().valid('DRAFT', 'PROCESSED', 'FLAGGED', 'ARCHIVED').optional(),
    warranty_until: Joi.date().allow(null).optional(),
    purchase_location: Joi.string().max(255).allow(null, '').optional(),
    notes: Joi.string().max(2000).allow(null, '').optional(),
    merchant_id: Joi.string().guid().allow(null).optional(),
    category_id: Joi.string().guid().allow(null).optional()
};

const createBillSchema = Joi.object({
    ...commonRules,
    total_amount: Joi.number().min(0).required() // Only explicitly require total_amount for creation
});

const updateBillSchema = Joi.object(commonRules).min(1);

module.exports = {
    createBillSchema,
    updateBillSchema
};
