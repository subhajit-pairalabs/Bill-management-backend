/**
 * @file sockets/notification.socket.js
 * @description Real-time notification event emitters.
 * Exports functions called by workers and services to push events to connected clients.
 *
 * Exports:
 *  - emitNotification(userId, payload)          emits "notification:new" to "user:{userId}" room
 *  - emitOcrComplete(userId, billId, ocrData)   emits "ocr:complete"
 *  - emitBillUpdated(userId, billId)            emits "bill:updated"
 *
 * These functions are safe to call even if the target user is not currently connected.
 * Socket.IO handles the case gracefully (no-op if room is empty).
 *
 * @layer Socket
 * @module NotificationSocket
 */