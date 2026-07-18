/**
 * @file middlewares/upload.middleware.js
 * @description Multer config for file uploads. Validates MIME type whitelist (PDF, JPEG, PNG, WEBP, HEIC).
 * Enforces max file size (20MB). Uses memoryStorage.
 *
 * @layer Middleware
 * @module upload
 */

const multer = require('multer');
const { isAllowedMimeType } = require('../utils/file');
const ApiError = require('../utils/ApiError'); // Ensure this exists, or use standard error handling

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (isAllowedMimeType(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported MIME type: ' + file.mimetype), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter,
});

module.exports = upload;