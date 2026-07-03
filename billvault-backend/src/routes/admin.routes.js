/**
 * @file routes/admin.routes.js
 * @description Route declarations for: Admin: user management, system stats, subscription overrides, usage metrics
 *
 * Routes here are THIN -- they only declare:
 *   HTTP method + path + middleware chain + controller handler
 * Zero business logic lives in this file.
 *
 * Middleware applied per route (as appropriate):
 *  - auth.middleware.js       (require authenticated user)
 *  - validation.middleware.js (Joi schema from validators/)
 *  - upload.middleware.js     (file upload routes)
 *  - rateLimit.middleware.js  (custom limits where needed)
 *  - permission.middleware.js (family vault role check)
 *
 * @layer Routes
 * @module admin
 */