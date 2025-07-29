import React, { useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import AuthContext, { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import Register from './pages/Register';

import styles from './App.module.css';

function AppContent() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    📚 Bookstore Inventory
                </Link>
                <nav>
                    {user ? (
                        <>
                            <span style={{ marginRight: '1rem', color: '#fff' }}>Hello, {user.email}</span>
                            <Link to="/add" className={styles.navLink}>
                                + Add Book
                            </Link>
                            <button
                                onClick={handleLogout}
                                className={styles.navLink}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.navLink}>
                                Login
                            </Link>
                            <Link to="/register" className={styles.navLink}>
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main className={styles.mainContent}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={user ? <AddBook /> : <Login />} />
                    <Route path="/edit/:id" element={user ? <EditBook /> : <Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>

            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Bookstore Inventory Management
            </footer>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
