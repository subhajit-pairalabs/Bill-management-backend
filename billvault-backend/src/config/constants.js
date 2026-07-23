/**
 * @file config/constants.js
 */

const MAX_ATTACHMENTS = 5;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/heic'
];

module.exports = {
    MAX_ATTACHMENTS,
    MAX_FILE_SIZE,
    ALLOWED_MIME_TYPES
};
