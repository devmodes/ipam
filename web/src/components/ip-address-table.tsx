import CreateIPDialog from "@components/dialogs/create-ip-dialog";
import DeleteIPDialog from "@components/dialogs/delete-ip-dialog";
import EditIPDialog from "@components/dialogs/edit-ip-dialog";
import EditIPLabelDialog from "@components/dialogs/edit-ip-label-dialog";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { IPAddress } from "@lib/types/ip-address";
import { useAuth } from "@providers/auth-provider";
import { useIpAddressListQuery } from "@store/api/ip-address-api";
import { Edit3Icon, EyeIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type IPAddressTableProps = {
  filters: {
    search: string;
    sort: "asc" | "desc";
  };
};

function IPAddressTable({ filters }: IPAddressTableProps) {
  const { isAdmin, user } = useAuth();
  const { data, isLoading, isError } = useIpAddressListQuery(filters);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mt-5">
        <Table>
          <TableCaption className="text-start">
            <div className="flex items-center justify-between">
              <div className="flex-1">List of recorded IP Address</div>
            </div>
          </TableCaption>
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
              <TableRow className="h-14">
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

  if (!data.data.length) {
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
      <CreateIPDialog>
        <Button size="sm">New IP Address</Button>
      </CreateIPDialog>
      <div className="mt-5">
        <Table>
          <TableCaption className="text-start">
            <div className="flex items-center justify-between">
              <div className="flex-1">List of recorded IP Address</div>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">IP Address</TableHead>
              <TableHead className="text-center">Label</TableHead>
              <TableHead className="text-center">Comment</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item: IPAddress) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.ip}</TableCell>
                <TableCell className="text-center">{item.label}</TableCell>
                <TableCell className="text-center">{item.comment}</TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/app/ip-address/${item.id}`)}
                  >
                    <EyeIcon />
                  </Button>
                  {!isAdmin && user.id !== item.created_by && (
                    <EditIPLabelDialog item={item}>
                      <Button size="sm" variant="ghost">
                        <Edit3Icon />
                      </Button>
                    </EditIPLabelDialog>
                  )}
                  {!isAdmin && user.id === item.created_by && (
                    <EditIPDialog item={item}>
                      <Button size="sm" variant="ghost">
                        <Edit3Icon />
                      </Button>
                    </EditIPDialog>
                  )}
                  {isAdmin && (
                    <React.Fragment>
                      <EditIPDialog item={item}>
                        <Button size="sm" variant="ghost">
                          <Edit3Icon />
                        </Button>
                      </EditIPDialog>
                      <DeleteIPDialog item={item}>
                        <Button size="sm" variant="ghost">
                          <TrashIcon />
                        </Button>
                      </DeleteIPDialog>
                    </React.Fragment>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default IPAddressTable;
