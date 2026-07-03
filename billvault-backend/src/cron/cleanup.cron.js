/**
 * @file cron/cleanup.cron.js
 * @description Scheduled background task.
 * Schedule: daily at 02:00. Deletes temp files older than 24hrs. Hard-deletes records soft-deleted more than 30 days ago. Removes orphan R2 files.
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
 * @module cleanupCron
 * @dependency node-cron
 */