/**
 * @file utils/catchAsync.js
 * @description Higher-order function that wraps async Express route handlers.
 * Eliminates repetitive try/catch blocks in every controller.
 * Automatically forwards any thrown error to Express next() for global error handling.
 *
 * Usage: router.get('/path', catchAsync(async (req, res, next) => { ... }))
 *
 * @layer Utils
 */