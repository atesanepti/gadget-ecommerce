import { apiSlice } from "./apiSlice.js";
import { ORDER_URL } from "../constants.js";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        credentials : "include",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
        credentials : "include",
      }),
    }),
    fetchOwnOrder: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mime`,
        credentials : "include",
      }),
      keepUnusedDataFor: 5,
    }),
    fetchOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        credentials : "include",
      }),
    }),
    fetchTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-orders`,
        credentials : "include",
      }),
    }),
    fetchTotalSalesData: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales`,
        credentials : "include",
      }),
    }),
    fetchTotalSalesByDateData: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales-by-date`,
        credentials : "include",
      }),
    }),
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ORDER_URL}/${id}/pay`,
        credentials : "include",
        method: "PUT",
        body: data,
      }),
    }),
    updateDelivery: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/delivered`,
        credentials : "include",
        method: "PUT",
        body: {},
      }),
    }),
    fetchOrderClientId: builder.query({
      query: () => ({
        url: "api/config/paypal",
        credentials : "include",
      }),
    }),
  }),
});

export const {
  useFetchAllOrdersQuery,
  useCreateOrderMutation,
  useFetchOrderByIdQuery,
  useFetchOwnOrderQuery,
  useFetchTotalOrdersQuery,
  useFetchTotalSalesByDateDataQuery,
  useFetchTotalSalesDataQuery,
  useUpdateDeliveryMutation,
  useUpdatePaymentMutation,
  useFetchOrderClientIdQuery,
} = orderApiSlice;
