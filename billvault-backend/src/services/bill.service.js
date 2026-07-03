/**
 * @file services/bill.service.js
 * @description Core bill logic: validate storage quota, coordinate file upload, create bill record, enqueue OCR + thumbnail + analytics jobs, soft-delete, restore
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
 * @module bill
 */