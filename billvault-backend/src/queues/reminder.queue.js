/**
 * @file queues/reminder.queue.js
 * @description BullMQ Queue instance (PRODUCER side).
 * Queue: reminder
 * Reminder dispatch. Payload: { reminderId, userId, billId, type, channels }. Triggered by: reminder.service and cron jobs.
 *
 * Queue file responsibilities:
 *  - Create and export a named BullMQ Queue instance
 *  - Use the shared Redis connection from config/bullmq.js
 *  - Export an addJob() helper function called by services
 *
 * This file is the PRODUCER -- it only adds jobs to the queue.
 * The CONSUMER is: workers/reminder.worker.js
 *
 * Default job options: { attempts: 3, backoff: { type: 'exponential', delay: 5000 } }
 *
 * @layer Queue (Producer)
 * @module reminderQueue
 */