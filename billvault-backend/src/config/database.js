/**
 * @file config/database.js
 * @description PostgreSQL connection pool singleton.
 * Creates and exports a single pg.Pool instance shared across all repositories.
 * Repositories import this pool -- they NEVER create their own connections.
 *
 * Config source: env.js (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
 * Pool settings: max connections, idle timeout, connection timeout.
 *
 * @layer Config
 * @module Database
 * @dependency pg
 */