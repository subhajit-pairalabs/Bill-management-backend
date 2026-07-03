/**
 * @file models/email.model.js
 * @description Data shape definition for: Email connection: id, userId, provider (gmail/outlook), accessToken (encrypted), refreshToken (encrypted), tokenExpiry, syncCursor, isActive, connectedAt, lastSyncAt
 *
 * Model layer purpose:
 *  - Documents the expected shape of each entity as a plain JS object
 *  - Used as reference when writing repositories and services
 *  - NOT an ORM class -- no database interaction here
 *  - Exports a shape constant or factory function for documentation
 *
 * @layer Model
 * @module email
 */