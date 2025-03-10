import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import { formatDate } from "@lib/helpers";
import { useGetIPAddressQuery } from "@store/api/ip-address-api";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function IPAddressPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetIPAddressQuery(id || "");

  if (isLoading) {
    return (
      <React.Fragment>
        <div>
          <Button onClick={() => navigate(-1)} variant="link" className="px-0">
            <ArrowLeftIcon />
            Back
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Basic Information</h2>
            <Table>
              <TableBody>
                <TableRow className="border-none">
                  <TableCell className="text-muted-foreground font-medium">
                    IP Address:{" "}
                  </TableCell>
                  <TableCell className="font-bold">
                    <Skeleton className="h-3 w-[350px] rounded-full" />
                  </TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="text-muted-foreground font-medium">
                    Label:{" "}
                  </TableCell>
                  <TableCell className="font-bold">
                    <Skeleton className="h-3 w-[350px] rounded-full" />
                  </TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="text-muted-foreground font-medium">
                    Comment:{" "}
                  </TableCell>
                  <TableCell className="font-bold">
                    <Skeleton className="h-3 w-[350px] rounded-full" />
                  </TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="text-muted-foreground font-medium">
                    Creation Date:{" "}
                  </TableCell>
                  <TableCell className="font-bold">
                    <Skeleton className="h-3 w-[350px] rounded-full" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => navigate(-1)} variant="link" className="px-0">
          <ArrowLeftIcon />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Basic Information</h2>
          <Table>
            <TableBody>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  IP Address:{" "}
                </TableCell>
                <TableCell className="font-bold">{data.data.ip}</TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  Label:{" "}
                </TableCell>
                <TableCell className="font-bold">{data.data.label}</TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  Comment:{" "}
                </TableCell>
                <TableCell className="font-bold">{data.data.comment}</TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  Creation Date:{" "}
                </TableCell>
                <TableCell className="font-bold">
                  {formatDate(data.data.created_at)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default IPAddressPage;
