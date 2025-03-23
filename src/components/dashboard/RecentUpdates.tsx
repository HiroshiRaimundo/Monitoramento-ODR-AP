
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, AlertTriangle, Clock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RecentUpdate {
  id: string;
  site: string;
  date: string;
  status: "success" | "error" | "warning" | "pending";
}

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
        return <ClipboardCheck className="text-green-500" size={16} />;
      case "error":
        return <AlertCircle className="text-red-500" size={16} />;
      case "warning":
        return <AlertTriangle className="text-amber-500" size={16} />;
      case "pending":
        return <Clock className="text-blue-500" size={16} />;
      default:
        return <ClipboardCheck className="text-green-500" size={16} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500 bg-green-50";
      case "error":
        return "text-red-500 bg-red-50";
      case "warning":
        return "text-amber-500 bg-amber-50";
      case "pending":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-green-500 bg-green-50";
    }
  };

  return (
    <Card className="border-forest-100 shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-forest-700 text-base font-medium">Atualizações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentItems.map((update) => (
            <div key={update.id} className="flex items-start justify-between p-3 bg-forest-50/50 rounded-md">
              <div className="text-left">
                <h4 className="text-sm font-medium text-forest-700 flex items-center gap-2">
                  {getStatusIcon(update.status)}
                  {update.site}
                </h4>
                <span className="text-xs text-forest-600 mt-1 block">
                  {new Date(update.date).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                  update.status
                )}`}
              >
                {update.status === "success"
                  ? "Sucesso"
                  : update.status === "error"
                  ? "Erro"
                  : update.status === "warning"
                  ? "Alerta"
                  : "Pendente"}
              </span>
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
      </CardContent>
    </Card>
  );
};

export default RecentUpdates;
