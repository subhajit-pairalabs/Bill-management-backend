/**
 * @file repositories/attachments.repository.js
 */
const { supabase } = require('../config/database');

const batchCreateAttachments = async (attachmentsArray) => {
    if (!attachmentsArray || attachmentsArray.length === 0) return [];
    
    const { data, error } = await supabase
        .from('attachments')
        .insert(attachmentsArray)
        .select('*');
        
    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return data;
};

const createAttachment = async (attachmentData) => {
    const { data, error } = await supabase
        .from('attachments')
        .insert([attachmentData])
        .select('*')
        .single();
    
    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return data;
};

const findAttachmentsByUserId = async (userId) => {
    const { data, error } = await supabase
        .from('attachments')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return data || [];
};

const findAttachmentByIdAndUserId = async (id, userId) => {
    const { data, error } = await supabase
        .from('attachments')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();
        
    if (error && error.code !== 'PGRST116') { // PGRST116 is no rows returned
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return data || null;
};

const findAttachmentById = async (id) => {
    const { data, error } = await supabase
        .from('attachments')
        .select('*')
        .eq('id', id)
        .single();
        
    if (error && error.code !== 'PGRST116') { // PGRST116 is no rows returned
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return data || null;
};

const deleteAttachment = async (id, userId) => {
    const { error } = await supabase
        .from('attachments')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);
        
    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return true;
};

const findAttachmentsByBillId = async (billId, userId) => {
    const { data, error } = await supabase
        .from('attachments')
        .select('*')
        .eq('bill_id', billId)
        .eq('user_id', userId);
        
    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return data || [];
};

const deleteAttachmentsByBillId = async (billId, userId) => {
    const { error } = await supabase
        .from('attachments')
        .delete()
        .eq('bill_id', billId)
        .eq('user_id', userId);
        
    if (error) {
        const err = new Error(error.message);
        err.code = error.code;
        err.details = error.details;
        throw err;
    }
    
    return true;
};

module.exports = {
    createAttachment,
    batchCreateAttachments,
    findAttachmentsByUserId,
    findAttachmentById,
    findAttachmentByIdAndUserId,
    findAttachmentsByBillId,
    deleteAttachment,
    deleteAttachmentsByBillId
};
