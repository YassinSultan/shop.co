import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCategories } from '../services/catergoriesService';

export default function useCategoriesQuery() {
    let response = useQuery({
        queryKey: ["Categories"],
        queryFn: getCategories,
        select: (data) => data.data.data,
    });
    return response;
}
