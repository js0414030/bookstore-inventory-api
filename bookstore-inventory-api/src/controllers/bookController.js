// src/controllers/bookController.js
const Book = require('../models/Book');
const { validationResult } = require('express-validator');
const { success, error } = require('../utils/apiResponse');

// @desc    Create a new book
exports.createBook = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422);

        const book = new Book(req.body);
        const savedBook = await book.save();
        return success(res, 'Book created', savedBook);
    } catch (err) {
        next(err);
    }
};

// @desc    List books with optional filtering
exports.getBooks = async (req, res, next) => {
    try {
        const { title, author, genre } = req.query;
        let filter = {};

        if (title) filter.title = new RegExp(title, 'i');
        if (author) filter.author = new RegExp(author, 'i');
        if (genre) filter.genre = new RegExp(genre, 'i');

        const books = await Book.find(filter);
        return success(res, 'Books fetched', books);
    } catch (err) {
        next(err);
    }
};

// @desc    Get single book by ID
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return error(res, 'Book not found', 404);
        return success(res, 'Book found', book);
    } catch (err) {
        next(err);
    }
};

// @desc    Update book by ID
exports.updateBook = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return error(res, errors.array()[0].msg, 422);

        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) return error(res, 'Book not found', 404);
        return success(res, 'Book updated', book);
    } catch (err) {
        next(err);
    }
};

// @desc    Delete book by ID
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return error(res, 'Book not found', 404);
        return success(res, 'Book deleted', book);
    } catch (err) {
        next(err);
    }
};
