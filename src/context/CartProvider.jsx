import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartAPI,
  addProductToCartAPI,
  removeProductFromCartAPI,
  updateProductCountAPI,
} from "../services/cartService";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [loadingIds, setLoadingIds] = useState([]);
  // ✅ Fetch the cart (React Query handles caching and refetching automatically)
  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", token],
    queryFn: getCartAPI,
    enabled: !!token, // only fetch when token exists
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  // ✅ Add product to cart
  const addToCart = useMutation({
    mutationFn: ({ productId }) => addProductToCartAPI(productId),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["cart"]); // auto refetch cart data
    },
    onError: () => {
      toast.error("Failed to add product to cart");
    },
    onMutate: ({ productId }) => {
      setLoadingIds((prev) => [...prev, productId]); // show loading indicator for the specific product
    },

    onSettled: (_, __, { productId }) => {
      setLoadingIds((prev) => prev.filter((id) => id !== productId));
    },
  });

  // ✅ Update product count
  const updateCount = useMutation({
    mutationFn: ({ productId, count }) =>
      updateProductCountAPI(productId, count),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["cart"]);
      console.log(res);
    },
    onError: () => {
      toast.error("Failed to update product quantity");
    },
  });

  // ✅ Remove product
  const removeFromCart = useMutation({
    mutationFn: removeProductFromCartAPI,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("Failed to remove product from cart");
    },
  });

  // ✅ Provide all cart actions and data
  const value = {
    cart,
    isLoading,
    isError,
    addToCart: addToCart.mutate,
    updateCount: updateCount.mutate,
    removeFromCart: removeFromCart.mutate,
    addToCartLoading: (productId) => loadingIds.includes(productId),
    updateCountLoading: updateCount.isPending,
    removeFromCartLoading: removeFromCart.isPending,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
