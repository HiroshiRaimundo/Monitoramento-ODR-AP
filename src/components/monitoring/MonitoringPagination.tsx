
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MonitoringPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const MonitoringPagination: React.FC<MonitoringPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  // Gerar números de página para a paginação
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Número máximo de botões de página visíveis
    
    if (totalPages <= maxVisiblePages) {
      // Se tivermos menos páginas que o máximo, exibimos todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Caso contrário, calculamos quais páginas exibir
      if (currentPage <= 3) {
        // Se estamos nas primeiras páginas
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Se estamos nas últimas páginas
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Se estamos no meio
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {getPageNumbers().map(page => (
          <PaginationItem key={page}>
            <PaginationLink 
              onClick={() => setCurrentPage(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MonitoringPagination;
