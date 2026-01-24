import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/authController.js';
import protect from '../middleware/auth.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * Auth Routes
 * Handles user registration, login, and current user retrieval
 */

// Public routes
router.post(
    '/register',
    [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    validateRequest,
    register
);

router.post(
    '/login',
    [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    login
);

// Protected routes
router.get('/me', protect, getMe);

export default router;
