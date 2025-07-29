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

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true,
    })
);
app.use(helmet());

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource not found' });
});

app.use(errorHandler);

module.exports = app;
