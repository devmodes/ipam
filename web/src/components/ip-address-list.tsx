import IPAddressCard from "@components/ip-address-card";
import { IPAddress } from "@lib/types/ip-address";

type IPAddressListProps = {
  items: IPAddress[];
};

function IPAddressList({ items }: IPAddressListProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <IPAddressCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default IPAddressList;
