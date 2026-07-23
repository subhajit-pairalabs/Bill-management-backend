/**
 * @file validators/attachments.validator.js
 */
const Joi = require('joi');

const validateAttachmentId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().uuid().optional(),
        attachmentId: Joi.string().uuid().optional()
    }).or('id', 'attachmentId');

    const { error } = schema.validate(req.params);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            error: error.details[0].message
        });
    }
    
    next();
};

const validateUpload = (req, res, next) => {
    // If client passes anything other than 'file', we ignore or reject it.
    // For strictness, if body has any keys, we can reject it.
    if (req.body && Object.keys(req.body).length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            error: 'No additional metadata (like bill_id) is allowed during upload'
        });
    }
    next();
};

module.exports = {
    validateAttachmentId,
    validateUpload
};
