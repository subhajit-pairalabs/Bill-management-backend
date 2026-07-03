/**
 * @file config/bullmq.js
 * @description BullMQ connection config and queue factory.
 * Exports a createQueue(name, options) factory function used by all queue files.
 * All queues share the same Redis connection from config/redis.js.
 *
 * Default job options: attempts=3, backoff={ type:'exponential', delay:5000 }
 * Queues: ocr, thumbnail, email, reminder, notification, analytics
 *
 * @layer Config
 * @module BullMQ
 * @dependency bullmq
 */