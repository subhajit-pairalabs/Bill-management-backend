/**
 * @file workers/reminder.worker.js
 * @description BullMQ Worker (CONSUMER side) for the 'reminder' queue.
 * Processes reminder.queue jobs: build reminder message via reminder.service, enqueue notification.queue job for push, call email.service for email delivery, update reminder status to sent.
 *
 * Worker file responsibilities:
 *  - Create a BullMQ Worker listening on the corresponding queue
 *  - Implement the job processor function
 *  - Handle job failure: log error, do NOT re-throw (BullMQ manages retry)
 *  - Use services and repositories -- never raw pg or axios calls directly
 *  - Initialized by server.js at startup
 *
 * Concurrency tuning guidelines:
 *  - OCR / Thumbnail : 2  (heavy external API calls)
 *  - Email sync      : 3  (rate-limited by Gmail API quota)
 *  - Notification    : 10 (lightweight FCM dispatch)
 *  - Analytics       : 5  (aggregation queries)
 *  - Reminder        : 5  (lightweight)
 *
 * @layer Worker (Consumer)
 * @module reminderWorker
 */