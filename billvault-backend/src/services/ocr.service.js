/**
 * @file services/ocr.service.js
 * @description Google Vision OCR: download file from R2 to temp, call Vision API, parse structured fields (vendor, amount, date, line items, raw text)
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
 * @module ocr
 */