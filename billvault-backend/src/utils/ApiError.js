/**
 * @file utils/ApiError.js
 * @description Custom error class extending native Error.
 * Used across services and controllers to throw domain-specific errors
 * that the global error middleware (error.middleware.js) can catch and format.
 *
 * Properties:
 *  - statusCode : HTTP status code (4xx = operational, 5xx = programmer error)
 *  - message    : Human-readable error message
 *  - isOperational : true for expected 4xx errors (safe to expose to client)
 *  - details    : Optional field-level error array (validation failures)
 *
 * @layer Utils
 */