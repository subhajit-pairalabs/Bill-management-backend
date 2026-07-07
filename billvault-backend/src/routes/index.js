/**
 * @file routes/index.js
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');

// Mount routes
router.use('/auth', authRoutes);

// Export router
module.exports = router;