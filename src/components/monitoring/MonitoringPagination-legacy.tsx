
import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getPageNumbers } from "./monitoringUtils-legacy";

interface MonitoringPaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const MonitoringPaginationComponent: React.FC<MonitoringPaginationProps> = ({
  currentPage,
  totalPages,
  goToPage
}) => {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {getPageNumbers(currentPage, totalPages).map(page => (
          <PaginationItem key={page}>
            <PaginationLink 
              onClick={() => goToPage(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MonitoringPaginationComponent;
