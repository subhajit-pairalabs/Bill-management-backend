/**
 * @file routes/attachments.routes.js
 */
const express = require('express');
const router = express.Router();
const attachmentsController = require('../controllers/attachments.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { validateAttachmentId, validateUpload } = require('../validators/attachments.validator');

// All attachment routes require authentication
router.use(authenticate);

// POST /api/v1/attachments - Upload a new attachment
router.post(
    '/',
    upload.single('file'), // Multer middleware handling 'file' field
    validateUpload,
    attachmentsController.uploadAttachment
);

// GET /api/v1/attachments - Get all attachments for the authenticated user
router.get(
    '/',
    attachmentsController.getAttachments
);

// GET /api/v1/attachments/:id - Get a specific attachment by ID
router.get(
    '/:id',
    validateAttachmentId,
    attachmentsController.getAttachmentById
);

// GET /api/v1/attachments/:attachmentId/download - Get a presigned download URL for an attachment
router.get(
    '/:attachmentId/download',
    validateAttachmentId,
    attachmentsController.downloadAttachment
);

// DELETE /api/v1/attachments/:id - Delete an attachment
router.delete(
    '/:id',
    validateAttachmentId,
    attachmentsController.deleteAttachment
);

module.exports = router;
