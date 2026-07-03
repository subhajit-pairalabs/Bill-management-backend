/**
 * @file cron/emailSync.cron.js
 * @description Scheduled background task.
 * Schedule: every 30 minutes. Fetches all users with active Gmail connections, enqueues one email.queue job per user.
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
 * @module emailSyncCron
 * @dependency node-cron
 */