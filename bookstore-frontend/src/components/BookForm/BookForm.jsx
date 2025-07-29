import React, { useState, useEffect } from 'react';
import styles from './BookForm.module.css';

function BookForm({ initialData = {}, onSubmit, loading }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        stock: '',
        publishedDate: '',
    });

    const [errors, setErrors] = useState({});

    // Only update form data when initialData changes
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                title: initialData.title || '',
                author: initialData.author || '',
                genre: initialData.genre || '',
                price: initialData.price !== undefined && initialData.price !== null
                    ? initialData.price.toString()
                    : '',
                stock: initialData.stock !== undefined && initialData.stock !== null
                    ? initialData.stock.toString()
                    : '',
                publishedDate: initialData.publishedDate
                    ? new Date(initialData.publishedDate).toISOString().substr(0, 10)
                    : '',
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.author.trim()) newErrors.author = 'Author is required';
        if (
            formData.price === '' ||
            isNaN(formData.price) ||
            Number(formData.price) < 0
        )
            newErrors.price = 'Price must be a positive number';
        if (
            formData.stock !== '' &&
            (isNaN(formData.stock) || Number(formData.stock) < 0)
        )
            newErrors.stock = 'Stock must be zero or more';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '', // Clear error on change for that field
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({
            ...formData,
            price: Number(formData.price),
            stock: formData.stock ? Number(formData.stock) : 0,
            publishedDate: formData.publishedDate || null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>
                Title *
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? styles.errorInput : ''}
                    disabled={loading}
                    autoComplete="off"
                />
                {errors.title && <span className={styles.errorMsg}>{errors.title}</span>}
            </label>

            <label>
                Author *
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={errors.author ? styles.errorInput : ''}
                    disabled={loading}
                    autoComplete="off"
                />
                {errors.author && (
                    <span className={styles.errorMsg}>{errors.author}</span>
                )}
            </label>

            <label>
                Genre
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="off"
                />
            </label>

            <label>
                Price * (USD)
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={errors.price ? styles.errorInput : ''}
                    disabled={loading}
                />
                {errors.price && <span className={styles.errorMsg}>{errors.price}</span>}
            </label>

            <label>
                Stock
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={errors.stock ? styles.errorInput : ''}
                    disabled={loading}
                />
                {errors.stock && <span className={styles.errorMsg}>{errors.stock}</span>}
            </label>

            <label>
                Published Date
                <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    disabled={loading}
                />
            </label>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
            </button>
        </form>
    );
}

export default BookForm;
