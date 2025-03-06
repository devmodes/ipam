import IPAddressList from "@components/ip-address-list";
import { useIpAddressListQuery } from "@store/api/ip-address-api";
import React from "react";

function AppDashboardPage() {
  const { data, isError, isFetching } = useIpAddressListQuery({});

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-bold">IP Address:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <IPAddressList items={data.data} />
      </div>
    </div>
  );
}

export default AppDashboardPage;
