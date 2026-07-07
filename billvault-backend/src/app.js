/**
 * @file app.js
 */
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const ApiError = require('./utils/ApiError');
const { error: errorResponse } = require('./utils/response');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount all routes
app.use('/api/v1', routes);

// 404 Handler
app.use((req, res, next) => {
    next(new ApiError(404, 'Route Not Found'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return errorResponse(res, statusCode, message, err.details || {});
});

module.exports = app;