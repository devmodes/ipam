import { api } from "@store/api";

export const logsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: () => ({
        url: "/activity/logs",
      }),
    }),
  }),
});

export const { useGetActivityLogsQuery } = logsApi;
