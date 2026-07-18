/**
 * @file services/attachments.service.js
 */
const storageService = require('./storage.service');
const attachmentsRepository = require('../repositories/attachments.repository');
const { generateObjectKey, getExtension, calculateChecksum } = require('../utils/file');
const ApiError = require('../utils/ApiError');

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

module.exports = {
    uploadAttachment,
    getAttachments,
    getAttachmentById,
    deleteAttachment
};
