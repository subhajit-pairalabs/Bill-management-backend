/**
 * @file services/auth.service.js
 */
const authRepository = require('../repositories/auth.repository');

const verifyGoogleUser = async (jwtPayload) => {
    const id = jwtPayload.sub;
    
    const existingProfile = await authRepository.findProfileById(id);
    if (existingProfile) {
        await authRepository.updateLastLogin(id);
        console.log('Successful Login for user:', id);
        return existingProfile;
    }
    
    console.log('Profile not found, creating new profile for user:', id);
    return createProfile(jwtPayload);
};

const createProfile = async (jwtPayload) => {
    const id = jwtPayload.sub;
    const email = jwtPayload.email;
    const metadata = jwtPayload.user_metadata || {};
    
    const profileData = {
        id,
        email,
        full_name: metadata.full_name || metadata.name || '',
        avatar_url: metadata.avatar_url || metadata.picture || '',
        provider: jwtPayload.app_metadata?.provider || 'google',
        phone: jwtPayload.phone || null
    };

    const newProfile = await authRepository.createProfile(profileData);
    console.log('Profile Created for user:', id);
    return newProfile;
};

const getProfile = async (id) => {
    return await authRepository.findProfileById(id);
};

const logout = async (id) => {
    // In stateless JWT, logout is usually handled client-side by deleting the token.
    // If we want to blacklist tokens, we would implement it here.
    return true;
};

const validateSession = async (id) => {
    const profile = await getProfile(id);
    if (!profile) {
        throw new Error('Session invalid: Profile not found');
    }
    return profile;
};

module.exports = {
    verifyGoogleUser,
    createProfile,
    getProfile,
    logout,
    validateSession
};