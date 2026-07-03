/**
 * @file validators/auth.validator.js
 * @description Joi schemas: registerSchema (name, email, password strength), loginSchema, otpVerifySchema, refreshTokenSchema
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module auth
 */