/**
 * @file config/cloudflare.js
 * @description Cloudflare R2 S3-compatible client singleton.
 * Creates and exports an @aws-sdk/client-s3 S3Client configured
 * with R2 endpoint, account ID, and credentials.
 * Used exclusively by storage.service.js -- never imported directly in controllers.
 *
 * @layer Config
 * @module CloudflareR2
 * @dependency @aws-sdk/client-s3
 */

const { S3Client } = require('@aws-sdk/client-s3');

if (!process.env.R2_ENDPOINT) {
    console.warn("R2_ENDPOINT is not set");
}

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});

module.exports = {
    s3Client
};