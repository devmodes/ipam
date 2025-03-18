import DeleteIPDialog from "@components/dialogs/delete-ip-dialog";
import EditIPDialog from "@components/dialogs/edit-ip-dialog";
import EditIPLabelDialog from "@components/dialogs/edit-ip-label-dialog";
import { Button } from "@components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { IPAddress } from "@lib/types/ip-address";
import { useAuth } from "@providers/auth-provider";
import { Edit3Icon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type IPListProps = {
  items: IPAddress[];
};

function IPCard({ item }: { item: IPAddress }) {
  const { isAdmin, user } = useAuth();

  return (
    <Card className="p-2">
      <CardHeader className="p-0">
        <small>{item.label}</small>
        <CardTitle>
          <Link to={`/app/ip-address/${item.id}`}>{item.ip}</Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="p-0">
        {!isAdmin && user.id !== item.created_by && (
          <EditIPLabelDialog item={item}>
            <Button size="sm" variant="ghost">
              <Edit3Icon /> Edit
            </Button>
          </EditIPLabelDialog>
        )}
        {!isAdmin && user.id === item.created_by && (
          <EditIPDialog item={item}>
            <Button size="sm" variant="ghost">
              <Edit3Icon /> Edit
            </Button>
          </EditIPDialog>
        )}
        {isAdmin && (
          <React.Fragment>
            <EditIPDialog item={item}>
              <Button size="sm" variant="ghost">
                <Edit3Icon /> Edit
              </Button>
            </EditIPDialog>
            <DeleteIPDialog item={item}>
              <Button size="sm" variant="ghost">
                <TrashIcon /> Delete
              </Button>
            </DeleteIPDialog>
          </React.Fragment>
        )}
      </CardFooter>
    </Card>
  );
}

function IPList({ items }: IPListProps) {
  return (
    <div className="mt-5 w-full flex flex-col gap-3">
      {items.map((item) => (
        <IPCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default IPList;
