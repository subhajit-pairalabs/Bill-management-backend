/**
 * @file validators/family.validator.js
 * @description Joi schemas: createVaultSchema (name), inviteMemberSchema (email, role), updateRoleSchema (role enum: owner/editor/viewer)
 *
 * Validator rules:
 *  - Use Joi for all schema definitions
 *  - Export named schema constants (not default export)
 *  - Used exclusively by validation.middleware.js
 *  - Never import from services or repositories
 *
 * @layer Validator
 * @module family
 */