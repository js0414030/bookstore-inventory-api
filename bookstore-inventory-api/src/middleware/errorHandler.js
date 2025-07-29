// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    // Default for programming or unknown errors
    let status = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Mongoose validation or cast errors
    if (err.name === 'ValidationError') {
        status = 422;
        message = Object.values(err.errors).map(e => e.message).join(', ');
    }
    if (err.name === 'CastError') {
        status = 400;
        message = 'Invalid ID';
    }

    res.status(status).json({
        success: false,
        message
    });
};
