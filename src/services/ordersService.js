import api from "./api";
import { jwtDecode } from "jwt-decode";
export const getUserOrders = async () => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    const { data } = await api.get(`/orders/user/${decodedToken.id}`);
    return data;
};