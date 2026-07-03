/**
 * @file services/notification.service.js
 * @description In-app notification logic: create notification records, list user notifications, mark as read, manage FCM device token registration
 *
 * Service layer rules:
 *  - Contains ALL business logic for this domain
 *  - May call one or more repositories
 *  - May call other services (never circular dependencies)
 *  - May enqueue BullMQ jobs
 *  - May call external API clients
 *  - NEVER imports req or res -- pure Node.js functions
 *  - NEVER queries the database directly (delegates to repository)
 *
 * @layer Service
 * @module notification
 */