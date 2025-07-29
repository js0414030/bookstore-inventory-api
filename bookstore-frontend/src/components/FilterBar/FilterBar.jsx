import React from 'react';
import styles from './FilterBar.module.css';

function FilterBar({ filters, setFilters }) {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.filterBar}>
            <input
                type="text"
                name="title"
                value={filters.title}
                placeholder="Filter by Title"
                onChange={handleChange}
                className={styles.input}
            />
            <input
                type="text"
                name="author"
                value={filters.author}
                placeholder="Filter by Author"
                onChange={handleChange}
                className={styles.input}
            />
            <input
                type="text"
                name="genre"
                value={filters.genre}
                placeholder="Filter by Genre"
                onChange={handleChange}
                className={styles.input}
            />
        </div>
    );
}

export default FilterBar;
