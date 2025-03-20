
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface MonitoringPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const MonitoringPagination: React.FC<MonitoringPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>
      <div className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Próximo
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MonitoringPagination;
