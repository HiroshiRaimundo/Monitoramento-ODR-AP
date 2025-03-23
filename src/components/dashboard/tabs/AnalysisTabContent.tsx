
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import AnalysisTools from "../AnalysisTools";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AnalysisStats {
  contentAnalysis: number;
  sentimentAnalysis: number;
  crossAnalysis: number;
  nlpAnalysis: number;
}

interface AnalysisTabContentProps {
  monitoringItems: MonitoringItem[];
  analysisStats: AnalysisStats;
}

const AnalysisTabContent: React.FC<AnalysisTabContentProps> = ({
  monitoringItems,
  analysisStats
}) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-forest-600" />
            <span>Análises Ativas por Monitoramento</span>
          </CardTitle>
          <CardDescription>Resumo dos tipos de análise configurados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-forest-600">{analysisStats.contentAnalysis}</div>
              <div className="text-sm text-forest-700">Análise de Conteúdo</div>
            </div>
            <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-forest-600">{analysisStats.sentimentAnalysis}</div>
              <div className="text-sm text-forest-700">Análise de Sentimento</div>
            </div>
            <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-forest-600">{analysisStats.crossAnalysis}</div>
              <div className="text-sm text-forest-700">Análise Cruzada</div>
            </div>
            <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-forest-600">{analysisStats.nlpAnalysis}</div>
              <div className="text-sm text-forest-700">Processamento de Linguagem Natural</div>
            </div>
          </div>
          
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ferramentas de Análise</CardTitle>
          <CardDescription>Ferramentas disponíveis para análise de dados</CardDescription>
        </CardHeader>
        <CardContent>
          <AnalysisTools monitoringItems={monitoringItems} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios de Análise</CardTitle>
          <CardDescription>Relatórios gerados a partir dos monitoramentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-forest-100 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Relatório Mensal - Maio/2024</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Disponível</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Resumo completo dos dados coletados em todos os monitoramentos durante o mês.
              </p>
              <div className="flex justify-end">
                <button className="text-xs px-3 py-1 bg-forest-600 text-white rounded">
                  Download
                </button>
              </div>
            </div>
            
            <div className="p-4 border border-forest-100 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Análise Comparativa - Q1 2024</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Disponível</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Comparação dos dados do primeiro trimestre de 2024 com períodos anteriores.
              </p>
              <div className="flex justify-end">
                <button className="text-xs px-3 py-1 bg-forest-600 text-white rounded">
                  Download
                </button>
              </div>
            </div>
            
            <div className="p-4 border border-dashed border-forest-200 rounded-lg space-y-2 bg-forest-50/50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-muted-foreground">Relatório Semestral</h3>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Em preparação</span>
              </div>
              <p className="text-sm text-muted-foreground">
                O relatório semestral será gerado automaticamente em 30/06/2024.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisTabContent;
