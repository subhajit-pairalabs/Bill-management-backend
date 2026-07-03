/**
 * @file utils/constants.js
 * @description Application-wide constants and enumerations.
 * Single source of truth for all magic strings used across modules.
 *
 * Exports:
 *  ROLES            : { USER, ADMIN }
 *  VAULT_ROLES      : { OWNER, EDITOR, VIEWER }
 *  BILL_STATUS      : { ACTIVE, DELETED }
 *  OCR_STATUS       : { PENDING, PROCESSING, DONE, FAILED }
 *  BILL_SOURCE      : { MANUAL, IMPORTED, SCANNED }
 *  REMINDER_TYPE    : { BILL_DUE, WARRANTY_EXPIRY, SERVICE_INTERVAL, CUSTOM }
 *  NOTIFICATION_TYPE: { OCR_COMPLETE, REMINDER, FAMILY_INVITE, SYSTEM }
 *  PLAN             : { FREE, PRO, FAMILY }
 *  EMAIL_PROVIDER   : { GMAIL, OUTLOOK }
 *
 * @layer Utils
 */