import api from "./api";

export function getProducts({ filters }) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item) => params.append(key, item));
        } else {
            params.append(key, value);
        }
    });

    return api.get("/products", {
        params,
    });
}

export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};