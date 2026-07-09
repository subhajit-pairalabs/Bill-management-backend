/**
 * @file routes/profile.routes.js
 */
const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validation.middleware');
const { updateProfileSchema } = require('../validators/profile.validator');
const catchAsync = require('../utils/catchAsync');

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get or create current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing JWT
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Profile not found
 */
router.get('/', authenticate, catchAsync(profileController.getProfile));

/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Update current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *               country:
 *                 type: string
 *               currency:
 *                 type: string
 *               language:
 *                 type: string
 *               timezone:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other, prefer_not_to_say]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad Request - Validation error or invalid payload
 *       401:
 *         description: Unauthorized - Invalid or missing JWT
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Profile not found
 */
router.patch('/', authenticate, validate(updateProfileSchema, 'body'), catchAsync(profileController.updateProfile));

module.exports = router;
