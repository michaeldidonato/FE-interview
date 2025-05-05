import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse, QueryArgsProducts } from "./types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, QueryArgsProducts>({
      query: (queryArgs) =>
        queryArgs.category
          ? `/products/category/${queryArgs.category}?limit=${queryArgs.limit}&skip=${queryArgs.skip}`
          : queryArgs.search
          ? `/products/search?q=${queryArgs.search}`
          : `/products?limit=${queryArgs.limit}&skip=${queryArgs.skip}`,
    }),

    getCategories: builder.query<any, void>({
      query: () => `/products/categories`,
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productsApi;
