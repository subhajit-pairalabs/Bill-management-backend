/**
 * @file validators/reminder.validator.js
 * @description Joi schemas: createReminderSchema (billId, type, remindAt, channels), updateReminderSchema (all optional)
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module reminder
 */