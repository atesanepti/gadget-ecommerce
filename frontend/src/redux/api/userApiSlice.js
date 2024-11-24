import { apiSlice } from "./apiSlice.js";
import { USER_URL } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    userList: builder.query({
      query: () => ({
        url: `${USER_URL}`,
        credentials: "include",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    userDelete: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}`,
        method: "DELETE",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),

    userUpdate: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useProfileMutation,
  useUserListQuery,
  useUserDeleteMutation,
  useUserUpdateMutation,
} = userApiSlice;
