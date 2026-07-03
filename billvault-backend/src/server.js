/**
 * @file server.js
 * @description Application entry point. Imports the Express app and starts HTTP server.
 * Also bootstraps all stateful connections before accepting traffic.
 *
 * Startup sequence:
 *  1. Load and validate environment variables (config/env.js)
 *  2. Connect to PostgreSQL (config/database.js)
 *  3. Connect to Redis (config/redis.js)
 *  4. Initialize BullMQ workers (src/workers/*)
 *  5. Start Cron jobs (src/cron/*)
 *  6. Start HTTP server via app.listen()
 *  7. Register SIGTERM / SIGINT graceful shutdown handlers
 *
 * @layer Gateway
 * @module Server
 */