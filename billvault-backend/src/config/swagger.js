/**
 * @file config/swagger.js
 * @description Swagger UI and OpenAPI 3.0 spec setup.
 * Loads the OpenAPI spec from src/docs/openapi.json and mounts
 * swagger-ui-express at /api/docs.
 * Also configures swagger-jsdoc to auto-generate spec from JSDoc comments.
 *
 * @layer Config
 * @module Swagger
 * @dependency swagger-ui-express, swagger-jsdoc
 */