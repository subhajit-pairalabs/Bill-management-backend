/**
 * @file services/search.service.js
 * @description Full-text search: build PostgreSQL tsvector queries, apply filters (date range, category, amount), paginate results, build highlight snippets
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
 * @module search
 */