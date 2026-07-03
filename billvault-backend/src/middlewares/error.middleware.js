/**
 * @file middlewares/error.middleware.js
 * @description Global Express error handler (4-argument middleware). Catches all ApiError instances and unhandled errors. Returns standardized JSON error response. Must be mounted LAST in app.js.
 *
 * @layer Middleware
 * @module error
 */