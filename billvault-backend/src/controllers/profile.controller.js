/**
 * @file controllers/profile.controller.js
 */
const profileService = require('../services/profile.service');
const { success } = require('../utils/response');
const ApiError = require('../utils/ApiError');

const getProfile = async (req, res) => {
    // req.user is attached by the authenticate middleware
    const profile = await profileService.getProfile(req.user);
    console.log(profile);
    return success(res, 200, { profile }, 'Profile retrieved successfully');
};

const updateProfile = async (req, res) => {
    const userId = req.user.sub;
    const updateData = req.body;

    // The validation middleware ensures that only permitted fields reach this point
    // updateData will not contain id, email, phone, provider, or created_at

    const updatedProfile = await profileService.updateProfile(userId, updateData);
    return success(res, 200, { profile: updatedProfile }, 'Profile updated successfully');
};

const uploadAvatar = async (req, res) => {
    const userId = req.user.sub;
    const file = req.file;

    if (!file) {
        throw new ApiError(400, 'No avatar image provided');
    }

    const profile = await profileService.uploadAvatar(userId, file);
    return success(res, 200, { profile }, 'Avatar uploaded successfully');
};

module.exports = {
    getProfile,
    updateProfile,
    uploadAvatar
};
