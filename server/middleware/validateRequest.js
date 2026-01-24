import { validationResult } from 'express-validator';

/**
 * Validation middleware
 * Returns 400 with a clear message when validation fails.
 */
export default function validateRequest(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) return next();

    const messages = result.array().map(e => e.msg);
    return res.status(400).json({
        success: false,
        message: messages.join(', ')
    });
}

