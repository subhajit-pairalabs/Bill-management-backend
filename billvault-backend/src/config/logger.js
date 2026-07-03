/**
 * @file config/logger.js
 * @description Application logger singleton.
 * Creates and exports a Pino logger instance with:
 *  - Pretty printing in development
 *  - JSON structured output in production
 *  - Log levels: trace, debug, info, warn, error, fatal
 *
 * Imported by utils/logger.js which re-exports it for convenience.
 *
 * @layer Config
 * @module Logger
 * @dependency pino
 */