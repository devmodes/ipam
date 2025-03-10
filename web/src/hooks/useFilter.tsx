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
import { useState } from "react";

export const useFilter = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const debouncedSearch = useDebounce(search, 500);

  const render = () => {
    return (
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
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
      </div>
    );
  };

  return {
    render,
    search: debouncedSearch,
    sort,
  };
};
