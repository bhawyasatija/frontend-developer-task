import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

/**
 * Middleware
 */
// CORS - Allow frontend requests
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler (must be last)
app.use(errorHandler);

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
  ╔═══════════════════════════════════════════════╗
  ║                                               ║
  ║   🚀 TaskFlow API Server                      ║
  ║                                               ║
  ║   Port: ${PORT}                                 ║
  ║   Mode: ${process.env.NODE_ENV || 'development'}                       ║
  ║                                               ║
  ║   Endpoints:                                  ║
  ║   • POST   /api/auth/register                 ║
  ║   • POST   /api/auth/login                    ║
  ║   • GET    /api/auth/me                       ║
  ║   • GET    /api/user/profile                  ║
  ║   • PUT    /api/user/profile                  ║
  ║   • GET    /api/tasks                         ║
  ║   • POST   /api/tasks                         ║
  ║   • PUT    /api/tasks/:id                     ║
  ║   • DELETE /api/tasks/:id                     ║
  ║                                               ║
  ╚═══════════════════════════════════════════════╝
  `);
});

export default app;
