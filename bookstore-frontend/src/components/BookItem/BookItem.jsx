import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BookItem.module.css';

function BookItem({ book, onDelete, user }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <h3 className={styles.title}>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
                <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
                <p><strong>Stock:</strong> {book.stock}</p>
                {book.publishedDate && (
                    <p>
                        <strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}
                    </p>
                )}
            </div>

            <div className={styles.cardFooter}>
                {user ? (
                    <>
                        <Link to={`/edit/${book._id}`} className={styles.editBtn}>
                            ✏️ Edit
                        </Link>
                        <button onClick={() => onDelete(book._id)} className={styles.deleteBtn}>
                            🗑️ Delete
                        </button>
                    </>
                ) : (
                    <p style={{ color: '#888', fontStyle: 'italic', margin: 0 }}>
                        Login to edit
                    </p>
                )}
            </div>
        </div>
    );
}

export default BookItem;
