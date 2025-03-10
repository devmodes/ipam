import { Badge } from "@components/ui/badge";
import { Card, CardHeader, CardTitle } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
import { formatDateTime } from "@lib/helpers";
import { ActivityLog } from "@lib/types/activity-log";
import { useGetActivityLogsQuery } from "@store/api/logs-api";

type ActivityItemListProps = {
  filter: {
    search: string;
    sort: "asc" | "desc";
  };
};

type ActivityRowProps = {
  item: ActivityLog;
};

function ActivityRow({ item }: ActivityRowProps) {
  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2">
          <Badge variant="secondary">{item.resource}</Badge>
          <div className="text-muted-foreground">
            {formatDateTime(item.created_at)}
          </div>
          <div className="text-sm font-semibold text-muted-secondary">
            {item.message}
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

function ActivityList({ filter }: ActivityItemListProps) {
  const { data, isLoading, isError } = useGetActivityLogsQuery(filter);

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

  if (!data.data.length) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>There is no activity to log yet!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data.data.map((item: ActivityLog) => (
        <ActivityRow key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ActivityList;
