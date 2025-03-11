import { Filters } from "@lib/types/filters";
import { api } from "@store/api";

export const logsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: (filters: Filters) => ({
        url: `/activity/logs?search=${filters.search || ""}&sort=${
          filters.sort || "desc"
        }&page=${filters.page}&per_page=${filters.per_page}`,
      }),
      providesTags: [{ type: "logs", id: "list" }],
    }),
  }),
});

export const { useGetActivityLogsQuery } = logsApi;
