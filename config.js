const envApiBase = String(import.meta.env?.VITE_API_BASE || "").trim();
const defaultApiBase = import.meta.env.DEV
    ? "http://127.0.0.1:8000/"
    : "https://hiwebmenudigital-production.up.railway.app";

export const API_BASE = (envApiBase || defaultApiBase).replace(/\/+$/, "");

export default {
    API_BASE,
};
