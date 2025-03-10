import IPAddressTable from "@components/ip-address-table";
import { useFilter } from "@hooks/useFilter";

function IPAddressesPage() {
  const { render, search, sort } = useFilter();
  return (
    <div>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-2">{render()}</div>
      <IPAddressTable filters={{ search, sort }} />
    </div>
  );
}

export default IPAddressesPage;
