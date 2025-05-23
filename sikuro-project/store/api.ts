import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Category,
  ProductsResponse,
  QueryArgsAddCard,
  QueryArgsCards,
  QueryArgsProducts,
} from "./types";
import { Cart } from "./slices/cartTypes";

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

    getCarts: builder.query<Cart, QueryArgsCards>({
      query: (queryArgs) => `/carts/user/${queryArgs.userId}`,
    }),

    addCarts: builder.mutation<Cart, QueryArgsAddCard>({
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

    addItemToCart: builder.mutation<Cart, QueryArgsAddCard>({
      query: (queryArgs) => ({
        url: `/carts/${queryArgs.userId}`,
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify({
          products: [
            {
              id: queryArgs.productId,
              quantity: queryArgs.quantity,
            },
          ],
        }),
      }),
    }),

    deleteCart: builder.mutation<Cart, { userId: string }>({
      query: (queryArgs) => ({
        url: `/carts/${queryArgs.userId}`,
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetCartsQuery,
  useAddCartsMutation,
  useAddItemToCartMutation,
  useDeleteCartMutation,
} = api;
