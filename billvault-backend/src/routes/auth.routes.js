/**
 * @file routes/auth.routes.js
 * @description Route declarations for: Authentication: register, login, logout, refresh token, OTP verify, Google OAuth
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
 * @module auth
 */