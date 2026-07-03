/**
 * @file middlewares/admin.middleware.js
 * @description Admin role guard. Checks req.user.role === 'admin'. Returns 403 Forbidden if not admin. Must be chained AFTER auth.middleware.js.
 *
 * @layer Middleware
 * @module admin
 */