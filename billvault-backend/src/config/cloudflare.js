/**
 * @file config/cloudflare.js
 * @description Cloudflare R2 S3-compatible client singleton.
 * Creates and exports an @aws-sdk/client-s3 S3Client configured
 * with R2 endpoint, account ID, and credentials.
 * Used exclusively by storage.service.js -- never imported directly in controllers.
 *
 * Config source: env.js (R2_ACCOUNT_ID, R2_ACCESS_KEY, R2_SECRET_KEY, R2_BUCKET, R2_ENDPOINT)
 *
 * @layer Config
 * @module CloudflareR2
 * @dependency @aws-sdk/client-s3
 */