/**
 * @file validators/email.validator.js
 * @description Joi schemas: gmailConnectSchema (authorization code), syncTriggerSchema (optional filter params)
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module email
 */