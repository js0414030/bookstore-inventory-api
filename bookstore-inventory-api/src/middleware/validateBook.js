// src/middleware/validateBook.js
const { body } = require('express-validator');

exports.createBookValidator = [
    body('title').notEmpty().withMessage('Title is required').trim(),
    body('author').notEmpty().withMessage('Author is required').trim(),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

exports.updateBookValidator = [
    body('title').optional().notEmpty().trim(),
    body('author').optional().notEmpty().trim(),
    body('price').optional().isFloat({ min: 0 }),
    body('stock').optional().isInt({ min: 0 }),
];
