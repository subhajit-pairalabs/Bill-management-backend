/**
 * @file models/bill.model.js
 * @description Data shape definition for: Bill entity: id, userId, familyVaultId, categoryId, title, vendorName, amount, currency, billDate, fileKey, thumbnailKey, ocrStatus, ocrData (JSONB), tags, warrantyExpiry, serviceInterval, source, status, searchVector, createdAt, updatedAt, deletedAt
 *
 * Model layer purpose:
 *  - Documents the expected shape of each entity as a plain JS object
 *  - Used as reference when writing repositories and services
 *  - NOT an ORM class -- no database interaction here
 *  - Exports a shape constant or factory function for documentation
 *
 * @layer Model
 * @module bill
 */