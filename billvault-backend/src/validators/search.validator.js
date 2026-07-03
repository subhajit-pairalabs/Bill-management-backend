/**
 * @file validators/search.validator.js
 * @description Joi schemas: searchQuerySchema (q: string min 2, categoryId, minAmount, maxAmount, startDate, endDate, page, limit)
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module search
 */