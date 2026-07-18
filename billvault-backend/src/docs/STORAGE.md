# BillVault -- STORAGE

This document details the Attachment Upload & Storage layer for BillVault Backend (Phase 1).

## Architecture overview
The upload layer strictly follows the `Upload → OCR → AI → Review → Bill` architecture.
During the upload phase, **no bills are created**. The attachment is simply verified, saved to Cloudflare R2, and its metadata is stored in the `attachments` table.

## Cloudflare R2 Integration
- Client initialization is in `src/config/cloudflare.js`.
- R2 logic exists only in `src/services/storage.service.js`.
- **Upload buffering:** `multer.memoryStorage()` is used. We stream directly to R2.
- **Max File Size:** 20 MB.
- **Object Key Strategy:** The storage path acts as the object key and is generated as: `attachments/{userId}/{YYYY}/{MM}/{DD}/{uuid}.{extension}`.

## API Contract

### POST `/api/v1/attachments`
Uploads a file.
- **Request Type:** `multipart/form-data`
- **Fields:** `file` (Binary file). No metadata or `bill_id` is allowed.
- **Authentication:** Required (Bearer Token)
- **Response:** Sanitized attachment metadata without raw cloud storage paths.

### GET `/api/v1/attachments`
List all attachments for the authenticated user.

### GET `/api/v1/attachments/:id`
Get metadata for a specific attachment by ID. Enforces ownership check against the user ID.

### DELETE `/api/v1/attachments/:id`
Hard deletes an attachment.
- Physical object is removed from R2 first.
- Database metadata is then deleted.
- Enforces ownership check against the user ID.

## Failure Recovery Flow
1. File is uploaded to Cloudflare R2.
2. Metadata insert into Supabase database is attempted.
3. If database insert fails, an immediate rollback happens: the uploaded object is deleted from R2. This prevents orphaned files in the storage bucket.

## Testing with APIDOG
To test this API using APIDOG:
1. Ensure you have authenticated and copied your Bearer Token.
2. Create a `POST` request to `http://localhost:3000/api/v1/attachments` (or your configured backend URL).
3. Set the Authorization header to `Bearer <Your_Token>`.
4. Navigate to the Body tab -> select `form-data`.
5. Add a key named `file`, change its type to `File`, and select a local file (`.jpg`, `.png`, `.pdf`, `.heic`).
6. Send the request and verify the returned `id` and `file_name`. Ensure `bill_id` is `null`.
