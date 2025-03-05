import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { formatDate } from "@lib/helpers";
import { ActivityLog } from "@lib/types/activity-log";

type ActivityItemListProps = {
  items: ActivityLog[];
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
          <div className="text-sm font-semibold text-muted-secondary">
            {item.message}
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

function ActivityList({ items }: ActivityItemListProps) {
  if (!items.length) {
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
      {items.map((item) => (
        <ActivityRow item={item} />
      ))}
    </div>
  );
}

export default ActivityList;
