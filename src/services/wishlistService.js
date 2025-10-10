import api from "./api";

export function addProductToWishlistAPI(productId) {
    return api.post("/wishlist", { productId });
};
export function removeProductFromWishlistAPI(productId) {
    return api.delete(`/wishlist/${productId}`);
};
export function getWishlistAPI() {
    return api.get('/wishlist');
};