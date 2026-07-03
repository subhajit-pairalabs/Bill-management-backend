/**
 * @file routes/index.js
 * @description Master router. Mounts all domain sub-routers under /api/v1.
 * This is the single entry point for all HTTP routing.
 * Adding a new module requires exactly one line here.
 *
 * Route groups mounted:
 *  /api/v1/auth           -> auth.routes.js
 *  /api/v1/users          -> user.routes.js
 *  /api/v1/bills          -> bill.routes.js
 *  /api/v1/categories     -> category.routes.js
 *  /api/v1/reminders      -> reminder.routes.js
 *  /api/v1/notifications  -> notification.routes.js
 *  /api/v1/family         -> family.routes.js
 *  /api/v1/email          -> email.routes.js
 *  /api/v1/ocr            -> ocr.routes.js
 *  /api/v1/analytics      -> analytics.routes.js
 *  /api/v1/subscriptions  -> subscription.routes.js
 *  /api/v1/search         -> search.routes.js
 *  /api/v1/admin          -> admin.routes.js
 *
 * @layer Routes
 * @module Router
 */