import { Pagination, PaginationContent, PaginationItem, PaginationLink } from './ui/pagination';
import { Button } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type PaginationMeta = {
  meta: {
    currentPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    totalRecords: number;
    totalPages: number;
  };
  onChange: (page: number) => void;
}

function SimplePagination({ meta, onChange }: PaginationMeta) {
  const { currentPage, hasPrevPage, hasNextPage, totalPages, totalRecords } = meta;
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground text-sm flex-1">
        Page: {currentPage} of {totalPages}, Records: {totalRecords}
      </div>
      <div>
        <Pagination className='flex-1'>
          <PaginationContent>
            <PaginationItem>
              <Button variant="ghost" disabled={!hasPrevPage} onClick={() => onChange(currentPage - 1)}>
                <ChevronLeftIcon />
              </Button>
            </PaginationItem>
            {(currentPage - 2) > 0 && (
              <PaginationItem onClick={() => onChange(currentPage - 2)}>
                <PaginationLink>{currentPage - 2}</PaginationLink>
              </PaginationItem>
            )}
            {(currentPage - 1) > 0 && (
              <PaginationItem onClick={() => onChange(currentPage - 1)}>
                <PaginationLink>{currentPage - 1}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            {(currentPage + 1) <= totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => onChange(currentPage + 1)}>{currentPage + 1}</PaginationLink>
              </PaginationItem>
            )}
            {(currentPage + 2) <= totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => onChange(currentPage + 2)}>{currentPage + 2}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button variant="ghost" disabled={!hasNextPage} onClick={() => onChange(currentPage + 1)}>
                <ChevronRightIcon />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default SimplePagination