
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Link, Trash2, User, Clock, AlertTriangle, Building2, Filter } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  responsible?: string;
  institution?: string;
  keywords?: string;
}

interface MonitoringListProps {
  items: MonitoringItem[];
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
  
  // Função para determinar a cor de frequência baseada no valor
  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "diario":
        return "text-red-500 bg-red-50";
      case "semanal":
        return "text-orange-500 bg-orange-50";
      case "quinzenal":
        return "text-yellow-500 bg-yellow-50";
      case "mensal":
        return "text-forest-600 bg-forest-50";
      default:
        return "text-muted-foreground bg-gray-50";
    }
  };

  // Função para determinar a cor da borda baseada na categoria
  const getCategoryBorderColor = (category: string) => {
    switch (category) {
      case 'governo':
        return '#045424'; // Primary forest green
      case 'indicadores':
        return '#16744a'; // Lighter forest green
      case 'legislacao':
        return '#44906f'; // Even lighter forest green
      case 'api':
        return '#72ab93'; // Very light forest green
      default:
        return '#a1c7b7'; // Extremely light forest green
    }
  };

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

  // Gerar números de página para a paginação
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Número máximo de botões de página visíveis
    
    if (totalPages <= maxVisiblePages) {
      // Se tivermos menos páginas que o máximo, exibimos todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Caso contrário, calculamos quais páginas exibir
      if (currentPage <= 3) {
        // Se estamos nas primeiras páginas
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Se estamos nas últimas páginas
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Se estamos no meio
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };

  return (
    <Card className="mt-6 border-forest-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-forest-700">Monitoramentos Ativos</CardTitle>
            <span className="text-sm bg-forest-600/10 text-forest-700 px-2 py-1 rounded-full font-medium">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-forest-600" />
            <label htmlFor="responsibleFilter" className="text-sm text-forest-700 font-medium">
              Filtrar por responsável:
            </label>
            <select
              id="responsibleFilter"
              className="h-9 rounded-md border border-forest-200 bg-white px-3 py-1 text-sm ring-offset-background focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
              value={responsibleFilter}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="">Todos</option>
              {uniqueResponsibles.map((responsible, index) => (
                <option key={index} value={responsible}>
                  {responsible}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-forest-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
            </div>
            <p className="mt-2 text-forest-600">Carregando monitoramentos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-forest-200 rounded-lg">
            <AlertTriangle size={36} className="mx-auto text-yellow-500 mb-2" />
            <p className="text-forest-700">
              {responsibleFilter 
                ? "Não foram encontrados monitoramentos para este responsável." 
                : "Nenhum item sendo monitorado ainda."}
            </p>
            {responsibleFilter && (
              <p className="text-sm text-forest-600 mt-2">
                Tente selecionar outro responsável ou volte para "Todos".
              </p>
            )}
            {!responsibleFilter && (
              <p className="text-sm text-forest-600 mt-2">
                Utilize o formulário acima para adicionar seu primeiro monitoramento.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {currentItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border-l-4 border-forest-100 shadow-sm hover:shadow-md transition-all duration-200" style={{ 
                borderLeftColor: getCategoryBorderColor(item.category)
              }}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-forest-800">{item.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-forest-50 text-forest-700 font-medium">
                          {item.category}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getFrequencyColor(item.frequency)} font-medium`}>
                                <Clock size={12} className="mr-1" />
                                {item.frequency}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Frequência de atualização</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center text-sm text-forest-600 gap-1 mt-2">
                        <Link2 size={14} className="text-forest-500" />
                        <span className="break-all">Fonte: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-forest-700 hover:underline">{item.url}</a></span>
                      </div>
                      {item.api_url && (
                        <div className="flex items-center text-sm text-forest-600 gap-1 mt-1">
                          <Link size={14} className="text-forest-500" />
                          <span className="break-all">API: <a href={item.api_url} target="_blank" rel="noopener noreferrer" className="text-forest-700 hover:underline">{item.api_url}</a></span>
                        </div>
                      )}
                      {item.keywords && (
                        <div className="mt-2">
                          <span className="text-xs text-forest-600">Palavras-chave: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.keywords.split(',').map((keyword, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-forest-50 text-forest-700 rounded-full">
                                {keyword.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.responsible && (
                        <div className="flex items-center text-sm font-medium gap-1 mt-2 text-forest-700">
                          <User size={14} className="text-forest-600" />
                          <span>Responsável: {item.responsible}</span>
                          {item.institution && (
                            <span className="flex items-center ml-2">
                              <Building2 size={14} className="text-forest-600 mr-1" />
                              {item.institution}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="ml-4 mt-1"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Paginação */}
            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        onClick={() => goToPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringList;
