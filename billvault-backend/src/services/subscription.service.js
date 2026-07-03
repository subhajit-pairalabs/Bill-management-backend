/**
 * @file services/subscription.service.js
 * @description Subscription logic: fetch current plan, validate upgrade/downgrade, update plan record, enforce feature gates (storage quota, vault size, Gmail import)
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
 * @module subscription
 */