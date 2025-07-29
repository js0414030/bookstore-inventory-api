const API_BASE = 'https://bookstore-inventory-b8xo.onrender.com/api/books';

function getAuthHeaders(token) {
    return token
        ? {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        : { 'Content-Type': 'application/json' };
}

export async function fetchBooks(filters = {}, token) {
    const params = new URLSearchParams();
    for (const key in filters) {
        if (filters[key]) params.append(key, filters[key]);
    }
    const res = await fetch(`${API_BASE}?${params.toString()}`, { headers: getAuthHeaders(token) });
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
}

export async function createBook(book, token) {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(book),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to create book');
    }
    return res.json();
}

export async function updateBook(id, book, token) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(book),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update book');
    }
    return res.json();
}

export async function deleteBook(id, token) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete book');
    }
    return res.json();
}

export async function fetchBookById(id, token) {
    const headers = token
        ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        : { 'Content-Type': 'application/json' };

    const response = await fetch(`${API_BASE}/${id}`, { headers });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch book');
    }

    return response.json(); // should return { success: true, data: book }
}