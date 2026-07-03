/**
 * @file cron/warranty.cron.js
 * @description Scheduled background task.
 * Schedule: daily at 08:00. Queries bills with warrantyExpiry in 7 or 30 days. Enqueues reminder.queue jobs for each match.
 *
 * Cron file responsibilities:
 *  - Register a node-cron schedule
 *  - Call repositories to find qualifying records
 *  - Enqueue BullMQ jobs for each record (never do heavy work inline)
 *  - Log start, count, and completion of each run
 *  - Handle and log errors without crashing the cron scheduler
 *  - Initialized by server.js at startup
 *
 * @layer Cron
 * @module warrantyCron
 * @dependency node-cron
 */