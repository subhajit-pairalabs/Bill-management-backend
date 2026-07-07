/**
 * @file utils/response.js
 */
const success = (res, statusCode = 200, data = {}, message = "Success") => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const error = (res, statusCode = 500, message = "Internal Server Error", details = {}) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: details
    });
};

module.exports = { success, error };