/**
 * @file middlewares/auth.middleware.js
 */
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const client = jwksClient({
    jwksUri: process.env.SUPABASE_JWKS_URL
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
        if (err) {
            return callback(err);
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

const authenticate = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Unauthorized: Missing or invalid Authorization header'));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, getKey, {
        issuer: process.env.SUPABASE_URL ? `${process.env.SUPABASE_URL}/auth/v1` : undefined,
    }, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Failure:', err.message);
            return next(new ApiError(401, `Unauthorized: ${err.message}`));
        }

        req.user = decoded;
        next();
    });
});

module.exports = { authenticate };