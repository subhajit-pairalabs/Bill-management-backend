/**
 * @file validators/auth.validator.js
 */
const Joi = require('joi');

const googleLoginSchema = Joi.object({
    // We expect the bearer token in headers, body might be empty or contain additional info
});

const otpRequestSchema = Joi.object({
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required().messages({
        'string.pattern.base': 'Invalid phone number format'
    })
});

const otpVerifySchema = Joi.object({
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
    code: Joi.string().length(6).required()
});

module.exports = {
    googleLoginSchema,
    otpRequestSchema,
    otpVerifySchema
};