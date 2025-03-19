
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import MonitoringHeader from "./MonitoringHeader";
import MonitoringItem from "./MonitoringItem";
import MonitoringPagination from "./MonitoringPagination";
import NoMonitoringsMessage from "./NoMonitoringsMessage";
import { MonitoringItemType } from "./types";

interface MonitoringListProps {
  items: MonitoringItemType[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
  uniqueResponsibles?: string[];
  responsibleFilter?: string;
  onFilterChange?: (responsible: string) => void;
}

const MonitoringList: React.FC<MonitoringListProps> = ({
  items,
  onDelete,
  isLoading = false,
  uniqueResponsibles = [],
  responsibleFilter = "",
  onFilterChange = () => {}
}) => {
  // Estado para controlar a paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Exibe 10 itens por página
  
  // Calcular o total de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Calcular os itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
  // Funções para navegação
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="mt-6 border-forest-100 shadow-md">
      <MonitoringHeader 
        itemCount={items.length} 
        uniqueResponsibles={uniqueResponsibles}
        responsibleFilter={responsibleFilter}
        onFilterChange={onFilterChange}
      />
      
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-forest-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
            </div>
            <p className="mt-2 text-forest-600">Carregando monitoramentos...</p>
          </div>
        ) : items.length === 0 ? (
          <NoMonitoringsMessage responsibleFilter={responsibleFilter} />
        ) : (
          <div className="grid gap-4">
            {currentItems.map((item) => (
              <MonitoringItem 
                key={item.id} 
                item={item} 
                onDelete={onDelete} 
              />
            ))}
            
            {/* Paginação */}
            {totalPages > 1 && (
              <MonitoringPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MonitoringList;
