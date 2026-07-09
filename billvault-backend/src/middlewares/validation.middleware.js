/**
 * @file middlewares/validation.middleware.js
 * @description Generic Joi schema runner. Accepts a Joi schema, validates req.body (or query/params). Returns 400 with field-level error details on failure.
 *
 * @layer Middleware
 * @module validation
 */
const { error } = require('../utils/response');

const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error: validationError, value } = schema.validate(req[source], {
            abortEarly: false,
            allowUnknown: false
        });

        if (validationError) {
            const details = {};
            validationError.details.forEach(err => {
                details[err.path.join('.')] = err.message;
            });
            return error(res, 400, 'Validation Error', details);
        }

        // Replace req data with validated data (which applies default values if any)
        req[source] = value;
        next();
    };
};

module.exports = { validate };