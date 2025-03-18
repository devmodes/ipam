import ActivityList from "@components/activity-list";
import SimplePagination from "@components/simple-pagination";
import { Skeleton } from "@components/ui/skeleton";
import { useFilter } from "@hooks/useFilter";
import { useGetActivityLogsQuery } from "@store/api/logs-api";

function AuditLogsPage() {
  const { render, filters, setPage } = useFilter();
  const { data, isLoading, isError } = useGetActivityLogsQuery(filters);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (!data.data.items.length && !filters.search) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>There is no activity to log yet!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {render()}
      <ActivityList items={data.data.items} />
      <SimplePagination
        meta={data.data.pagination_meta}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
}

export default AuditLogsPage;
