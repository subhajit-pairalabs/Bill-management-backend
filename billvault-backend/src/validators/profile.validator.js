/**
 * @file validators/profile.validator.js
 */
const Joi = require('joi');

const updateProfileSchema = Joi.object({
    full_name: Joi.string().max(100).optional(),
    avatar_url: Joi.string().uri().optional(),
    country: Joi.string().length(2).uppercase().optional().messages({
        'string.length': 'Country must be a 2-letter ISO code'
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
