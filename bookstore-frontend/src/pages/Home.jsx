import React, { useState, useEffect, useContext } from 'react';
import { fetchBooks, deleteBook } from '../api';
import AuthContext from '../context/AuthContext';

import BookList from '../components/BookList/BookList';
import FilterBar from '../components/FilterBar/FilterBar';
import Notification from '../components/Notification/Notification';

function Home() {
    const { user, accessToken } = useContext(AuthContext);

    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({ title: '', author: '', genre: '' });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    async function loadBooks() {
        setLoading(true);
        try {
            const res = await fetchBooks(filters, accessToken);
            setBooks(res.data);
        } catch (err) {
            setNotification({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, accessToken]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;

        try {
            await deleteBook(id, accessToken);
            setNotification({ type: 'success', message: 'Book deleted successfully!' });
            loadBooks();
        } catch (err) {
            setNotification({ type: 'error', message: err.message });
        }
    };

    return (
        <>
            {notification && (
                <Notification type={notification.type} message={notification.message} onClose={() => setNotification(null)} />
            )}

            <FilterBar filters={filters} setFilters={setFilters} />

            {loading ? <p>Loading books...</p> : <BookList books={books} onDelete={handleDelete} user={user} />}
        </>
    );
}

export default Home;
