/**
 * @file utils/logger.js
 * @description Convenience re-export of the logger singleton from config/logger.js.
 * Allows all modules to import logger from a short path without knowing the config structure.
 *
 * Usage:
 *   const logger = require('../utils/logger');
 *   logger.info('Server started');
 *   logger.error({ err }, 'Unhandled error');
 *
 * @layer Utils
 */