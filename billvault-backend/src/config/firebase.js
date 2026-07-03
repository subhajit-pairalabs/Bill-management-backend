/**
 * @file config/firebase.js
 * @description Firebase Admin SDK initialisation.
 * Initialises firebase-admin with service account credentials and exports
 * the admin.messaging() instance used by firebase.service.js for FCM push dispatch.
 *
 * Config source: env.js (FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_CREDENTIALS_JSON)
 *
 * @layer Config
 * @module Firebase
 * @dependency firebase-admin
 */