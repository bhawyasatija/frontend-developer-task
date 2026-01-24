import express from 'express';
import { body } from 'express-validator';
import { getProfile, updateProfile, updatePassword } from '../controllers/userController.js';
import protect from '../middleware/auth.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * User Routes
 * All routes are protected and require authentication
 */

// Apply auth middleware to all routes
router.use(protect);

// Profile routes
router.get('/profile', getProfile);
router.put(
    '/profile',
    [
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
        body('bio')
            .optional()
            .isLength({ max: 200 }).withMessage('Bio cannot exceed 200 characters'),
        body('avatar')
            .optional()
            .isString().withMessage('Avatar must be a string'),
    ],
    validateRequest,
    updateProfile
);

router.put(
    '/password',
    [
        body('currentPassword')
            .notEmpty().withMessage('Please provide current password'),
        body('newPassword')
            .notEmpty().withMessage('Please provide new password')
            .isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    ],
    validateRequest,
    updatePassword
);

export default router;
