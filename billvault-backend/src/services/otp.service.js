/**
 * @file services/otp.service.js
 */
const ApiError = require('../utils/ApiError');

const sendOTP = async (phone) => {
    throw new ApiError(501, 'NotImplementedError: OTP service not implemented yet');
};

const verifyOTP = async (phone, code) => {
    throw new ApiError(501, 'NotImplementedError: OTP service not implemented yet');
};

module.exports = {
    sendOTP,
    verifyOTP
};