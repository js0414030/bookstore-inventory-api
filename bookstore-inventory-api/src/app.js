// app.js (backend entrypoint)

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Whitelist allowed origins for CORS (localdev + production frontend URL)
const allowedOrigins = [
    'https://bookstore-inventory-api.vercel.app',
    'http://localhost:3000'
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like curl, Postman)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error('CORS policy: This origin is not allowed'), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

// Mount routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Centralized error handler middleware
app.use(errorHandler);

module.exports = app;
