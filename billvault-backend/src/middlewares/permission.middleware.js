/**
 * @file middlewares/permission.middleware.js
 * @description Family Vault RBAC enforcement. Checks requesting user role within a vault (owner/editor/viewer). Returns 403 if insufficient. Used on /family/:vaultId/* routes.
 *
 * @layer Middleware
 * @module permission
 */