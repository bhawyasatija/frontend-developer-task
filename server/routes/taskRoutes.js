import express from 'express';
import { body, param, query } from 'express-validator';
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';
import protect from '../middleware/auth.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

/**
 * Task Routes
 * All routes are protected and require authentication
 */

// Apply auth middleware to all routes
router.use(protect);

// Task CRUD routes
router.route('/')
    .get(
        [
            query('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status filter'),
            query('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority filter'),
            query('page').optional().isInt({ min: 1 }).withMessage('Page must be >= 1'),
            query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
        ],
        validateRequest,
        getTasks
    )
    .post(
        [
            body('title')
                .trim()
                .notEmpty().withMessage('Task title is required')
                .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
            body('description')
                .optional()
                .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
            body('status')
                .optional()
                .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be pending, in-progress, or completed'),
            body('priority')
                .optional()
                .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
            body('dueDate')
                .optional({ nullable: true })
                .custom((value) => {
                    if (value === null || value === '') return true;
                    const d = new Date(value);
                    if (Number.isNaN(d.getTime())) throw new Error('Due date must be a valid date');
                    return true;
                }),
            body('tags')
                .optional()
                .isArray().withMessage('Tags must be an array'),
            body('tags.*')
                .optional()
                .isString().withMessage('Each tag must be a string'),
        ],
        validateRequest,
        createTask
    );

router.route('/:id')
    .get(
        [param('id').isMongoId().withMessage('Invalid task id')],
        validateRequest,
        getTask
    )
    .put(
        [
            param('id').isMongoId().withMessage('Invalid task id'),
            body('title')
                .optional()
                .trim()
                .notEmpty().withMessage('Task title cannot be empty')
                .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
            body('description')
                .optional()
                .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
            body('status')
                .optional()
                .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be pending, in-progress, or completed'),
            body('priority')
                .optional()
                .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
            body('dueDate')
                .optional({ nullable: true })
                .custom((value) => {
                    if (value === null || value === '') return true;
                    const d = new Date(value);
                    if (Number.isNaN(d.getTime())) throw new Error('Due date must be a valid date');
                    return true;
                }),
            body('tags')
                .optional()
                .isArray().withMessage('Tags must be an array'),
            body('tags.*')
                .optional()
                .isString().withMessage('Each tag must be a string'),
        ],
        validateRequest,
        updateTask
    )
    .delete(
        [param('id').isMongoId().withMessage('Invalid task id')],
        validateRequest,
        deleteTask
    );

export default router;
