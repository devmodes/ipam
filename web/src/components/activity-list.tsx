import { formatDateTime } from "@lib/helpers";
import { ActivityLog } from "@lib/types/activity-log";

type ActivityItemListProps = {
  items: ActivityLog[];
};

function ActivityList({ items }: ActivityItemListProps) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-zinc-900">
      {items.map((item) => (
        <div key={item.id}>
          <span className="font-semibold text-sky-700">
            [{formatDateTime(item.created_at)}]
          </span>{" "}
          <span className="font-semibold text-emerald-700">
            [{item.resource}]
          </span>{" "}
          <span>{item.message}</span>
        </div>
      ))}
    </div>
  );
}

export default ActivityList;
