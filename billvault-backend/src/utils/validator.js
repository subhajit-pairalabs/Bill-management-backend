/**
 * @file utils/validator.js
 * @description Reusable validation helper functions (not Joi schemas).
 * Lower-level utilities used within services for programmatic checks.
 *
 * Exports:
 *  - isValidEmail(email)       RFC 5322 check
 *  - isStrongPassword(password) min 8 chars, uppercase, number, special char
 *  - isValidUUID(id)           UUID v4 format check
 *  - isValidCurrency(code)     ISO 4217 code check
 *
 * @layer Utils
 */