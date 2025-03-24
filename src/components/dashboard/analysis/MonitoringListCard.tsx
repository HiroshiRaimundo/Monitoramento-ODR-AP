
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MonitoringListCardProps } from "../types/dashboardTypes";

const MonitoringListCard: React.FC<MonitoringListCardProps> = ({ monitoringItems }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(monitoringItems.length / itemsPerPage);
  
  // Calculate items to display on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = monitoringItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Navigation functions
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
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Análises Configuradas por Monitoramento</h3>
      <div className="space-y-3">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div key={index} className="p-3 border border-forest-100 rounded-lg">
              <div className="font-medium text-forest-800">{item.name}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-xs px-2 py-0.5 bg-forest-100 text-forest-700 rounded-full">
                  {item.category}
                </span>
                <span className="text-xs px-2 py-0.5 bg-forest-100 text-forest-700 rounded-full">
                  {item.frequency}
                </span>
                {item.keywords?.split(',').slice(0, 2).map((keyword, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                    {keyword.trim()}
                  </span>
                ))}
                {(item.keywords?.split(',').length || 0) > 2 && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                    +{(item.keywords?.split(',').length || 0) - 2} mais
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Nenhum monitoramento configurado ainda.
          </div>
        )}
        
        {/* Paginação numerada */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft size={16} />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else {
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className="h-8 w-8 p-0"
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
              className="h-8 w-8 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringListCard;
