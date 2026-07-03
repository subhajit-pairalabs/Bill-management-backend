/**
 * @file config/redis.js
 * @description ioredis client singleton.
 * Exports a single Redis client instance used by:
 *  - BullMQ (queue broker)
 *  - JWT blacklist store
 *  - OTP store
 *  - Refresh token store
 *  - Rate limiter store
 *  - Analytics cache
 *
 * Config source: env.js (REDIS_HOST, REDIS_PORT, REDIS_PASSWORD)
 *
 * @layer Config
 * @module Redis
 * @dependency ioredis
 */