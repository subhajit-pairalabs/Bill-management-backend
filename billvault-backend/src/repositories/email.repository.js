/**
 * @file repositories/email.repository.js
 * @description Email connection data access: store Gmail OAuth tokens (AES-encrypted), retrieve for a user, update token on refresh, store sync cursor
 *
 * Repository layer rules:
 *  - The ONLY layer that interacts with PostgreSQL
 *  - Uses the pg.Pool singleton from config/database.js
 *  - Contains parameterized SQL queries ONLY (never string-interpolated)
 *  - Returns plain JavaScript objects (not class instances)
 *  - Never contains business logic
 *  - Never calls external APIs
 *  - Never calls other repositories
 *
 * Replacing pg with Prisma or Drizzle requires changes ONLY in this file.
 *
 * @layer Repository
 * @module email
 */