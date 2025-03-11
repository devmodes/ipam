import IPAddressList from "@components/ip-address-list";
import { Skeleton } from "@components/ui/skeleton";
import { useIpAddressListQuery } from "@store/api/ip-address-api";

function AppDashboardPage() {
  const { data, isError, isFetching } = useIpAddressListQuery({
    search: "",
    sort: "desc",
    per_page: 10,
    page: 1,
  });

  if (isFetching) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold">IP Address:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-bold">IP Address:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <IPAddressList items={data.data.items} />
      </div>
    </div>
  );
}

export default AppDashboardPage;
