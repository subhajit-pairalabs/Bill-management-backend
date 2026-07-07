/**
 * @file controllers/auth.controller.js
 */
const authService = require('../services/auth.service');
const { success } = require('../utils/response');

const googleLogin = async (req, res) => {
    // req.user is attached by authenticate middleware
    const profile = await authService.verifyGoogleUser(req.user);
    return success(res, 200, { profile }, 'Google login successful');
};

const getMe = async (req, res) => {
    const profile = await authService.getProfile(req.user.sub);
    return success(res, 200, { profile }, 'Profile retrieved successfully');
};

const getSession = async (req, res) => {
    const sessionData = await authService.validateSession(req.user.sub);
    return success(res, 200, { session: sessionData }, 'Session is valid');
};

const logout = async (req, res) => {
    await authService.logout(req.user.sub);
    return success(res, 200, null, 'Logged out successfully');
};

module.exports = {
    googleLogin,
    getMe,
    getSession,
    logout
};