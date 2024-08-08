import { apiSlice } from "./apiSlice.js";
import { USER_URL } from "../constants.js";


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    userList: builder.query({
      query: () => ({
        url: `${USER_URL}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor : 5
    }),
    
    userDelete: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.userId}`,
        method: "DELETE",
        
      }),
      keepUnusedDataFor : 5
    }),

    userUpdate : builder.mutation({
      query : (data)=>({
        url : `${USER_URL}/${data.userId}`,
        method : "PUT",
        body : data,
        
      }),
      invalidatesTags : ["User"]
    })

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useProfileMutation,
  useUserListQuery,
  useUserDeleteMutation,
  useUserUpdateMutation
} = userApiSlice;
