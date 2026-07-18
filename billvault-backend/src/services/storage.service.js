/**
 * @file services/storage.service.js
 * @description Cloudflare R2 abstraction: upload file stream, generate pre-signed download URL (TTL 1hr), delete object
 *
 * Service layer rules:
 *  - Contains ALL business logic for this domain
 *  - May call one or more repositories
 *  - May call other services (never circular dependencies)
 *  - May enqueue BullMQ jobs
 *  - May call external API clients
 *  - NEVER imports req or res -- pure Node.js functions
 *  - NEVER queries the database directly (delegates to repository)
 *
 * @layer Service
 * @module storage
 */

const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../config/cloudflare');

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'billvault';

/**
 * Upload a file buffer to Cloudflare R2
 * @param {Buffer} buffer File buffer
 * @param {string} objectKey Target object key
 * @param {string} mimeType File mime type
 * @returns {Promise<void>}
 */
const uploadFile = async (buffer, objectKey, mimeType) => {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: objectKey,
        Body: buffer,
        ContentType: mimeType,
    });
    
    await s3Client.send(command);
};

/**
 * Delete an object from Cloudflare R2
 * @param {string} objectKey Object key to delete
 * @returns {Promise<void>}
 */
const deleteFile = async (objectKey) => {
    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: objectKey,
    });
    
    await s3Client.send(command);
};

// Placeholders for future implementation
const generateSignedUrl = async (objectKey) => {
    throw new Error('Not implemented');
};

const exists = async (objectKey) => {
    throw new Error('Not implemented');
};

module.exports = {
    uploadFile,
    deleteFile,
    generateSignedUrl,
    exists,
    BUCKET_NAME
};