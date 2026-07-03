/**
 * @file validators/category.validator.js
 * @description Joi schemas: createCategorySchema (name, color, icon), updateCategorySchema (all optional)
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module category
 */