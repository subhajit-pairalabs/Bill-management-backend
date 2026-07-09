/**
 * @file repositories/profile.repository.js
 */
const { supabase } = require('../config/database');

const findProfileById = async (id) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error && error.code !== 'PGRST116') {
        throw new Error(error.message);
    }
    
    return data || null;
};

const createProfile = async (profileData) => {
    const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select('*')
        .single();
    
    if (error) {
        throw new Error(error.message);
    }
    
    return data;
};

const updateProfile = async (id, updateData) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();
        
    if (error) {
        throw new Error(error.message);
    }
    
    return data;
};

module.exports = {
    findProfileById,
    createProfile,
    updateProfile
};
