/**
 * @file services/analytics.service.js
 * @description Spending analytics: aggregate spend by category/month/vendor, calculate trends, serve from Redis cache (1hr TTL), invalidate on bill changes
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
 * @module analytics
 */