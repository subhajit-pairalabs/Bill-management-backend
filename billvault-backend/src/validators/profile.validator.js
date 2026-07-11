/**
 * @file validators/profile.validator.js
 */
const Joi = require('joi');

const updateProfileSchema = Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional().messages({
        'string.pattern.base': 'Phone number must be a valid E.164 format.'
    }),
    full_name: Joi.string().max(100).optional(),
    avatar_url: Joi.string().uri().optional(),
    country: Joi.string()
        .trim()
        .pattern(/^[A-Za-z\s'-]+$/)
        .max(100)
        .optional()
        .messages({
            'string.pattern.base': 'Country name can only contain letters, spaces, apostrophes, and hyphens.'
        }),
    currency: Joi.string().length(3).uppercase().optional().messages({
        'string.length': 'Currency must be a 3-letter ISO code'
    }),
    language: Joi.string().max(10).optional(),
    timezone: Joi.string().max(100).optional(),
    gender: Joi.string().valid('male', 'female', 'other', 'prefer_not_to_say').optional()
});

module.exports = {
    updateProfileSchema
};
