import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';  // Make sure this is your AuthContext path
import BookForm from '../components/BookForm/BookForm';
import { createBook } from '../api';
import Notification from '../components/Notification/Notification';

function AddBook() {
    const { accessToken } = useContext(AuthContext); // Get access token from context
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (book) => {
        setLoading(true);
        try {
            // Pass token here
            await createBook(book, accessToken);
            setNotification({ type: 'success', message: 'Book added successfully!' });
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setNotification({ type: 'error', message: err.message || 'Failed to add book' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {notification && (
                <Notification type={notification.type} message={notification.message} onClose={() => setNotification(null)} />
            )}
            <h2>Add New Book</h2>
            <BookForm onSubmit={handleSubmit} loading={loading} />
        </>
    );
}

export default AddBook;
