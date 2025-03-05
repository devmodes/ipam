import ActivityList from "@components/activity-list";
import { useGetActivityLogsQuery } from "@store/api/logs-api";

function AuditLogsPage() {
  const { data, isLoading, isError } = useGetActivityLogsQuery({});

  if (isLoading) {
    return <div>Loding...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <ActivityList items={data.data} />
    </div>
  );
}

export default AuditLogsPage;
