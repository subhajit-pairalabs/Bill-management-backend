/**
 * @file services/storage.service.js
 * @description Cloudflare R2 abstraction: upload file stream, generate pre-signed download URL (TTL 1hr), delete object, list objects by prefix
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
 * @module storage
 */