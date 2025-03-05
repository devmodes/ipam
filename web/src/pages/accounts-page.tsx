import { Table, TableCell, TableRow } from "@components/ui/table";
import { useAuth } from "@providers/auth-provider";

function AccountsPage() {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <h1 className="text-[1.8rem] font-bold">Account Details</h1>
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
  );
}

export default AccountsPage;
