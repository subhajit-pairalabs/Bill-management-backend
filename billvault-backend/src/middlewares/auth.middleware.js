/**
 * @file middlewares/auth.middleware.js
 * @description JWT verification. Extracts Bearer token from Authorization header, verifies signature and expiry, checks Redis blacklist, attaches req.user = { id, role, planId }. Returns 401 if invalid.
 *
 * @layer Middleware
 * @module auth
 */