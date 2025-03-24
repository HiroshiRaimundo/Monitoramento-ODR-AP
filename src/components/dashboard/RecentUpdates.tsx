
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecentUpdate } from "./types/dashboardTypes";
import { AlertCircle, Check, Clock, FileBarChart, ChevronLeft, ChevronRight, Grid2X2, List } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

interface RecentUpdatesProps {
  updates: RecentUpdate[];
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ updates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const itemsPerPage = viewMode === "list" ? 5 : 6;
  
  // Calculate total pages
  const totalPages = Math.ceil(updates.length / itemsPerPage);
  
  // Calculate items for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = updates.slice(indexOfFirstItem, indexOfLastItem);
  
  // Functions for navigation
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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, updates.length)} de {updates.length} atualizações
        </div>
        <div className="flex gap-1">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("list")}
            className="h-8 w-8 p-0"
          >
            <List size={16} />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid2X2 size={16} />
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentItems.map((update) => (
            <Card
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
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{update.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {update.site}
                </span>
                <span className="text-xs text-gray-500">{update.date}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Improved Pagination Component */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={goToPrevPage} 
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink 
                    isActive={currentPage === pageNum}
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={goToNextPage} 
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default RecentUpdates;
