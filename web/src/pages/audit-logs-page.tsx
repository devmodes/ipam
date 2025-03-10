import ActivityList from "@components/activity-list";
import { useFilter } from "@hooks/useFilter";

function AuditLogsPage() {
  const { render, search, sort } = useFilter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        {render()}
        <ActivityList filter={{ search, sort }} />
      </div>
    </div>
  );
}

export default AuditLogsPage;
