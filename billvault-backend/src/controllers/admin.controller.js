/**
 * @file controllers/admin.controller.js
 * @description HTTP boundary controller for: Admin: user list, user ban, system stats, subscription override, storage report
 *
 * Controller responsibilities (ONLY):
 *  1. Extract and sanitize inputs from req.body, req.params, req.query, req.file, req.user
 *  2. Call exactly ONE service method
 *  3. Return standardized JSON response via utils/response.js
 *
 * Controllers NEVER:
 *  - Contain business logic
 *  - Query the database directly
 *  - Call external APIs directly
 *  - Call other controllers
 *
 * All async handlers are wrapped with catchAsync (utils/catchAsync.js).
 *
 * @layer Controller
 * @module admin
 */