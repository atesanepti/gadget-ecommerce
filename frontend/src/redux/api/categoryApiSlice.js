
import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}/`,
        method: "POST",
        body: newCategory,
        credentials: "include",
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, newCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: newCategory,
        credentials: "include",
      }),
    }),
    fetchCategory: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} = categoryApiSlice;
