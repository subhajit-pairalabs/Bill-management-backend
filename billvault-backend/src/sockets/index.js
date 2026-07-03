/**
 * @file sockets/index.js
 * @description Socket.IO server initialization and authentication middleware.
 * Attaches Socket.IO to the HTTP server created in server.js.
 *
 * Responsibilities:
 *  - Create and export the io (Socket.IO server) instance
 *  - Apply auth middleware: verify JWT in handshake.auth.token
 *  - On connection: join user to private room "user:{userId}"
 *  - Register socket event handlers from notification.socket.js
 *  - Handle disconnection and cleanup
 *
 * Events emitted TO client:
 *  - "notification:new"  -- new in-app notification
 *  - "ocr:complete"      -- OCR processing finished for a bill
 *  - "bill:updated"      -- bill data changed (family vault sync)
 *
 * @layer Socket
 * @module SocketServer
 * @dependency socket.io
 */