import axios from "axios";

const api = axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// interceptor عشان يضيف التوكن لو موجود
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.token = `${token}`;
    }
    return config;
});

export default api;