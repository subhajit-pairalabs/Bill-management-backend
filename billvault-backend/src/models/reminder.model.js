/**
 * @file models/reminder.model.js
 * @description Data shape definition for: Reminder: id, userId, billId, type (bill_due/warranty_expiry/service_interval/custom), remindAt, channels (push/email/in_app), status (pending/sent/failed), createdAt, updatedAt
 *
 * Model layer purpose:
 *  - Documents the expected shape of each entity as a plain JS object
 *  - Used as reference when writing repositories and services
 *  - NOT an ORM class -- no database interaction here
 *  - Exports a shape constant or factory function for documentation
 *
 * @layer Model
 * @module reminder
 */