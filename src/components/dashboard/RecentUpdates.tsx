
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecentUpdate } from "./types/dashboardTypes";
import { AlertCircle, Check, Clock, FileBarChart, ChevronLeft, ChevronRight } from "lucide-react";

interface RecentUpdatesProps {
  updates: RecentUpdate[];
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ updates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calcular o total de páginas
  const totalPages = Math.ceil(updates.length / itemsPerPage);
  
  // Calcular os itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = updates.slice(indexOfFirstItem, indexOfLastItem);
  
  // Funções para navegação
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <Check size={16} className="text-green-500" />;
      case "warning":
        return <AlertCircle size={16} className="text-amber-500" />;
      case "pending":
        return <Clock size={16} className="text-blue-500" />;
      default:
        return <FileBarChart size={16} className="text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "content":
        return "Conteúdo";
      case "data":
        return "Dados";
      case "alert":
        return "Alerta";
      default:
        return "Atualização";
    }
  };

  return (
    <div className="space-y-3">
      {currentItems.map((update) => (
        <div
          key={update.id}
          className="p-3 border rounded-md border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(update.status)}
              <span className="ml-2 font-medium text-sm">{update.title}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {getTypeLabel(update.type)}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-gray-600">{update.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {update.site}
            </span>
            <span className="text-xs text-gray-500">{update.date}</span>
          </div>
        </div>
      ))}
      
      {/* Paginação numerada */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="h-7 w-7 p-0"
          >
            <ChevronLeft size={14} />
          </Button>

          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 3) {
              pageNum = i + 1;
            } else {
              if (currentPage <= 2) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 1) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(pageNum)}
                className="h-7 w-7 p-0 text-xs"
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-7 w-7 p-0"
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentUpdates;
