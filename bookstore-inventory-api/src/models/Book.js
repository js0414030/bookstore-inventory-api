// src/models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true
        },
        genre: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0
        },
        stock: {
            type: Number,
            default: 0,
            min: 0
        },
        publishedDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

BookSchema.index({ title: 1, author: 1 });

module.exports = mongoose.model('Book', BookSchema);
