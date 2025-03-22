
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MonitoringHeaderComponent from "./monitoring/MonitoringHeader-legacy";
import MonitoringItemComponent from "./monitoring/MonitoringItem-legacy";
import MonitoringPaginationComponent from "./monitoring/MonitoringPagination-legacy";
import NoMonitoringsMessageComponent from "./monitoring/NoMonitoringsMessage-legacy";
import LoadingIndicator from "./monitoring/LoadingIndicator";
import { MonitoringItem, MonitoringListProps } from "./monitoring/types-legacy";

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
      <MonitoringHeaderComponent 
        itemCount={items.length} 
        uniqueResponsibles={uniqueResponsibles}
        responsibleFilter={responsibleFilter}
        onFilterChange={onFilterChange}
      />
      
      <CardContent className="p-4">
        {isLoading ? (
          <LoadingIndicator />
        ) : items.length === 0 ? (
          <NoMonitoringsMessageComponent responsibleFilter={responsibleFilter} />
        ) : (
          <div className="grid gap-4">
            {currentItems.map((item) => (
              <MonitoringItemComponent 
                key={item.id} 
                item={item} 
                onDelete={onDelete} 
              />
            ))}
            
            {/* Paginação */}
            {totalPages > 1 && (
              <MonitoringPaginationComponent 
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringList;
