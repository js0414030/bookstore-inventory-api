import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm/BookForm';
import { fetchBookById, updateBook } from '../api';
import Notification from '../components/Notification/Notification';
import AuthContext from '../context/AuthContext';

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useContext(AuthContext); // get token from Context

    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        async function loadBook() {
            try {
                const res = await fetchBookById(id, accessToken);
                setBookData(res.data);
            } catch (err) {
                setNotification({ type: 'error', message: err.message });
            } finally {
                setLoadingInitial(false);
            }
        }
        loadBook();
    }, [id, accessToken]);

    const handleSubmit = async (book) => {
        setLoading(true);
        try {
            await updateBook(id, book, accessToken);
            setNotification({ type: 'success', message: 'Book updated successfully!' });
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setNotification({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (loadingInitial) return <p>Loading book data...</p>;
    if (!bookData) return <p>Book not found.</p>;

    return (
        <>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <h2>Edit Book</h2>
            <BookForm initialData={bookData} onSubmit={handleSubmit} loading={loading} />
        </>
    );
}

export default EditBook;
