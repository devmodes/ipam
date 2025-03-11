import { Filters } from "@lib/types/filters";
import { IPAddress } from "@lib/types/ip-address";
import { api } from "@store/api";

export const ipAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createIPAddress: builder.mutation({
      query: (data: Omit<IPAddress, "id" | "created_at">) => ({
        url: `/ip-addresses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "ipAddress", id: "list" },
        { type: "logs", id: "list" },
      ],
    }),
    ipAddressList: builder.query({
      query: (filter: Filters) => ({
        url: `/ip-addresses?search=${filter.search || ""}&sort=${
          filter.sort || "desc"
        }&page=${filter.page}&per_page=${filter.per_page}`,
      }),
      providesTags: [
        { type: "ipAddress", id: "list" },
        { type: "logs", id: "list" },
      ],
    }),
    getIPAddress: builder.query({
      query: (id: string) => ({
        url: `/ip-addresses/${id}`,
      }),
    }),
    updateIPAddress: builder.mutation({
      query: (data: Omit<IPAddress, "created_at">) => ({
        url: `/ip-addresses/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [
        { type: "ipAddress", id: "list" },
        { type: "logs", id: "list" },
      ],
    }),
    updateIPAddressLabel: builder.mutation({
      query: (data: Pick<IPAddress, "label" | "id">) => ({
        url: `/ip-addresses/label/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [
        { type: "ipAddress", id: "list" },
        { type: "logs", id: "list" },
      ],
    }),
    deleteIPAddress: builder.mutation({
      query: (id: string) => ({
        url: `/ip-addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "ipAddress", id: "list" },
        { type: "logs", id: "list" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateIPAddressMutation,
  useIpAddressListQuery,
  useGetIPAddressQuery,
  useUpdateIPAddressMutation,
  useUpdateIPAddressLabelMutation,
  useDeleteIPAddressMutation,
} = ipAddressApi;
