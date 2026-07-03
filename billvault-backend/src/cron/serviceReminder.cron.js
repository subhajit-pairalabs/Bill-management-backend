/**
 * @file cron/serviceReminder.cron.js
 * @description Scheduled background task.
 * Schedule: daily at 09:00. Queries bills with serviceInterval due within 3 days. Enqueues reminder.queue jobs for each match.
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
 * @module serviceReminderCron
 * @dependency node-cron
 */