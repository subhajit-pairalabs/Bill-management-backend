/**
 * @file repositories/auth.repository.js
 */
const { supabase } = require('../config/database');

const findProfileById = async (id) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is no rows returned
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

const updateLastLogin = async (id) => {
    const { data, error } = await supabase
        .from('profiles')
        .update({ updated_at: new Date().toISOString() })
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
    updateLastLogin
};