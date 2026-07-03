/**
 * @file middlewares/upload.middleware.js
 * @description Multer config for file uploads. Validates MIME type whitelist (PDF, JPEG, PNG, WEBP, HEIC). Enforces max file size by subscription plan. Saves to src/storage/upload/ temporarily.
 *
 * @layer Middleware
 * @module upload
 */