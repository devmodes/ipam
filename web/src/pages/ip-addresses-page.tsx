import CreateIPDialog from "@components/dialogs/create-ip-dialog";
import IPAddressTable from "@components/ip-address-table";
import SimplePagination from "@components/simple-pagination";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { useFilter } from "@hooks/useFilter";
import { useIpAddressListQuery } from "@store/api/ip-address-api";

function IPAddressesPage() {
  const { render, filters, setPage } = useFilter();
  const { data, isLoading, isError } = useIpAddressListQuery(filters);

  if (isLoading) {
    return (
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">IP Address</TableHead>
              <TableHead className="text-center">Label</TableHead>
              <TableHead className="text-center">Comment</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow className="h-14" key={i}>
                <TableCell>
                  <Skeleton className="h-2 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-2 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-2 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-2 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (isError && !data) {
    return <div>Something went wrong</div>;
  }

  if (!data.data.items.length && !filters.search) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>There are no recorded IP Address yet</h2>
          <CreateIPDialog>
            <Button>Add IP Address</Button>
          </CreateIPDialog>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <CreateIPDialog>
          <Button size="sm">New IP Address</Button>
        </CreateIPDialog>
        <div className="">{render()}</div>
      </div>
      <IPAddressTable items={data.data.items} />
      <div className="mt-3">
        <SimplePagination
          onChange={(p) => setPage(p)}
          meta={data.data.pagination_meta}
        />
      </div>
    </div>
  );
}

export default IPAddressesPage;
