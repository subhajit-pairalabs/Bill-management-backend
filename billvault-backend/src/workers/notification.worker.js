/**
 * @file workers/notification.worker.js
 * @description BullMQ Worker (CONSUMER side) for the 'notification' queue.
 * Processes notification.queue jobs: create notification record via notification.repository, dispatch FCM push via firebase.service, emit real-time event via Socket.IO to user room.
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
 * @module notificationWorker
 */