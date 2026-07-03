/**
 * @file routes/email.routes.js
 * @description Route declarations for: Email Import: connect Gmail, disconnect, trigger sync, list imported bills
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
 * @module email
 */