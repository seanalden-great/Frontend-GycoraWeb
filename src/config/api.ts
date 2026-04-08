// Jika menggunakan Vite (standar React modern saat ini)
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// ATAU, jika Anda menggunakan Create React App (CRA) lama:
// export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

// ATAU, cara paling sederhana (tanpa .env):
// export const BASE_URL = "http://127.0.0.1:8000";