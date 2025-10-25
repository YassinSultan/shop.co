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
import { useDebouncedCallback } from "use-debounce";

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
    select: (data) => data.data, // extract the data property from the response
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
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["cart", token], context.previousCart);
      toast.error("Failed to update product quantity");
    },
  });
  // Debounce the updateCount calls to avoid rapid successive calls
  const debouncedUpdate = useDebouncedCallback(
    (productId, count, previousCart) => {
      updateCount.mutate({ productId, count, previousCart });
    },
    500
  ); // 0.5 ثانية كافية جدًا
  const handleUpdateCount = (productId, count) => {
    const previousCart = queryClient.getQueryData(["cart", token]);

    // ⏱️ تحديث فوري في الكاش (optimistic)
    queryClient.setQueryData(["cart", token], (oldCart) => {
      if (!oldCart) return oldCart;
      const target = oldCart.data.data.products.find(
        (p) => p.product._id === productId
      );
      if (!target) return oldCart;

      return {
        ...oldCart,
        data: {
          ...oldCart.data,
          data: {
            ...oldCart.data.data,
            totalCartPrice:
              oldCart.data.data.totalCartPrice +
              (count * target.price - target.count * target.price),
            products: oldCart.data.data.products.map((p) =>
              p.product._id === productId ? { ...p, count } : p
            ),
          },
        },
      };
    });

    // 🚀 إرسال الطلب الحقيقي بعد التأخير (Debounce)
    debouncedUpdate(productId, count, previousCart);
  };

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
    updateCount: handleUpdateCount,
    removeFromCart: removeFromCart.mutate,
    addToCartLoading: (productId) => loadingIds.includes(productId),
    updateCountLoading: updateCount.isPending,
    removeFromCartLoading: removeFromCart.isPending,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
