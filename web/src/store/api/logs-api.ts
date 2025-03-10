import { api } from "@store/api";

type FilterType = {
  search: string;
  sort: "asc" | "desc";
};

export const logsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: (filters: FilterType) => ({
        url: `/activity/logs?search=${filters.search}&sort=${filters.sort}`,
      }),
      providesTags: [{ type: "logs", id: "list" }],
    }),
  }),
});

export const { useGetActivityLogsQuery } = logsApi;
