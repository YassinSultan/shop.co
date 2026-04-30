import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../services/productService';

export default function useProductsQuery({ queryName = "products", ...filters }) {
    let response = useQuery({
        queryKey: [queryName, filters],
        queryFn: () => getProducts({ filters }),
        gcTime: 5 * 60 * 1000, // 5 minutes
        // staleTime: 5 * 60 * 1000, // 5 minutes
        select: (data) => data.data,
    });
    return response;
}
