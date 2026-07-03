/**
 * @file models/analytics.model.js
 * @description Data shape definition for: Analytics report: spendingSummary { totalAmount, billCount, topCategory }, categoryBreakdown [{ categoryId, name, totalAmount, percentage }], monthlyTrend [{ month, totalAmount, billCount }]
 *
 * Model layer purpose:
 *  - Documents the expected shape of each entity as a plain JS object
 *  - Used as reference when writing repositories and services
 *  - NOT an ORM class -- no database interaction here
 *  - Exports a shape constant or factory function for documentation
 *
 * @layer Model
 * @module analytics
 */