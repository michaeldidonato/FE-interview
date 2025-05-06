import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Category,
  ProductsResponse,
  QueryArgsAddCard,
  QueryArgsCards,
  QueryArgsProducts,
} from "./types";

export const api = createApi({
  reducerPath: "api",
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

    getCategories: builder.query<Category[], void>({
      query: () => `/products/categories`,
    }),

    getCarts: builder.query<any, QueryArgsCards>({
      query: (queryArgs) => `/carts/user/${queryArgs.userId}`,
    }),

    addCarts: builder.mutation<any, QueryArgsAddCard>({
      query: (queryArgs) => ({
        url: `/carts/add`,
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          userId: queryArgs.userId,
          products: [
            {
              id: queryArgs.productId,
              quantity: queryArgs.quantity,
            },
          ],
        }),
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetCartsQuery,
  useAddCartsMutation,
} = api;
