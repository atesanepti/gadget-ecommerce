
import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}/`,
        method: "POST",
        body: newCategory,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, newCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: newCategory,
      }),
    }),
    fetchCategory: builder.query({
      query: ()=>({
        url : `${CATEGORY_URL}/`
      })
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} = categoryApiSlice;
