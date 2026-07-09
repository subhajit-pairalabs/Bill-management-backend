/**
 * @file routes/index.js
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

// Export router
module.exports = router;