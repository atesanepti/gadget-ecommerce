import { PRODUCT_URL, UPLOAD_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: `${PRODUCT_URL}/`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),

    fetchAllProduct: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/allProduct`,
        credentials: "include",
      }),
    }),

    fetchProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
    fetchTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    fetchNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    fetchProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        credentials: "include",
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation({
      query: (image) => ({
        url: `${UPLOAD_URL}/`,
        method: "POST",
        credentials: "include",
        body: image,
      }),
    }),
    deleteProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/delete`,
        method: "DELETE",
        body: { image: data },
        credentials: "include",
      }),
    }),
    addProductReview: builder.mutation({
      query: ({ data, productId }) => ({
        url: `${PRODUCT_URL}/${productId}/review`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    updateProductReview: builder.mutation({
      query: ({ data, productId }) => ({
        url: `${PRODUCT_URL}/${productId}/review`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    fetchFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
        credentials: "include",
      }),
    }),

    fetchCategoryRelatedProduct: builder.query({
      query: (category) => ({
        url: `${PRODUCT_URL}/category/${category}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateProductMutation,
  useFetchAllProductQuery,
  useFetchProductsQuery,
  useUpdateProductMutation,
  useFetchProductByIdQuery,
  useDeleteProductMutation,
  useFetchTopProductsQuery,
  useFetchNewProductsQuery,
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
  useAddProductReviewMutation,
  useUpdateProductReviewMutation,
  useFetchFilteredProductsQuery,
  useFetchCategoryRelatedProductQuery,
} = productApiSlice;
