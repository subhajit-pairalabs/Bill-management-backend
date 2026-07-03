/**
 * @file repositories/auth.repository.js
 * @description Auth data access: store/retrieve/delete refresh token records, store email verification tokens
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
 * @module auth
 */