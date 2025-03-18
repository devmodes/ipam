import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import { useDebounce } from "@hooks/useDebounce";
import { Filters } from "@lib/types/filters";
import { useEffect, useState } from "react";

export const useFilter = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const debouncedSearch = useDebounce(search, 500);

  const render = () => {
    return (
      <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex-1" variant="outline">
              {sort === "asc" ? "Oldest to Latest" : "Latest to Oldest"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSort("desc")}>
                Latest to Oldest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("asc")}>
                Oldest to Latest
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex-1" variant="outline">
              Per Page {perPage}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Records per page</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setPerPage(10)}>
                10
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPerPage(25)}>
                25
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPerPage(50)}>
                50
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPerPage(100)}>
                100
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  // go back to page 1 when changing the per page and search state to avoid getting no result unnecessarily
  useEffect(() => {
    setPage(1);
  }, [perPage, search]);

  const filters: Filters = {
    search: debouncedSearch,
    sort,
    page,
    per_page: perPage,
  };

  return {
    filters,
    render,
    setPage,
    setPerPage,
    setSort,
    setSearch,
  };
};
