# BillVault Storage Architecture & Policies

This document outlines the proposed storage architecture using Supabase Storage for the BillVault platform.

## Required Buckets

1. **`bills`**: Stores the original PDFs or image files of user receipts and invoices. (Private)
2. **`thumbnails`**: Stores compressed/resized thumbnails for quick list rendering in the UI. (Private)
3. **`avatars`**: Stores user profile pictures. (Public)

## Naming Convention

Files within private buckets should use a randomized or UUID-based naming convention prefixed by the `user_id` to ensure strict partitioning and easy RLS application.

Format: `{user_id}/{bill_id}/{file_uuid}.{extension}`
Example: `b1a2c3d4/f8e7d6c5/9a8b7c6d5e4f.pdf`

## Future Storage Policies (RLS)

Storage buckets in Supabase can be secured using RLS policies identical to database tables. The following policies should be implemented when the Storage module is activated:

### Upload Permissions
- **Bills & Thumbnails**: Users can only upload files into a path that begins with their `auth.uid()`.
- **Avatars**: Users can only upload or update files in the `avatars` bucket if the path matches their `auth.uid()`.

### Download / Read Permissions
- **Bills & Thumbnails**: 
  - Users can read any file where the path begins with their `auth.uid()`.
  - *Family Access*: If a bill is shared with a family, family members with appropriate permissions can read the file (requires joining against `shared_bills` and `family_members` during policy evaluation).
- **Avatars**: Publicly readable.

### Delete Permissions
- **Bills & Thumbnails**: Users can only delete files where the path begins with their `auth.uid()`.
- **Avatars**: Users can delete their own avatar.

### Shared Family Permissions
When a user shares a bill with a family group, the storage policy must allow family members to view the attachment. This involves creating a `SELECT` policy on the `storage.objects` table that checks the `bill_id` embedded in the file path against the `shared_bills` table, verifying the requester is an active `family_member`.
