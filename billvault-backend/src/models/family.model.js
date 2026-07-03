/**
 * @file models/family.model.js
 * @description Data shape definition for: Family Vault: vault { id, name, ownerId, createdAt }, member { vaultId, userId, role (owner/editor/viewer), joinedAt }
 *
 * Model layer purpose:
 *  - Documents the expected shape of each entity as a plain JS object
 *  - Used as reference when writing repositories and services
 *  - NOT an ORM class -- no database interaction here
 *  - Exports a shape constant or factory function for documentation
 *
 * @layer Model
 * @module family
 */