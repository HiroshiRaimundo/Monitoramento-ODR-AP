import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useMonitoring } from "@/hooks/useMonitoring";
import DashboardHeader, { updateDashboardStats } from "./DashboardHeader";
import ChartsTabs from "./ChartsTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const InternalDashboard: React.FC = () => {
  const { monitoringItems, loading, error } = useMonitoring();
  const [selectedMonitoring, setSelectedMonitoring] = useState<string>("");

  // Atualizar estatísticas do dashboard quando os dados de monitoramento mudarem
  useEffect(() => {
    if (monitoringItems && monitoringItems.length > 0) {
      const totalMonitoramentos = monitoringItems.length;
      const totalCategorias = new Set(monitoringItems.map(item => item.category)).size;
      const totalColetas = Math.floor(Math.random() * 100) + 50; // Simulação de coletas na semana
      
      updateDashboardStats(totalMonitoramentos, totalCategorias, totalColetas);
    }
  }, [monitoringItems]);

  // Função para gerar relatório de status
  const generateStatusReport = useCallback(() => {
    try {
      // Criar dados de exemplo para o relatório
      const reportData = {
        title: "Relatório de Status - Monitoramento ODR-AP",
        date: new Date().toISOString(),
        totalMonitorings: monitoringItems.length,
        activeMonitorings: monitoringItems.length,
        categories: {},
        frequencies: {},
        lastUpdated: new Date().toISOString(),
        status: "healthy"
      };

      // Agrupar por categoria
      monitoringItems.forEach(item => {
        if (!reportData.categories[item.category]) {
          reportData.categories[item.category] = 0;
        }
        reportData.categories[item.category]++;

        if (!reportData.frequencies[item.frequency]) {
          reportData.frequencies[item.frequency] = 0;
        }
        reportData.frequencies[item.frequency]++;
      });

      // Converter para JSON
      const jsonContent = JSON.stringify(reportData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const fileName = `status-report-${new Date().toISOString().split('T')[0]}.json`;
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Relatório de Status Gerado",
        description: `O relatório foi gerado com sucesso e salvo como ${fileName}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      toast({
        title: "Erro ao Gerar Relatório",
        description: "Não foi possível gerar o relatório de status. Tente novamente.",
        variant: "destructive",
      });
    }
  }, [monitoringItems]);

  // Função para exportar dados em CSV
  const exportAllMonitoringsCSV = useCallback(() => {
    try {
      // Cabeçalhos para o CSV
      const headers = ["name", "category", "frequency", "responsible", "url", "keywords", "lastUpdate", "nextUpdate"];
      
      // Converter itens para linhas CSV
      const rows = monitoringItems.map(item => {
        return [
          item.name,
          item.category,
          item.frequency,
          item.responsible,
          item.url,
          item.keywords,
          item.lastUpdate || "",
          item.nextUpdate || ""
        ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');
      });
      
      // Juntar cabeçalhos e linhas
      const csvContent = [headers.join(','), ...rows].join('\n');
      
      // Criar blob e link para download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const fileName = `monitoramentos-${new Date().toISOString().split('T')[0]}.csv`;
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportação Concluída",
        description: `Os dados foram exportados com sucesso para ${fileName}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast({
        title: "Erro na Exportação",
        description: "Não foi possível exportar os dados. Tente novamente.",
        variant: "destructive",
      });
    }
  }, [monitoringItems]);

  // Função para exportar dados do monitoramento selecionado
  const exportSelectedMonitoring = useCallback(() => {
    if (!selectedMonitoring) {
      toast({
        title: "Nenhum Monitoramento Selecionado",
        description: "Por favor, selecione um monitoramento para exportar.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Encontrar o monitoramento selecionado
      const selectedItem = monitoringItems.find(item => item.name === selectedMonitoring);
      
      if (!selectedItem) {
        toast({
          title: "Monitoramento Não Encontrado",
          description: "O monitoramento selecionado não foi encontrado.",
          variant: "destructive",
        });
        return;
      }
      
      // Cabeçalhos para o CSV
      const headers = ["name", "category", "frequency", "responsible", "url", "keywords", "lastUpdate", "nextUpdate"];
      
      // Converter item para linha CSV
      const row = [
        selectedItem.name,
        selectedItem.category,
        selectedItem.frequency,
        selectedItem.responsible,
        selectedItem.url,
        selectedItem.keywords,
        selectedItem.lastUpdate || "",
        selectedItem.nextUpdate || ""
      ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');
      
      // Juntar cabeçalhos e linha
      const csvContent = [headers.join(','), row].join('\n');
      
      // Criar blob e link para download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const fileName = `monitoramento-${selectedItem.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`;
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportação Concluída",
        description: `Os dados do monitoramento "${selectedItem.name}" foram exportados com sucesso.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      toast({
        title: "Erro na Exportação",
        description: "Não foi possível exportar os dados do monitoramento selecionado. Tente novamente.",
        variant: "destructive",
      });
    }
  }, [selectedMonitoring, monitoringItems]);

  // Função para abrir documentação
  const openDocumentation = useCallback(() => {
    window.open('/documentacao', '_blank');
  }, []);

  // Manipulador para mudança na seleção de monitoramento
  const handleSelectChange = useCallback((value: string) => {
    setSelectedMonitoring(value);
  }, []);

  // Dados para gráficos
  const categoryData = useMemo(() => {
    const categories = {};
    monitoringItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = 0;
      }
      categories[item.category]++;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [monitoringItems]);

  const frequencyData = useMemo(() => {
    const frequencies = {};
    monitoringItems.forEach(item => {
      if (!frequencies[item.frequency]) {
        frequencies[item.frequency] = 0;
      }
      frequencies[item.frequency]++;
    });
    return Object.entries(frequencies).map(([frequency, quantidade]) => ({ frequency, quantidade }));
  }, [monitoringItems]);

  const responsibleData = useMemo(() => {
    const responsibles = {};
    monitoringItems.forEach(item => {
      if (!responsibles[item.responsible]) {
        responsibles[item.responsible] = { count: 0, institution: "UNIFAP" };
      }
      responsibles[item.responsible].count++;
    });
    return Object.entries(responsibles).map(([responsible, data]) => ({ 
      responsible, 
      monitoramentos: (data as any).count,
      institution: (data as any).institution
    }));
  }, [monitoringItems]);

  const radarData = useMemo(() => {
    const categories = ["governo", "legislacao", "indicadores", "api", "social"];
    return categories.map(subject => ({
      subject,
      A: Math.floor(Math.random() * 100),
      fullMark: 100
    }));
  }, []);

  // Dados para o gráfico de atualizações do sistema
  const systemUpdatesData = useMemo(() => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
    return months.map(name => ({
      name,
      updates: Math.floor(Math.random() * 50) + 10
    }));
  }, []);

  // Estatísticas de análise
  const analysisStats = useMemo(() => ({
    contentAnalysis: Math.floor(monitoringItems.length * 0.8),
    sentimentAnalysis: Math.floor(monitoringItems.length * 0.5),
    crossAnalysis: Math.floor(monitoringItems.length * 0.3),
    nlpAnalysis: Math.floor(monitoringItems.length * 0.2)
  }), [monitoringItems]);

  // Filtrar monitoramentos com base na seleção
  const filteredItems = useMemo(() => {
    if (!selectedMonitoring) return monitoringItems;
    return monitoringItems.filter(item => item.name === selectedMonitoring);
  }, [selectedMonitoring, monitoringItems]);

  if (loading) {
    return <div className="p-8 text-center">Carregando dados do monitoramento...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Erro ao carregar dados: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader 
        onGenerateReport={generateStatusReport}
        onExportCSV={exportAllMonitoringsCSV}
        onOpenDocumentation={openDocumentation}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Filtrar por Monitoramento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={selectedMonitoring} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um monitoramento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os monitoramentos</SelectItem>
                  {monitoringItems.map((item, index) => (
                    <SelectItem key={index} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={exportSelectedMonitoring}
                className="w-full"
                disabled={!selectedMonitoring}
              >
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Resumo do Monitoramento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-forest-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-forest-700">{filteredItems.length}</div>
                <div className="text-sm text-forest-600">Monitoramentos</div>
              </div>
              
              <div className="bg-forest-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-forest-700">{Object.keys(categoryData.reduce((acc, curr) => {
                  if (filteredItems.some(item => item.category === curr.name)) {
                    acc[curr.name] = true;
                  }
                  return acc;
                }, {})).length}</div>
                <div className="text-sm text-forest-600">Categorias</div>
              </div>
              
              <div className="bg-forest-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-forest-700">{Object.keys(frequencyData.reduce((acc, curr) => {
                  if (filteredItems.some(item => item.frequency === curr.frequency)) {
                    acc[curr.frequency] = true;
                  }
                  return acc;
                }, {})).length}</div>
                <div className="text-sm text-forest-600">Frequências</div>
              </div>
              
              <div className="bg-forest-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-forest-700">{Object.keys(responsibleData.reduce((acc, curr) => {
                  if (filteredItems.some(item => item.responsible === curr.responsible)) {
                    acc[curr.responsible] = true;
                  }
                  return acc;
                }, {})).length}</div>
                <div className="text-sm text-forest-600">Responsáveis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ChartsTabs 
        monitoringItems={filteredItems}
        categoryData={categoryData}
        frequencyData={frequencyData}
        responsibleData={responsibleData}
        radarData={radarData}
        systemUpdatesData={systemUpdatesData}
        analysisStats={analysisStats}
      />
    </div>
  );
};

export default InternalDashboard;
