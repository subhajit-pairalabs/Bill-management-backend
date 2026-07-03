/**
 * @file models/subscription.model.js
 * @description Data shape definition for: Subscription: id, userId, planId (free/pro/family), status, storageQuotaMb, maxBills, maxVaultMembers, gmailImport (bool), aiSearch (bool), currentPeriodEnd, createdAt, updatedAt
 *
 * Model layer purpose:
 *  - Documents the expected shape of each entity as a plain JS object
 *  - Used as reference when writing repositories and services
 *  - NOT an ORM class -- no database interaction here
 *  - Exports a shape constant or factory function for documentation
 *
 * @layer Model
 * @module subscription
 */