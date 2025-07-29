import React, { useEffect } from 'react';
import styles from './Notification.module.css';

function Notification({ type, message, onClose }) {
    // Auto-dismiss after 4 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            {message}
            <button onClick={onClose} className={styles.closeBtn} aria-label="Close notification">
                &times;
            </button>
        </div>
    );
}

export default Notification;
