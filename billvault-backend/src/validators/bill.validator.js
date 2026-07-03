/**
 * @file validators/bill.validator.js
 * @description Joi schemas: createBillSchema (title, amount, date, categoryId, vendorName), updateBillSchema (all optional), listBillsQuerySchema (page, limit, filters)
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module bill
 */