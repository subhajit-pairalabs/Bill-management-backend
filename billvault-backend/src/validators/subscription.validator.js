/**
 * @file validators/subscription.validator.js
 * @description Joi schemas: upgradePlanSchema (planId enum: free/pro/family), webhookSchema (event, data from payment provider)
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module subscription
 */