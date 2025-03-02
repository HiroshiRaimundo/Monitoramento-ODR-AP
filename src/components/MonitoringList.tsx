
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Link, Trash2, User, Clock, AlertTriangle, Building2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  // Função para determinar a cor de frequência baseada no valor
  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "diario":
        return "text-red-500";
      case "semanal":
        return "text-orange-500";
      case "quinzenal":
        return "text-yellow-500";
      case "mensal":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <CardTitle>Monitoramentos Ativos</CardTitle>
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="responsibleFilter" className="text-sm text-muted-foreground">
              Filtrar por responsável:
            </label>
            <select
              id="responsibleFilter"
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
            </div>
            <p className="mt-2 text-muted-foreground">Carregando monitoramentos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 border border-dashed rounded-lg">
            <AlertTriangle size={36} className="mx-auto text-yellow-500 mb-2" />
            <p className="text-muted-foreground">
              {responsibleFilter 
                ? "Não foram encontrados monitoramentos para este responsável." 
                : "Nenhum item sendo monitorado ainda."}
            </p>
            {responsibleFilter && (
              <p className="text-sm text-muted-foreground mt-2">
                Tente selecionar outro responsável ou volte para "Todos".
              </p>
            )}
            {!responsibleFilter && (
              <p className="text-sm text-muted-foreground mt-2">
                Utilize o formulário acima para adicionar seu primeiro monitoramento.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden border-l-4" style={{ 
                borderLeftColor: item.category === 'governo' ? '#0088FE' : 
                                item.category === 'indicadores' ? '#00C49F' :
                                item.category === 'legislacao' ? '#FFBB28' : 
                                item.category === 'api' ? '#FF8042' : '#8884d8'
              }}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-800">
                          {item.category}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getFrequencyColor(item.frequency)} bg-slate-100`}>
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
                      <div className="flex items-center text-sm text-muted-foreground gap-1 mt-2">
                        <Link2 size={14} />
                        <span className="break-all">Fonte: {item.url}</span>
                      </div>
                      {item.api_url && (
                        <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                          <Link size={14} />
                          <span className="break-all">API: {item.api_url}</span>
                        </div>
                      )}
                      {item.keywords && (
                        <div className="mt-2">
                          <span className="text-xs text-muted-foreground">Palavras-chave: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.keywords.split(',').map((keyword, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-slate-100 rounded-full">
                                {keyword.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.responsible && (
                        <div className="flex items-center text-sm font-medium gap-1 mt-2">
                          <User size={14} className="text-primary" />
                          <span>Responsável: {item.responsible}</span>
                          {item.institution && (
                            <span className="flex items-center ml-2">
                              <Building2 size={14} className="text-primary mr-1" />
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringList;
