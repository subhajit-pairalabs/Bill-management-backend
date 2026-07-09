/**
 * @file services/profile.service.js
 */
const profileRepository = require('../repositories/profile.repository');

const ensureProfileExists = async (jwtUser) => {
    const userId = jwtUser.sub;

    // Attempt to find existing profile
    let profile = await profileRepository.findProfileById(userId);

    if (profile) {
        return profile;
    }

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
    return profile;
};

const getProfile = async (jwtUser) => {
    // getProfile is essentially ensureProfileExists
    return await ensureProfileExists(jwtUser);
};

const updateProfile = async (userId, updateData) => {
    // Inject updated_at here, keeping the repository unaware of business mutations
    // Also automatically mark onboarding as complete when they update their profile
    const dataToUpdate = {
        ...updateData,
        onboarding_completed: true,
        updated_at: new Date().toISOString()
    };

    // By not doing findProfileById first, we save a query. 
    // The repository's update will throw (PGRST116) if the row doesn't exist.
    const updatedProfile = await profileRepository.updateProfile(userId, dataToUpdate);
    return updatedProfile;
};

module.exports = {
    ensureProfileExists,
    getProfile,
    updateProfile
};
