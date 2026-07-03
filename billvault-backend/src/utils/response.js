/**
 * @file utils/response.js
 * @description Standardized API response wrapper.
 * Ensures every endpoint returns a consistent JSON shape.
 *
 * Success shape: { success: true,  data: {...},  message: "string", meta: {...} }
 * Error shape:   { success: false, error: { code, message, details } }
 *
 * Exports:
 *  - success(res, statusCode, data, message, meta)
 *  - error(res, statusCode, message, details)
 *
 * @layer Utils
 */