
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import AnalysisTools from "../AnalysisTools";
import DashboardControls from "./DashboardControls";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import FrequencyChart from "./FrequencyChart";
import ResearchersChart from "./ResearchersChart";
import SourceTypeChart from "./SourceTypeChart";
import SystemUpdatesChart from "./SystemUpdatesChart";
import MonitoringStatsGrid from "./MonitoringStatsGrid";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { 
  getCategoryData,
  getFrequencyData,
  getResponsibleData,
  getRadarData
} from "./DashboardUtils";
import { BarChart, PieChart, LineChart, Activity, Search, PanelRight, ExternalLink } from "lucide-react";

interface InternalDashboardProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
}

const InternalDashboard: React.FC<InternalDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMonitoring, setActiveMonitoring] = useState<MonitoringItem | null>(null);
  const [viewMode, setViewMode] = useState<"all" | "single">("all");

  // Filtra monitoringItems com base no termo de pesquisa
  const filteredItems = useMemo(() => {
    return monitoringItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.responsible && item.responsible.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [monitoringItems, searchTerm]);

  // Prepare dashboard data
  const categoryData = useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = useMemo(() => getRadarData(monitoringItems), [monitoringItems]);

  // Gerar dados simulados para um monitoramento específico
  const generateItemData = (item: MonitoringItem) => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
      valor: Math.floor(Math.random() * 100) + 20,
      atualizacoes: Math.floor(Math.random() * 10),
    }));
  };

  // Simular dados para visualização individual
  const singleItemData = activeMonitoring ? generateItemData(activeMonitoring) : [];

  const handleSelectMonitoring = (item: MonitoringItem) => {
    setActiveMonitoring(item);
    setViewMode("single");
  };

  const handleBackToAll = () => {
    setActiveMonitoring(null);
    setViewMode("all");
  };

  return (
    <div className="grid gap-6 font-poppins">
      {/* Cabeçalho */}
      <Card className="border-forest-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <div className="flex items-center gap-2">
            <Activity size={24} className="text-forest-600" />
            <CardTitle className="text-forest-700 font-poppins text-xl">Dashboard Interno</CardTitle>
          </div>
          <CardDescription className="text-forest-600">
            Visualização administrativa de monitoramentos ativos ({monitoringItems.length})
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
              <p className="text-forest-700 mb-2">
                Dashboard interno para acompanhamento de sites monitorados e análise de dados.
                {monitoringItems.length > 0 ? 
                  ` Atualmente monitorando ${monitoringItems.length} sites.` : 
                  " Nenhum site sendo monitorado no momento."}
              </p>
              
              {/* Estatísticas rápidas */}
              <MonitoringStatsGrid monitoringItems={monitoringItems} />
            </div>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <div className="relative flex items-center">
                <Search className="absolute left-2 text-forest-600 h-4 w-4" />
                <Input
                  placeholder="Buscar monitoramentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-forest-200 focus:border-forest-500"
                />
              </div>
              
              <Button 
                onClick={handleExport} 
                className="bg-forest-600 hover:bg-forest-700 text-white font-poppins"
              >
                Exportar Dados
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles do Dashboard */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {viewMode === "all" ? (
        <>
          {/* Visão Geral dos Monitoramentos */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-forest-50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                <BarChart size={16} className="mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                <PanelRight size={16} className="mr-2" />
                Lista de Monitoramentos
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                <Activity size={16} className="mr-2" />
                Ferramentas de Análise
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo da aba Visão Geral */}
            <TabsContent value="overview" className="pt-4">
              {/* Gráficos Principais - Layout em Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Distribuição por Categoria - Gráfico de Pizza */}
                <CategoryChart data={categoryData} title="Monitoramentos por Categoria" />

                {/* Frequência de Atualização - Gráfico de Barras */}
                <FrequencyChart data={frequencyData} />

                {/* Cobertura por Tipo - Gráfico Radar */}
                <SourceTypeChart data={radarData} />
              </div>

              {/* Gráficos Secundários - 2 em uma linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Distribuição por Responsável - Gráfico de Barras */}
                <ResearchersChart data={responsibleData} />

                {/* Evolução de Estudos - Gráfico de Linha */}
                <StudiesChart data={data} />
              </div>

              {/* Atualizações do Sistema - Gráfico de Área */}
              <SystemUpdatesChart data={data} />
            </TabsContent>

            {/* Conteúdo da aba Lista de Monitoramentos */}
            <TabsContent value="list" className="pt-4">
              <div className="bg-white rounded-lg border border-forest-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-forest-200">
                    <thead className="bg-forest-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-forest-700 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-forest-700 uppercase tracking-wider">
                          Categoria
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-forest-700 uppercase tracking-wider">
                          Frequência
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-forest-700 uppercase tracking-wider">
                          Responsável
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-forest-700 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-forest-100">
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <tr key={item.id} className="hover:bg-forest-50/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-forest-700">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-forest-600">
                              {item.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-forest-600">
                              {item.frequency}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-forest-600">
                              {item.responsible || "Não atribuído"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-forest-600 hover:text-forest-700 hover:bg-forest-50"
                                  onClick={() => handleSelectMonitoring(item)}
                                >
                                  <BarChart size={14} className="mr-1" /> Visualizar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-forest-600 hover:text-forest-700 hover:bg-forest-50"
                                  as="a" 
                                  href={item.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink size={14} className="mr-1" /> Acessar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-forest-500">
                            {searchTerm ? "Nenhum monitoramento encontrado para esta busca." : "Nenhum monitoramento cadastrado."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Conteúdo da aba Ferramentas de Análise */}
            <TabsContent value="tools" className="pt-4">
              <AnalysisTools items={monitoringItems} />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <>
          {/* Visualização Individual do Monitoramento */}
          {activeMonitoring && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={handleBackToAll}
                  className="text-forest-600 hover:text-forest-700 hover:bg-forest-50"
                >
                  ← Voltar para visão geral
                </Button>
                <Button 
                  as="a" 
                  href={activeMonitoring.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-forest-600 hover:bg-forest-700 text-white"
                >
                  <ExternalLink size={16} className="mr-2" /> Acessar site
                </Button>
              </div>

              <Card className="border-forest-100 shadow-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
                  <div className="flex items-center gap-2">
                    <Activity size={24} className="text-forest-600" />
                    <CardTitle className="text-forest-700 font-poppins text-xl">{activeMonitoring.name}</CardTitle>
                  </div>
                  <CardDescription className="text-forest-600">
                    Monitoramento detalhado | Categoria: {activeMonitoring.category} | Frequência: {activeMonitoring.frequency}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-forest-700 mb-2">Detalhes do Monitoramento</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">URL:</span> <a href={activeMonitoring.url} target="_blank" rel="noopener noreferrer" className="text-forest-600 hover:underline">{activeMonitoring.url}</a></p>
                        {activeMonitoring.api_url && <p><span className="font-medium">API URL:</span> {activeMonitoring.api_url}</p>}
                        <p><span className="font-medium">Responsável:</span> {activeMonitoring.responsible || "Não atribuído"}</p>
                        <p><span className="font-medium">Instituição:</span> {activeMonitoring.institution || "Não informada"}</p>
                        {activeMonitoring.keywords && <p><span className="font-medium">Palavras-chave:</span> {activeMonitoring.keywords}</p>}
                      </div>
                    </div>
                    
                    <div className="bg-forest-50/30 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-forest-700 mb-2">Estatísticas</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded shadow-sm">
                          <div className="text-sm text-forest-600">Total de Atualizações</div>
                          <div className="text-2xl font-bold text-forest-700">
                            {Math.floor(Math.random() * 100) + 10}
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded shadow-sm">
                          <div className="text-sm text-forest-600">Última Atualização</div>
                          <div className="text-lg font-medium text-forest-700">
                            {new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gráficos específicos do monitoramento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-forest-100 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
                    <CardTitle className="text-forest-700">Evolução do Monitoramento</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[300px]">
                      <LineChart 
                        data={singleItemData.map(item => ({ 
                          name: item.name,
                          valor: item.valor
                        }))} 
                        index="name"
                        categories={["valor"]}
                        colors={["#045424"]}
                        valueFormatter={(value) => `${value} registros`}
                        showAnimation={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-forest-100 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
                    <CardTitle className="text-forest-700">Atualizações Mensais</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[300px]">
                      <BarChart 
                        data={singleItemData.map(item => ({ 
                          name: item.name,
                          atualizacoes: item.atualizacoes
                        }))} 
                        index="name"
                        categories={["atualizacoes"]}
                        colors={["#16744a"]}
                        valueFormatter={(value) => `${value}`}
                        showAnimation={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Análises específicas */}
              <Card className="border-forest-100 shadow-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
                  <CardTitle className="text-forest-700">Ferramentas de Análise</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700 text-white"
                      onClick={() => {
                        const dataStr = JSON.stringify(singleItemData, null, 2);
                        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                        const linkElement = document.createElement('a');
                        linkElement.setAttribute('href', dataUri);
                        linkElement.setAttribute('download', `${activeMonitoring.name.replace(/ /g, '_')}-dados.json`);
                        linkElement.click();
                      }}
                    >
                      Exportar Dados JSON
                    </Button>
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700 text-white"
                      onClick={() => {
                        // Simulando download de script Python
                        const pythonScript = `
import pandas as pd
import matplotlib.pyplot as plt
import requests
from bs4 import BeautifulSoup

# Configurações
URL = "${activeMonitoring.url}"
NAME = "${activeMonitoring.name}"

# Função para buscar dados
def fetch_data():
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    # Implementar lógica de extração específica
    return pd.DataFrame()

# Análise
data = fetch_data()
print(data.describe())
                        `;
                        const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(pythonScript);
                        const linkElement = document.createElement('a');
                        linkElement.setAttribute('href', dataUri);
                        linkElement.setAttribute('download', `${activeMonitoring.name.replace(/ /g, '_')}_analysis.py`);
                        linkElement.click();
                      }}
                    >
                      Gerar Script Python
                    </Button>
                    <Button 
                      className="bg-forest-600 hover:bg-forest-700 text-white"
                      onClick={() => {
                        // Simulando geração de relatório
                        alert("Funcionalidade de geração de relatório em implementação.");
                      }}
                    >
                      Gerar Relatório PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InternalDashboard;
