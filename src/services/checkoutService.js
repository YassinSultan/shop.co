import api from "./api";

export const createCashOrder = async (cartId, shippingAddress) => {
    const data = await api.post(`/orders/${cartId}`, shippingAddress);
    return data;
};

export const createVisaOrder = async (cartId, shippingAddress) => {
    const { data } = await api.post(`/orders/checkout-session/${cartId}?url=http://localhost:5173`, shippingAddress);
    console.log(data);
    return data;
};