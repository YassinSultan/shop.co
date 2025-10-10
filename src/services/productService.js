import api from "./api";

export function getProducts({ page = 1, limit = 40, sort = "createdAt" }) {
    return api.get("/products", {
        params: {
            page,
            limit,
            sort
        }
    });
};

export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};