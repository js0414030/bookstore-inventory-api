const express = require('express');
const router = express.Router();

const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');
const { createBookValidator, updateBookValidator } = require('../middleware/validateBook');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getBooks);
router.get('/:id', getBookById);

router.post('/', authMiddleware, createBookValidator, createBook);
router.put('/:id', authMiddleware, updateBookValidator, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
