/**
 * @file services/otp.service.js
 * @description OTP lifecycle: generate cryptographically random OTP, store in Redis with TTL, verify submitted OTP, invalidate after use
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
 * @module otp
 */