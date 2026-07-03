/**
 * @file controllers/user.controller.js
 * @description HTTP boundary controller for: Users: profile retrieval, profile update, avatar upload, account deletion
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
 * @module user
 */