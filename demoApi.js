const DEFAULT_BASE_URL = 'http://localhost:8000/api/v1';

function getBaseUrl() {
    const envUrl = import.meta?.env?.VITE_API_BASE_URL;
    return (envUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
}

async function request(path, options = {}) {
    const url = `${getBaseUrl()}${path}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`API ${response.status}: ${text || response.statusText}`);
    }

    const data = await response.json().catch(() => ({}));
    return data;
}

function unwrapResults(payload) {
    const data = payload?.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(payload?.results)) return payload.results;
    return [];
}

export async function getProductsDemo(search = '') {
    const q = new URLSearchParams();
    q.set('page_size', '200');
    if (search) q.set('search', search);
    const payload = await request(`/menu/products/?${q.toString()}`);
    return unwrapResults(payload);
}

export async function getProductDetailDemo(id) {
    const payload = await request(`/menu/products/${id}/`);
    return payload?.data || payload;
}

export async function createOrderDemo({ table = 1, items = [], notes = '' }) {
    const payload = await request('/orders/', {
        method: 'POST',
        body: JSON.stringify({ table, items, notes }),
    });
    return payload?.data || payload;
}
