/**
 * @file routes/auth.routes.js
 */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const catchAsync = require('../utils/catchAsync');

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Authenticate with Google via Supabase JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Google login successful
 */
router.post('/google', authenticate, catchAsync(authController.googleLogin));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 */
router.get('/me', authenticate, catchAsync(authController.getMe));

/**
 * @swagger
 * /auth/session:
 *   get:
 *     summary: Validate current session
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session is valid
 */
router.get('/session', authenticate, catchAsync(authController.getSession));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', authenticate, catchAsync(authController.logout));

module.exports = router;