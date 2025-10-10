import api from "./api";

export const getCategories = () => {
    return api.get("/categories");
};

export const getCategoryById = async (id) => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
};