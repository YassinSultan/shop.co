import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductToWishlistAPI, getWishlistAPI, removeProductFromWishlistAPI } from "../services/wishlistService";
import { toast } from "react-toastify";
import { useState } from "react";
import { addProductToCartAPI } from "../services/cartService";

export function useWishlist() {
    const [wishlistLoadingIds, setWishlistLoadingIds] = useState([]);
    const queryClient = useQueryClient();

    const wishlist = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishlistAPI,
        select: (data) => data.data.data,
    });

    const addToWishlist = useMutation({
        mutationFn: ({ productId }) => {
            setWishlistLoadingIds((prev) => [...prev, productId]);
            return addProductToWishlistAPI(productId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["wishlist"]);
            toast.success("Product added to wishlist");
        },
        onError: (error) => {
            toast.error("Failed to add product to wishlist");
            console.log(error);
        },
        onSettled: (_, __, { productId }) => {
            setWishlistLoadingIds((prev) => prev.filter((id) => id !== productId));
        },
    });

    const removeFromWishlist = useMutation({
        mutationFn: (productId) => {
            setWishlistLoadingIds((prev) => [...prev, productId]);
            return removeProductFromWishlistAPI(productId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["wishlist"]);
            toast.success("Product removed from wishlist");
        },
        onSettled: (_, __, productId) => {
            setWishlistLoadingIds((prev) => prev.filter((id) => id !== productId));
        },
    });

    // add all products to cart
    const addAllToCart = useMutation({
        mutationFn: async ({ productsArray }) => {
            return Promise.all(
                productsArray.map((product) => addProductToCartAPI(product._id))
            );
        },
        onSuccess: () => {
            toast.success("All products added to cart");
            queryClient.invalidateQueries(["cart"]);
        },
        onError: () => {
            toast.error("Failed to add products to cart");
        },
    });


    return {
        addAllToCart: addAllToCart.mutate, wishlist, addToWishlist: addToWishlist.mutate, removeFromWishlist: removeFromWishlist.mutate
        , addToWishlistLoading: (productId) => wishlistLoadingIds.includes(productId),
    };
}