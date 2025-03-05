import { Button } from "@components/ui/button";
import { Table, TableCell, TableRow } from "@components/ui/table";
import { useAuth } from "@providers/auth-provider";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function AccountsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => navigate(-1)} variant="link" className="px-0">
          <ArrowLeftIcon />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-bold">Account Details</h2>
          <Table>
            <TableRow className="border-none">
              <TableCell className="text-muted-foreground font-medium">
                ID
              </TableCell>
              <TableCell className="font-semibold">{user.id}</TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="text-muted-foreground font-medium">
                Name
              </TableCell>
              <TableCell className="font-semibold">{user.name}</TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="text-muted-foreground font-medium">
                Email
              </TableCell>
              <TableCell className="font-semibold">{user.email}</TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="text-muted-foreground font-medium">
                Role
              </TableCell>
              <TableCell className="font-semibold">{user.role.name}</TableCell>
            </TableRow>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AccountsPage;
