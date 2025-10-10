import api from "./api";

export function addProductToCartAPI(productId) {
    return api.post("/cart", { productId });
};


export function getCartAPI() {
    return api.get("/cart");
};


// remove product from cart
export function removeProductFromCartAPI(productId) {
    return api.delete(`/cart/${productId}`);
};

// clear cart
export function clearCartAPI() {
    return api.delete("/cart");
};

// update quantity of product in cart
export function updateProductCountAPI(productId, count) {
    return api.put(`/cart/${productId}`, { count });
};
