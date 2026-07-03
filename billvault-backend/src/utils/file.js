/**
 * @file utils/file.js
 * @description File utility functions with zero side effects.
 *
 * Exports:
 *  - getMimeType(buffer)            detect MIME from file buffer (magic bytes)
 *  - getExtension(filename)         extract file extension safely
 *  - isAllowedMimeType(mime)        check against whitelist
 *  - formatFileSize(bytes)          returns "2.4 MB" string
 *  - generateR2Key(userId, billId, filename) canonical R2 object key
 *
 * @layer Utils
 */