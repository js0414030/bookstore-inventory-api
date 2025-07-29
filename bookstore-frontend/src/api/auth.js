const API_BASE = 'http://localhost:5000/api'; // Adjust to your backend URL

export async function login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Login failed');
    }
    return res.json();
}

export async function register(email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
    }
    return res.json();
}
