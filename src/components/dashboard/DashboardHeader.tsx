import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileDown, BookOpen, BarChart2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  onGenerateReport: () => void;
  onExportCSV: () => void;
  onOpenDocumentation: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onGenerateReport,
  onExportCSV,
  onOpenDocumentation
}) => {
  return (
    <Card className="border-forest-100 bg-gradient-to-r from-forest-50/70 to-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-forest-800 flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-forest-600" />
              Análise de Dados
            </h1>
            <p className="text-forest-600 mt-1">
              Acompanhamento detalhado dos monitoramentos e análises internas
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white border-forest-200 text-forest-700 hover:bg-forest-50 hover:text-forest-800 flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      onGenerateReport();
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Relatório de Status</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gerar relatório de status atual</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white border-forest-200 text-forest-700 hover:bg-forest-50 hover:text-forest-800 flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      onExportCSV();
                    }}
                  >
                    <FileDown className="h-4 w-4" />
                    <span className="hidden sm:inline">Exportar CSV</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Exportar todos os dados em formato CSV</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-white border-forest-200 text-forest-700 hover:bg-forest-50 hover:text-forest-800 flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenDocumentation();
                    }}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Documentação</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Abrir documentação do sistema</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-forest-100 shadow-sm">
            <div className="text-2xl font-bold text-forest-700">
              <span id="total-monitoramentos">0</span>
            </div>
            <div className="text-sm text-forest-600">Monitoramentos Ativos</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-forest-100 shadow-sm">
            <div className="text-2xl font-bold text-forest-700">
              <span id="total-categorias">0</span>
            </div>
            <div className="text-sm text-forest-600">Categorias</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-forest-100 shadow-sm">
            <div className="text-2xl font-bold text-forest-700">
              <span id="total-coletas">0</span>
            </div>
            <div className="text-sm text-forest-600">Coletas na Semana</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Função para atualizar as estatísticas no cabeçalho
export function updateDashboardStats(totalMonitoramentos: number, totalCategorias: number, totalColetas: number) {
  const totalMonitoramentosElement = document.getElementById('total-monitoramentos');
  const totalCategoriasElement = document.getElementById('total-categorias');
  const totalColetasElement = document.getElementById('total-coletas');
  
  if (totalMonitoramentosElement) {
    totalMonitoramentosElement.textContent = totalMonitoramentos.toString();
  }
  
  if (totalCategoriasElement) {
    totalCategoriasElement.textContent = totalCategorias.toString();
  }
  
  if (totalColetasElement) {
    totalColetasElement.textContent = totalColetas.toString();
  }
}

export default DashboardHeader;
