import { api } from "@store/api";

export const logsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: () => ({
        url: "/activity/logs",
      }),
      providesTags: [{ type: "logs", id: "list" }],
    }),
  }),
});

export const { useGetActivityLogsQuery } = logsApi;
