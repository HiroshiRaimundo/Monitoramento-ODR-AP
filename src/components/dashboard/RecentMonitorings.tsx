import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2, ChevronLeft, ChevronRight } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import MonitoringChartDialog from "./MonitoringChartDialog";

interface RecentMonitoringsProps {
  monitorings: MonitoringItem[];
}

const RecentMonitorings: React.FC<RecentMonitoringsProps> = ({ monitorings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Estado para controlar o diálogo de gráficos
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMonitoring, setSelectedMonitoring] = useState<MonitoringItem | null>(null);
  
  // Abrir o diálogo com o monitoramento selecionado
  const handleOpenChart = (item: MonitoringItem) => {
    setSelectedMonitoring(item);
    setIsDialogOpen(true);
  };
  
  // Calcular o número total de páginas
  const totalPages = useMemo(() => Math.ceil(monitorings.length / itemsPerPage), [monitorings.length]);
  
  // Obter os itens da página atual
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return monitorings.slice(startIndex, endIndex);
  }, [monitorings, currentPage]);
  
  // Função para mudar de página
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  // Gerar os botões de paginação
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;
    
    const buttons = [];
    const maxVisibleButtons = 5; // Número máximo de botões visíveis
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    // Ajustar o início se o final for muito próximo do total
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
    
    // Botão anterior
    buttons.push(
      <Button 
        key="prev" 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 border-forest-200 hover:bg-forest-50"
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>
    );
    
    // Botão para primeira página se não estiver visível
    if (startPage > 1) {
      buttons.push(
        <Button 
          key="1" 
          variant={currentPage === 1 ? "default" : "outline"} 
          size="sm" 
          className={`h-8 w-8 ${currentPage === 1 ? 'bg-forest-600 hover:bg-forest-700' : 'border-forest-200 hover:bg-forest-50'}`}
          onClick={() => goToPage(1)}
        >
          1
        </Button>
      );
      
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="mx-1">...</span>);
      }
    }
    
    // Botões de página
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button 
          key={i} 
          variant={currentPage === i ? "default" : "outline"} 
          size="sm" 
          className={`h-8 w-8 ${currentPage === i ? 'bg-forest-600 hover:bg-forest-700' : 'border-forest-200 hover:bg-forest-50'}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }
    
    // Botão para última página se não estiver visível
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="mx-1">...</span>);
      }
      
      buttons.push(
        <Button 
          key={totalPages} 
          variant={currentPage === totalPages ? "default" : "outline"} 
          size="sm" 
          className={`h-8 w-8 ${currentPage === totalPages ? 'bg-forest-600 hover:bg-forest-700' : 'border-forest-200 hover:bg-forest-50'}`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }
    
    // Botão próximo
    buttons.push(
      <Button 
        key="next" 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 border-forest-200 hover:bg-forest-50"
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </Button>
    );
    
    return (
      <div className="flex items-center justify-center gap-1 mt-4">
        {buttons}
      </div>
    );
  };
  
  return (
    <>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 border-forest-200 hover:bg-forest-50 hover:text-forest-700"
                  onClick={() => handleOpenChart(item)}
                >
                  <BarChart2 size={14} className="mr-1" />
                  Gráfico
                </Button>
              </div>
            ))}
            
            {/* Paginação */}
            {renderPaginationButtons()}
          </div>
        </CardContent>
      </Card>
      
      {/* Diálogo de gráficos */}
      <MonitoringChartDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        monitoringItem={selectedMonitoring} 
      />
    </>
  );
};

export default RecentMonitorings;
