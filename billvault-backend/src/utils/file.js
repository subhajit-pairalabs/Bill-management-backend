/**
 * @file utils/file.js
 * @description File utility functions with zero side effects.
 *
 * Exports:
 *  - getMimeType(buffer)            detect MIME from file buffer (magic bytes)
 *  - getExtension(filename)         extract file extension safely
 *  - isAllowedMimeType(mime)        check against whitelist
 *  - formatFileSize(bytes)          returns "2.4 MB" string
 *  - generateObjectKey(userId, extension) canonical R2 object key
 *  - sanitizeFilename(filename)     removes unsafe characters
 *  - calculateChecksum(buffer)      calculates SHA-256 hash
 *
 * @layer Utils
 */

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/heic'
];

/**
 * Extracts the file extension safely from a filename
 */
const getExtension = (filename) => {
    if (!filename) return '';
    const parts = filename.split('.');
    if (parts.length === 1) return '';
    return parts.pop().toLowerCase();
};

/**
 * Check if the provided mime type is allowed
 */
const isAllowedMimeType = (mimeType) => {
    return ALLOWED_MIME_TYPES.includes(mimeType);
};

/**
 * Sanitize filename to remove unsafe characters
 */
const sanitizeFilename = (filename) => {
    if (!filename) return '';
    return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
};

/**
 * Format file size into a human-readable string
 */
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Generate a canonical R2 object key: attachments/{userId}/{YYYY}/{MM}/{DD}/{uuid}.{extension}
 */
const generateObjectKey = (userId, extension) => {
    const date = new Date();
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const uuid = uuidv4();
    
    const ext = extension ? `.${extension}` : '';
    return `attachments/${userId}/${yyyy}/${mm}/${dd}/${uuid}${ext}`;
};

/**
 * Calculate SHA-256 checksum of a buffer
 */
const calculateChecksum = (buffer) => {
    if (!buffer) return null;
    const hash = crypto.createHash('sha256');
    hash.update(buffer);
    return hash.digest('hex');
};

// basic magic bytes implementation (can be expanded later if needed)
// for now rely on multer's mime type and perhaps simple check
const getMimeType = (buffer) => {
    // Placeholder for actual magic bytes check
    return null; 
};

module.exports = {
    getExtension,
    isAllowedMimeType,
    sanitizeFilename,
    formatFileSize,
    generateObjectKey,
    calculateChecksum,
    getMimeType,
    ALLOWED_MIME_TYPES
};