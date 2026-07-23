/**
 * @file services/attachments.service.js
 */
const storageService = require('./storage.service');
const attachmentsRepository = require('../repositories/attachments.repository');
const { generateObjectKey, getExtension, calculateChecksum } = require('../utils/file');
const ApiError = require('../utils/ApiError');

const attachFilesToBill = async (userId, billId, files) => {
    if (!files || files.length === 0) return [];

    let uploadedMetadata = [];
    
    // 1. Upload all files sequentially to avoid complex concurrent rollbacks
    for (const file of files) {
        const extension = getExtension(file.originalname);
        const objectKey = generateObjectKey(userId, extension);
        const checksum = calculateChecksum(file.buffer);

        try {
            await storageService.uploadFile(file.buffer, objectKey, file.mimetype);
            uploadedMetadata.push({
                user_id: userId,
                bill_id: billId,
                bucket_name: storageService.BUCKET_NAME,
                storage_path: objectKey,
                file_name: file.originalname,
                mime_type: file.mimetype,
                file_size: file.size,
                thumbnail_url: null,
                checksum: checksum
            });
        } catch (error) {
            // Clean up any files that were already successfully uploaded before throwing
            for (const meta of uploadedMetadata) {
                try {
                    await storageService.deleteFile(meta.storage_path);
                } catch (cleanupError) {
                    console.error(`Failed to cleanup file ${meta.storage_path} during rollback:`, cleanupError.message);
                }
            }
            throw new ApiError(500, 'Failed to upload files to storage', { originalError: error.message });
        }
    }

    // 2. Save metadata for all uploaded files
    try {
        const result = await attachmentsRepository.batchCreateAttachments(uploadedMetadata);
        return result;
    } catch (error) {
        // Rollback R2 uploads
        for (const meta of uploadedMetadata) {
            try {
                await storageService.deleteFile(meta.storage_path);
            } catch (cleanupError) {
                console.error(`Failed to cleanup file ${meta.storage_path} after DB insert failure:`, cleanupError.message);
            }
        }
        throw new ApiError(500, 'Failed to save attachment metadata to database', { originalError: error.message });
    }
};

const uploadAttachment = async (userId, file) => {
    if (!file) {
        throw new ApiError(400, 'No file provided');
    }

    const extension = getExtension(file.originalname);
    const objectKey = generateObjectKey(userId, extension);
    const checksum = calculateChecksum(file.buffer);

    // 1. Upload to Cloudflare R2
    try {
        await storageService.uploadFile(file.buffer, objectKey, file.mimetype);
    } catch (error) {
        throw new ApiError(500, 'Failed to upload file to storage', { originalError: error.message });
    }

    // 2. Save metadata to database
    try {
        const attachmentData = {
            user_id: userId,
            bill_id: null,
            bucket_name: storageService.BUCKET_NAME,
            storage_path: objectKey,
            file_name: file.originalname,
            mime_type: file.mimetype,
            file_size: file.size,
            thumbnail_url: null,
            checksum: checksum
        };

        const result = await attachmentsRepository.createAttachment(attachmentData);
        return result;
    } catch (error) {
        // 3. Rollback: Delete from R2 if database insert fails
        try {
            await storageService.deleteFile(objectKey);
        } catch (deleteError) {
            console.error(`Failed to rollback file from R2 after DB insert failure. Object key: ${objectKey}. Error: ${deleteError.message}`);
        }
        throw new ApiError(500, 'Failed to save attachment metadata to database', { originalError: error.message });
    }
};

const getAttachments = async (userId) => {
    return await attachmentsRepository.findAttachmentsByUserId(userId);
};

const getAttachmentById = async (id, userId) => {
    const attachment = await attachmentsRepository.findAttachmentByIdAndUserId(id, userId);
    if (!attachment) {
        throw new ApiError(404, 'Attachment not found');
    }
    return attachment;
};

const generateDownloadUrl = async (userId, attachmentId) => {
    const attachment = await attachmentsRepository.findAttachmentById(attachmentId);
    if (!attachment) {
        throw new ApiError(404, 'Attachment not found');
    }
    
    if (attachment.user_id !== userId) {
        throw new ApiError(403, 'You are not authorized to access this attachment');
    }
    
    // Generate a pre-signed URL valid for 1 hour (3600 seconds)
    const expiresIn = 3600;
    const signedUrl = await storageService.generateSignedUrl(attachment.storage_path, expiresIn);
    
    return {
        download_url: signedUrl,
        file_name: attachment.file_name,
        mime_type: attachment.mime_type,
        expires_in: expiresIn
    };
};

const deleteAttachment = async (id, userId) => {
    const attachment = await attachmentsRepository.findAttachmentByIdAndUserId(id, userId);
    if (!attachment) {
        throw new ApiError(404, 'Attachment not found');
    }

    // 1. Delete physical file from R2 first
    try {
        await storageService.deleteFile(attachment.storage_path);
    } catch (error) {
        throw new ApiError(500, 'Failed to delete file from storage', { originalError: error.message });
    }

    // 2. Delete database metadata (Hard Delete as per instructions)
    await attachmentsRepository.deleteAttachment(id, userId);
    return true;
};

const deleteAttachmentsForBill = async (billId, userId) => {
    const attachments = await attachmentsRepository.findAttachmentsByBillId(billId, userId);
    if (!attachments || attachments.length === 0) return true;

    // 1. Delete physical files from R2 first
    for (const attachment of attachments) {
        try {
            await storageService.deleteFile(attachment.storage_path);
        } catch (error) {
            console.error(`Failed to delete file ${attachment.storage_path} during bulk delete:`, error.message);
            // Optionally, we could choose to throw, but typically we want to attempt all deletions
        }
    }

    // 2. Delete database metadata
    await attachmentsRepository.deleteAttachmentsByBillId(billId, userId);
    return true;
};

module.exports = {
    attachFilesToBill,
    uploadAttachment,
    getAttachments,
    getAttachmentById,
    generateDownloadUrl,
    deleteAttachment,
    deleteAttachmentsForBill
};
