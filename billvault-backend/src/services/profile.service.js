/**
 * @file services/profile.service.js
 */
const profileRepository = require('../repositories/profile.repository');
const storageService = require('./storage.service');
const ApiError = require('../utils/ApiError');

const enrichProfileAvatar = async (profile) => {
    if (profile && profile.avatar_url && profile.avatar_url.startsWith('avatars/')) {
        // Generate a 1-hour presigned URL for the avatar
        profile.avatar_url = await storageService.generateSignedUrl(profile.avatar_url, 3600);
    }
    return profile;
};

const ensureProfileExists = async (jwtUser) => {
    const userId = jwtUser.sub;

    // Attempt to find existing profile
    let profile = await profileRepository.findProfileById(userId);

    if (!profile) {
        // Profile doesn't exist, automatically create one
        const userMetadata = jwtUser.user_metadata || {};
        const appMetadata = jwtUser.app_metadata || {};

        // Determine provider reliably (must be one of: 'google', 'phone', 'email')
        let provider = 'email';
        if (appMetadata.provider === 'google') {
            provider = 'google';
        } else if (jwtUser.phone || appMetadata.provider === 'phone') {
            provider = 'phone';
        }

        // Email is now nullable. No fallback needed.
        const email = jwtUser.email || null;

        const newProfileData = {
            id: userId,
            email: email,
            phone: jwtUser.phone || null,
            provider: provider,
            full_name: userMetadata.full_name || userMetadata.name || null,
            avatar_url: userMetadata.avatar_url || userMetadata.picture || null,
            onboarding_completed: false
        };

        profile = await profileRepository.createProfile(newProfileData);
    }

    // Always update last_login after ensuring profile exists
    profile = await profileRepository.updateLastLogin(userId);

    return await enrichProfileAvatar(profile);
};

const getProfile = async (jwtUser) => {
    // getProfile is essentially ensureProfileExists
    return await ensureProfileExists(jwtUser);
};

const updateProfile = async (userId, updateData) => {
    // Load existing profile to check onboarding status
    const existingProfile = await profileRepository.findProfileById(userId);
    
    if (!existingProfile) {
        throw new ApiError(404, 'Profile not found');
    }

    if (existingProfile.onboarding_completed) {
        if (updateData.email !== undefined) {
            throw new ApiError(400, 'Email cannot be modified after onboarding.');
        }
        if (updateData.phone !== undefined) {
            throw new ApiError(400, 'Phone number cannot be modified after onboarding.');
        }
    }

    // Inject updated_at here, keeping the repository unaware of business mutations
    // Also automatically mark onboarding as complete when they update their profile
    const dataToUpdate = {
        ...updateData,
        onboarding_completed: true,
        updated_at: new Date().toISOString()
    };

    const updatedProfile = await profileRepository.updateProfile(userId, dataToUpdate);
    return await enrichProfileAvatar(updatedProfile);
};

const uploadAvatar = async (userId, file) => {
    if (!file) {
        throw new ApiError(400, 'No avatar file provided');
    }

    // Use a fixed key (no extension) so every upload overwrites the previous one naturally
    const objectKey = `avatars/${userId}`;

    // Upload to Cloudflare R2
    await storageService.uploadFile(file.buffer, objectKey, file.mimetype);

    // Update profile in database
    const updatedProfile = await profileRepository.updateProfile(userId, {
        avatar_url: objectKey,
        updated_at: new Date().toISOString()
    });

    return await enrichProfileAvatar(updatedProfile);
};

module.exports = {
    ensureProfileExists,
    getProfile,
    updateProfile,
    uploadAvatar
};
