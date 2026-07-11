/**
 * @file routes/index.js
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const billsRoutes = require('./bills.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/bills', billsRoutes);

// Export router
module.exports = router;