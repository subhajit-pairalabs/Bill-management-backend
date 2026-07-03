/**
 * @file app.js
 * @description Express application factory.
 * Configures and exports the Express app instance WITHOUT calling app.listen().
 * Separation allows clean test imports without spinning up a real server.
 *
 * Responsibilities:
 *  - Apply global middleware: Helmet, CORS, Morgan, Body Parser, Cookie Parser
 *  - Mount all versioned route groups via src/routes/index.js  (/api/v1/*)
 *  - Mount Swagger UI at /api/docs
 *  - Mount WebSocket server via src/sockets/index.js
 *  - Mount 404 handler (notFound.middleware.js) -- second to last
 *  - Mount global error handler (error.middleware.js) -- must be LAST
 *
 * @layer Gateway
 * @module App
 */