import { apiSlice } from "./apiSlice.js";
import { ORDER_URL } from "../constants.js";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    fetchOwnOrder: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mime`,
      }),
      keepUnusedDataFor: 5,
    }),
    fetchOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
    fetchTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-orders`,
      }),
    }),
    fetchTotalSalesData: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales`,
      }),
    }),
    fetchTotalSalesByDateData: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales-by-date`,
      }),
    }),
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ORDER_URL}/${id}/pay`,
        method: "PUT",
        body: data,
      }),
    }),
    updateDelivery: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/delivered`,
        method: "PUT",
        body: {},
      }),
    }),
    fetchOrderClientId: builder.query({
      query: () => ({
        url: "api/config/paypal",
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
