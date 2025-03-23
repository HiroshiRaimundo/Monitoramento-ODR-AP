
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2, ChevronLeft, ChevronRight } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";

interface RecentMonitoringsProps {
  monitorings: MonitoringItem[];
}

const RecentMonitorings: React.FC<RecentMonitoringsProps> = ({ monitorings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calcular o total de páginas
  const totalPages = Math.ceil(monitorings.length / itemsPerPage);
  
  // Calcular os itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = monitorings.slice(indexOfFirstItem, indexOfLastItem);
  
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

  return (
    <Card className="border-forest-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-forest-700 text-base font-medium">Monitoramentos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-forest-50/50 rounded-md">
              <div className="text-left">
                <h4 className="text-sm font-medium text-forest-700">{item.name}</h4>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs bg-white text-forest-600 mr-2">
                    {item.category}
                  </Badge>
                  <span className="text-xs text-forest-600">
                    {new Date(item.created_at ?? "").toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 border-forest-200 hover:bg-forest-50 hover:text-forest-700">
                <BarChart2 size={14} className="mr-1" />
                Gráfico
              </Button>
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

export default RecentMonitorings;
