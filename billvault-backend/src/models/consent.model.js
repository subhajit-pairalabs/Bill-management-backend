/**
 * @file models/consent.model.js
 * @description Data shape definition for: GDPR consent record: id, userId, consentType (data_processing/marketing/analytics), granted (bool), ipAddress, userAgent, grantedAt, revokedAt
 *
 * Model layer purpose:
 *  - Documents the expected shape of each entity as a plain JS object
 *  - Used as reference when writing repositories and services
 *  - NOT an ORM class -- no database interaction here
 *  - Exports a shape constant or factory function for documentation
 *
 * @layer Model
 * @module consent
 */