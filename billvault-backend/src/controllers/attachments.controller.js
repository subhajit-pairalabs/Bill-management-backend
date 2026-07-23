/**
 * @file controllers/attachments.controller.js
 */
const attachmentsService = require('../services/attachments.service');
const { success } = require('../utils/response');
const catchAsync = require('../utils/catchAsync');

const sanitizeAttachmentResponse = (attachment) => {
    // Return only business-safe metadata
    return {
        id: attachment.id,
        file_name: attachment.file_name,
        mime_type: attachment.mime_type,
        file_size: attachment.file_size,
        created_at: attachment.created_at,
        bill_id: attachment.bill_id
    };
};

const uploadAttachment = catchAsync(async (req, res) => {
    const userId = req.user.sub;
    const file = req.file;

    const attachment = await attachmentsService.uploadAttachment(userId, file);
    
    return success(res, 201, { attachment: sanitizeAttachmentResponse(attachment) }, 'Attachment uploaded successfully');
});

const getAttachments = catchAsync(async (req, res) => {
    const userId = req.user.sub;
    
    const attachments = await attachmentsService.getAttachments(userId);
    const sanitizedAttachments = attachments.map(sanitizeAttachmentResponse);
    
    return success(res, 200, { attachments: sanitizedAttachments }, 'Attachments retrieved successfully');
});

const getAttachmentById = catchAsync(async (req, res) => {
    const userId = req.user.sub;
    const { id } = req.params;
    
    const attachment = await attachmentsService.getAttachmentById(id, userId);
    
    return success(res, 200, { attachment: sanitizeAttachmentResponse(attachment) }, 'Attachment retrieved successfully');
});

const downloadAttachment = catchAsync(async (req, res) => {
    const userId = req.user.sub;
    const attachmentId = req.params.attachmentId || req.params.id; // Support both route param names
    
    const downloadData = await attachmentsService.generateDownloadUrl(userId, attachmentId);
    
    return success(res, 200, downloadData, 'Download URL generated successfully');
});

const deleteAttachment = catchAsync(async (req, res) => {
    const userId = req.user.sub;
    const { id } = req.params;
    
    await attachmentsService.deleteAttachment(id, userId);
    
    return success(res, 200, {}, 'Attachment deleted successfully');
});

module.exports = {
    uploadAttachment,
    getAttachments,
    getAttachmentById,
    downloadAttachment,
    deleteAttachment
};
