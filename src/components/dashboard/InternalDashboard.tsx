
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart2, LineChart, PieChart, Filter, Database, FileBarChart, Activity, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import FrequencyChart from "./FrequencyChart";
import SourceTypeChart from "./SourceTypeChart";
import SystemUpdatesChart from "./SystemUpdatesChart";
import ResearchersChart from "./ResearchersChart";
import MonitoringStatsGrid from "./MonitoringStatsGrid";
import DashboardControls from "./DashboardControls";
import { Separator } from "@/components/ui/separator";
import { MonitoringItem } from "@/hooks/useMonitoring";

// Definição da interface de props
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

// Dados fictícios para monitoramentos recentes
const recentUpdates = [
  { id: "1", site: "Portal da Transparência", date: "2024-05-10T10:30:00", status: "success" },
  { id: "2", site: "Diário Oficial do Amapá", date: "2024-05-09T14:45:00", status: "success" },
  { id: "3", site: "IBGE - Estatísticas", date: "2024-05-08T09:15:00", status: "error" },
  { id: "4", site: "Datasus", date: "2024-05-08T16:20:00", status: "success" },
  { id: "5", site: "MMA - Política Ambiental", date: "2024-05-07T11:05:00", status: "warning" },
];

// Dados fictícios para os tipos de fonte
const sourceTypeData = [
  { name: "Portal Gov", valor: 42 },
  { name: "Diário Oficial", valor: 28 },
  { name: "API", valor: 15 },
  { name: "Estatísticas", valor: 8 },
  { name: "Outros", valor: 7 },
];

// Dados fictícios para frequência de atualização
const updateFrequencyData = [
  { name: "Diária", valor: 35 },
  { name: "Semanal", valor: 25 },
  { name: "Mensal", valor: 20 },
  { name: "Trimestral", valor: 15 },
  { name: "Anual", valor: 5 },
];

// Dados fictícios para últimas atualizações
const systemUpdatesData = [
  { name: "Segunda", atualizacoes: 24 },
  { name: "Terça", atualizacoes: 18 },
  { name: "Quarta", atualizacoes: 16 },
  { name: "Quinta", atualizacoes: 23 },
  { name: "Sexta", atualizacoes: 29 },
  { name: "Sábado", atualizacoes: 12 },
  { name: "Domingo", atualizacoes: 7 },
];

// Dados fictícios para o gráfico de pesquisadores
const researchersData = [
  { name: "Carlos Silva", studies: 12 },
  { name: "Ana Oliveira", studies: 9 },
  { name: "Roberto Santos", studies: 7 },
  { name: "Julia Lima", studies: 6 },
  { name: "Pedro Martins", studies: 5 },
];

const InternalDashboard: React.FC<InternalDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  
  // Filtrar para obter os 5 mais recentes monitoramentos
  const recentMonitorings = monitoringItems 
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Preparar dados para as estatísticas
  const categories = Array.from(new Set(monitoringItems.map(item => item.category)));
  const categoryStats = categories.map(cat => ({
    name: cat,
    count: monitoringItems.filter(item => item.category === cat).length
  }));

  // Status formatter
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Sucesso</Badge>;
      case "error":
        return <Badge className="bg-red-500">Erro</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Atenção</Badge>;
      default:
        return <Badge className="bg-gray-500">Pendente</Badge>;
    }
  };

  return (
    <div className="grid gap-6 font-poppins">
      {/* Cabeçalho */}
      <Card className="border-forest-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <div className="flex items-center gap-2">
            <FileBarChart size={24} className="text-forest-600" />
            <CardTitle className="text-forest-700 font-poppins text-xl">Dashboard Interno</CardTitle>
          </div>
          <CardDescription className="text-forest-600">
            Acompanhamento detalhado dos monitoramentos e análises internas
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
              <p className="text-forest-700 mb-2">
                Área administrativa para visualização e gerenciamento de todos os monitoramentos ativos. Os dados coletados são atualizados automaticamente conforme a frequência configurada.
              </p>
              <div className="stats flex flex-wrap gap-4 font-poppins">
                <div className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-forest-700">{monitoringItems.length}</div>
                  <div className="text-sm text-forest-600">Monitoramentos Ativos</div>
                </div>
                <div className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-forest-700">{categories.length}</div>
                  <div className="text-sm text-forest-600">Categorias</div>
                </div>
                <div className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-forest-700">128</div>
                  <div className="text-sm text-forest-600">Coletas na Semana</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-forest-200 hover:bg-forest-50 hover:text-forest-700 flex items-center gap-2"
              >
                <Activity size={16} />
                <span>Relatório de Status</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-forest-200 hover:bg-forest-50 hover:text-forest-700 flex items-center gap-2"
              >
                <Download size={16} />
                <span>Exportar CSV</span>
              </Button>
              
              <Link to="/documentacao" className="inline-block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-forest-200 hover:bg-forest-50 hover:text-forest-700 flex items-center gap-2"
                >
                  <ChevronRight size={16} />
                  <span>Documentação</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {/* Tabs para navegação */}
      <div className="bg-white rounded-lg border border-forest-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-forest-100">
          <button
            className={`px-6 py-3 font-medium text-sm ${selectedTab === 'overview' ? 'bg-forest-50 text-forest-700 border-b-2 border-forest-600' : 'text-forest-600 hover:bg-forest-50/50'}`}
            onClick={() => setSelectedTab('overview')}
          >
            Visão Geral
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${selectedTab === 'monitoramentos' ? 'bg-forest-50 text-forest-700 border-b-2 border-forest-600' : 'text-forest-600 hover:bg-forest-50/50'}`}
            onClick={() => setSelectedTab('monitoramentos')}
          >
            Monitoramentos
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${selectedTab === 'analise' ? 'bg-forest-50 text-forest-700 border-b-2 border-forest-600' : 'text-forest-600 hover:bg-forest-50/50'}`}
            onClick={() => setSelectedTab('analise')}
          >
            Análise
          </button>
        </div>

        {/* Conteúdo da Tab de Visão Geral */}
        {selectedTab === 'overview' && (
          <div className="p-6">
            {/* Grade de estatísticas */}
            <MonitoringStatsGrid 
              totalMonitorings={monitoringItems.length}
              activeSpiders={monitoringItems.filter(item => item.active).length}
              pendingUpdates={12}
              lastUpdateDate="10/05/2024"
            />

            {/* Gráficos em grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Gráfico de tipos de fonte */}
              <Card className="border-forest-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest-700 text-base font-medium">Tipos de Fonte</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <SourceTypeChart 
                    data={sourceTypeData}
                    index="name"
                    categories={["valor"]}
                    colors={["#045424", "#116235", "#237546", "#348757", "#459868"]}
                    valueFormatter={(value) => `${value} sites`}
                    showAnimation={true}
                  />
                </CardContent>
              </Card>

              {/* Gráfico de frequência de atualização */}
              <Card className="border-forest-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest-700 text-base font-medium">Frequência de Atualização</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <FrequencyChart 
                    data={updateFrequencyData}
                    index="name"
                    categories={["valor"]}
                    colors={["#045424", "#116235", "#237546", "#348757", "#459868"]}
                    valueFormatter={(value) => `${value} sites`}
                    showAnimation={true}
                  />
                </CardContent>
              </Card>

              {/* Gráfico de atualizações do sistema */}
              <Card className="border-forest-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest-700 text-base font-medium">Atualizações por Dia</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <SystemUpdatesChart 
                    data={systemUpdatesData}
                    index="name"
                    categories={["atualizacoes"]}
                    colors={["#045424"]}
                    valueFormatter={(value) => `${value} coletas`}
                    showAnimation={true}
                  />
                </CardContent>
              </Card>

              {/* Gráfico de Pesquisadores */}
              <Card className="border-forest-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest-700 text-base font-medium">Top Pesquisadores</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <ResearchersChart 
                    data={researchersData}
                    categories={["studies"]}
                    index="name"
                    colors={["#045424"]}
                    valueFormatter={(value) => `${value} monitoramentos`}
                    showAnimation={true}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Lista de atualizações recentes */}
            <Card className="border-forest-100 shadow-sm mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
                  <Activity size={16} className="text-forest-600" />
                  Atualizações Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-forest-100">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-forest-600 uppercase tracking-wider">Site</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-forest-600 uppercase tracking-wider">Data</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-forest-600 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-forest-100">
                      {recentUpdates.map((update) => (
                        <tr key={update.id} className="hover:bg-forest-50/50">
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-forest-700">{update.site}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-forest-600">
                            {new Date(update.date).toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">
                            {getStatusBadge(update.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Conteúdo da Tab de Monitoramentos */}
        {selectedTab === 'monitoramentos' && (
          <div className="p-6">
            {/* Área de monitoramentos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-forest-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest-700 text-base font-medium">Monitoramentos por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-80">
                    <CategoryChart 
                      data={categoryStats.map(stat => ({ name: stat.name, value: stat.count }))} 
                      title="" 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-forest-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest-700 text-base font-medium">Monitoramentos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMonitorings.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-forest-50/50 rounded-md">
                        <div>
                          <h4 className="text-sm font-medium text-forest-700">{item.name}</h4>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs bg-white text-forest-600 mr-2">
                              {item.category}
                            </Badge>
                            <span className="text-xs text-forest-600">
                              {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 border-forest-200 hover:bg-forest-50 hover:text-forest-700">
                          <BarChart2 size={14} className="mr-1" />
                          Gráfico
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Conteúdo da Tab de Análise */}
        {selectedTab === 'analise' && (
          <div className="p-6">
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
                      <Button className="bg-forest-600 hover:bg-forest-700">
                        Criar Gráfico
                      </Button>
                      <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                        Exportar Dados
                      </Button>
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
                      <Button className="bg-forest-600 hover:bg-forest-700">
                        Criar Gráfico
                      </Button>
                      <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                        Exportar Dados
                      </Button>
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
                      <Button className="bg-forest-600 hover:bg-forest-700">
                        Criar Gráfico
                      </Button>
                      <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                        Exportar Dados
                      </Button>
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
                      <Button className="bg-forest-600 hover:bg-forest-700">
                        Criar Relatório
                      </Button>
                      <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                        Modelos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalDashboard;
