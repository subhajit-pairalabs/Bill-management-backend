/**
 * @file services/gmail.service.js
 * @description Gmail integration: initiate OAuth2 PKCE flow, exchange code for tokens, refresh tokens, fetch unread emails, parse invoice attachments
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
 * @module gmail
 */