
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonitoringPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const MonitoringPagination: React.FC<MonitoringPaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Não renderizar paginação se houver apenas uma página
  if (totalPages <= 1) return null;
  
  // Determinar quais números de página mostrar
  const getPageNumbers = () => {
    // Se tivermos 7 ou menos páginas, mostrar todas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Caso contrário, mostrar a primeira, a última e algumas páginas próximas à atual
    const pageNumbers = [];
    
    // Sempre incluir a primeira página
    pageNumbers.push(1);
    
    // Lógica para mostrar páginas ao redor da página atual
    if (currentPage <= 3) {
      // Se estamos nas primeiras páginas
      pageNumbers.push(2, 3, 4, '...', totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Se estamos nas últimas páginas
      pageNumbers.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Se estamos no meio
      pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              className={currentPage === page ? "bg-forest-600" : ""}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MonitoringPagination;
