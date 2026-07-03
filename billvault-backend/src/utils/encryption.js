/**
 * @file utils/encryption.js
 * @description AES-256-GCM encryption and decryption utilities.
 * Used to encrypt sensitive data at rest: Gmail/Outlook OAuth tokens.
 * Encryption key is derived from ENCRYPTION_SECRET in env.js.
 *
 * Exports:
 *  - encrypt(plaintext) => { iv, ciphertext, tag }
 *  - decrypt({ iv, ciphertext, tag }) => plaintext
 *
 * @layer Utils
 * @dependency crypto (Node.js built-in)
 */