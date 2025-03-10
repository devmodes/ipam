import DeleteIPDialog from "@components/dialogs/delete-ip-dialog";
import EditIPDialog from "@components/dialogs/edit-ip-dialog";
import EditIPLabelDialog from "@components/dialogs/edit-ip-label-dialog";
import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { IPAddress } from "@lib/types/ip-address";
import { useAuth } from "@providers/auth-provider";
import { Edit3Icon, EyeIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type IPAddressTableProps = {
  items: IPAddress[];
};

function IPAddressTable({ items }: IPAddressTableProps) {
  const { isAdmin, user } = useAuth();

  const navigate = useNavigate();

  return (
    <div>
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
            {items.map((item: IPAddress) => (
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
