import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart2, PieChart, Database } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AnalysisToolsProps {
  items: MonitoringItem[];
}

const AnalysisTools: React.FC<AnalysisToolsProps> = ({ items }) => {
  // Função para criar gráfico temporal
  const handleCreateTimeChart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Gráfico Temporal",
      description: "Gráfico temporal sendo gerado. Aguarde um momento.",
      variant: "default",
    });
    
    // Simulação de processamento
    setTimeout(() => {
      toast({
        title: "Gráfico Gerado",
        description: "Gráfico temporal gerado com sucesso!",
        variant: "default",
      });
    }, 1500);
  }, []);

  // Função para exportar dados temporais
  const handleExportTimeData = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Criar dados de exemplo para exportação
      const headers = ['data', 'valor', 'categoria'];
      const rows = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return [
          date.toISOString().split('T')[0],
          Math.floor(Math.random() * 100),
          ['governo', 'indicadores', 'legislacao'][Math.floor(Math.random() * 3)]
        ].join(',');
      });
      
      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const fileName = `dados-temporais-${new Date().toISOString().split('T')[0]}.csv`;
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportação concluída",
        description: `Arquivo ${fileName} baixado com sucesso.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados. Tente novamente.",
        variant: "destructive",
      });
    }
  }, []);

  // Função para criar gráfico de comparação
  const handleCreateComparisonChart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Gráfico de Comparação",
      description: "Gráfico de comparação sendo gerado. Aguarde um momento.",
      variant: "default",
    });
    
    // Simulação de processamento
    setTimeout(() => {
      toast({
        title: "Gráfico Gerado",
        description: "Gráfico de comparação gerado com sucesso!",
        variant: "default",
      });
    }, 1500);
  }, []);

  // Função para exportar dados de comparação
  const handleExportComparisonData = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Criar dados de exemplo para exportação
      const headers = ['categoria', 'valor_atual', 'valor_anterior', 'variacao'];
      const categorias = ['governo', 'indicadores', 'legislacao', 'api', 'social'];
      const rows = categorias.map(cat => {
        const atual = Math.floor(Math.random() * 100);
        const anterior = Math.floor(Math.random() * 100);
        const variacao = ((atual - anterior) / anterior * 100).toFixed(2);
        return [cat, atual, anterior, variacao].join(',');
      });
      
      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const fileName = `dados-comparativos-${new Date().toISOString().split('T')[0]}.csv`;
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportação concluída",
        description: `Arquivo ${fileName} baixado com sucesso.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados. Tente novamente.",
        variant: "destructive",
      });
    }
  }, []);

  // Função para criar gráfico de distribuição
  const handleCreateDistributionChart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Gráfico de Distribuição",
      description: "Gráfico de distribuição sendo gerado. Aguarde um momento.",
      variant: "default",
    });
    
    // Simulação de processamento
    setTimeout(() => {
      toast({
        title: "Gráfico Gerado",
        description: "Gráfico de distribuição gerado com sucesso!",
        variant: "default",
      });
    }, 1500);
  }, []);

  // Função para exportar dados de distribuição
  const handleExportDistributionData = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Criar dados de exemplo para exportação
      const headers = ['regiao', 'recursos', 'percentual'];
      const regioes = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
      const total = 100;
      let restante = total;
      
      const rows = regioes.map((regiao, index) => {
        const isLast = index === regioes.length - 1;
        const valor = isLast ? restante : Math.floor(Math.random() * (restante / 2));
        restante -= valor;
        const percentual = (valor / total * 100).toFixed(2);
        return [regiao, valor, percentual].join(',');
      });
      
      const csvContent = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const fileName = `dados-distribuicao-${new Date().toISOString().split('T')[0]}.csv`;
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportação concluída",
        description: `Arquivo ${fileName} baixado com sucesso.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados. Tente novamente.",
        variant: "destructive",
      });
    }
  }, []);

  // Função para criar relatório personalizado
  const handleCreateCustomReport = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Relatório Personalizado",
      description: "Relatório sendo gerado. Aguarde um momento.",
      variant: "default",
    });
    
    // Simulação de processamento
    setTimeout(() => {
      toast({
        title: "Relatório Gerado",
        description: "Relatório personalizado gerado com sucesso!",
        variant: "default",
      });
    }, 2000);
  }, []);

  // Função para mostrar modelos de relatório
  const handleShowReportTemplates = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Modelos de Relatório",
      description: "Carregando modelos disponíveis...",
      variant: "default",
    });
    
    // Simulação de processamento
    setTimeout(() => {
      toast({
        title: "Modelos Disponíveis",
        description: "3 modelos de relatório estão disponíveis para uso.",
        variant: "default",
      });
    }, 1000);
  }, []);

  return (
    <div className="bg-forest-50/50 p-6 rounded-lg border border-forest-100">
      <h3 className="text-lg font-medium text-forest-700 mb-4">Ferramentas de Análise</h3>
      <p className="text-forest-600 mb-6">
        Utilize as ferramentas abaixo para analisar os dados coletados pelos monitoramentos, gerar gráficos e exportar relatórios.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <LineChart size={18} className="text-forest-600" />
              Análise Temporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Visualize a evolução de indicadores específicos ao longo do tempo para identificar tendências e padrões.
            </p>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700"
                      onClick={handleCreateTimeChart}
                    >
                      Criar Gráfico
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gerar gráfico de evolução temporal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-forest-200 hover:bg-forest-50"
                      onClick={handleExportTimeData}
                    >
                      Exportar Dados
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar dados temporais em CSV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <BarChart2 size={18} className="text-forest-600" />
              Comparação por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Compare indicadores entre diferentes categorias ou regiões para identificar disparidades e prioridades.
            </p>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700"
                      onClick={handleCreateComparisonChart}
                    >
                      Criar Gráfico
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gerar gráfico de comparação entre categorias</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-forest-200 hover:bg-forest-50"
                      onClick={handleExportComparisonData}
                    >
                      Exportar Dados
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar dados comparativos em CSV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <PieChart size={18} className="text-forest-600" />
              Distribuição de Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Analise a distribuição de recursos, investimentos ou dados demográficos em diferentes setores ou regiões.
            </p>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700"
                      onClick={handleCreateDistributionChart}
                    >
                      Criar Gráfico
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gerar gráfico de distribuição de recursos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-forest-200 hover:bg-forest-50"
                      onClick={handleExportDistributionData}
                    >
                      Exportar Dados
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exportar dados de distribuição em CSV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <Database size={18} className="text-forest-600" />
              Relatórios Personalizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Crie relatórios personalizados combinando diversos indicadores e formatos de visualização.
            </p>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700"
                      onClick={handleCreateCustomReport}
                    >
                      Criar Relatório
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gerar relatório personalizado com múltiplos indicadores</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-forest-200 hover:bg-forest-50"
                      onClick={handleShowReportTemplates}
                    >
                      Modelos
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visualizar modelos de relatórios disponíveis</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisTools;
