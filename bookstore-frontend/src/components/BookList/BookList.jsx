import React from 'react';
import BookItem from '../BookItem/BookItem';
import styles from './BookList.module.css';

function BookList({ books, onDelete, user }) {
    if (!books.length) return <p>No books found.</p>;

    return (
        <div className={styles.listContainer}>
            {books.map((book) => (
                <BookItem key={book._id} book={book} onDelete={onDelete} user={user} />
            ))}
        </div>
    );
}

export default BookList;
