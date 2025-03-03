
import React, { useMemo, useState } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import DashboardControls from "./dashboard/DashboardControls";
import StudiesChart from "./dashboard/StudiesChart";
import CategoryChart from "./dashboard/CategoryChart";
import FrequencyChart from "./dashboard/FrequencyChart";
import ResearchersChart from "./dashboard/ResearchersChart";
import SourceTypeChart from "./dashboard/SourceTypeChart";
import SystemUpdatesChart from "./dashboard/SystemUpdatesChart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, BarChart3, FileText, Globe, Code, TableProperties } from "lucide-react";
import { 
  getCategoryData,
  getFrequencyData,
  getResponsibleData,
  getRadarData
} from "./dashboard/DashboardUtils";

interface DashboardProps {
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

const Dashboard: React.FC<DashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sqlQuery, setSqlQuery] = useState(`SELECT * FROM monitoring_items 
WHERE category = 'governo' 
ORDER BY created_at DESC 
LIMIT 10;`);

  // Preparar dados para gráficos adicionais baseados nos monitoringItems
  const categoryData = useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = useMemo(() => getRadarData(monitoringItems), [monitoringItems]);

  return (
    <div className="space-y-6">
      {/* Filtros e Controles */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {/* Novas funcionalidades integradas - Somente para usuários autenticados */}
      {isAuthenticated && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6 bg-green-100/70">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="visual-editor" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
              <Globe className="h-4 w-4" />
              <span className="hidden md:inline">Editor Visual</span>
            </TabsTrigger>
            <TabsTrigger value="sql-editor" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Editor SQL</span>
            </TabsTrigger>
            <TabsTrigger value="semantic-layer" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
              <TableProperties className="h-4 w-4" />
              <span className="hidden md:inline">Camada Semântica</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
              <Code className="h-4 w-4" />
              <span className="hidden md:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Relatórios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* conteúdo mantido */}
          </TabsContent>

          <TabsContent value="visual-editor">
            <Card className="eco-card border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">Editor Visual de Gráficos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-dashed border-green-300 p-8 flex flex-col items-center justify-center bg-green-50/50 text-center space-y-4">
                  <BarChart3 className="h-12 w-12 text-green-500" />
                  <h3 className="text-lg font-medium text-green-800">Crie gráficos sem código</h3>
                  <p className="text-green-700 max-w-lg">
                    Arraste e solte campos da camada semântica para criar gráficos interativos. Escolha entre mais de 20 tipos de visualizações diferentes.
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">Criar novo gráfico</Button>
                    <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Ver tutoriais</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:bg-green-50/40">
                    <h4 className="font-medium text-green-800">Modelos Prontos</h4>
                    <p className="text-sm text-green-600">Inicie com visualizações pré-configuradas</p>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:bg-green-50/40">
                    <h4 className="font-medium text-green-800">Dashboards Recentes</h4>
                    <p className="text-sm text-green-600">Continue de onde parou</p>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:bg-green-50/40">
                    <h4 className="font-medium text-green-800">Compartilhar</h4>
                    <p className="text-sm text-green-600">Colabore com outros pesquisadores</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sql-editor">
            <Card className="eco-card border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">Editor SQL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="font-mono bg-green-50 p-4 rounded-lg text-sm overflow-auto max-h-64">
                  <pre className="whitespace-pre-wrap text-green-800">{sqlQuery}</pre>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">Executar Consulta</Button>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Salvar Consulta</Button>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Explorar Esquema</Button>
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Verificar Sintaxe</Button>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Resultados:</h4>
                  <p className="text-sm text-green-600">Execute uma consulta SQL para ver os resultados aqui.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semantic-layer">
            <Card className="eco-card border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">Camada Semântica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-green-600">Defina dimensões e métricas personalizadas para simplificar análises.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800">Dimensões</h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                        <span className="text-green-700">categoria</span>
                        <span className="text-green-500">texto</span>
                      </li>
                      <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                        <span className="text-green-700">responsável</span>
                        <span className="text-green-500">texto</span>
                      </li>
                      <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                        <span className="text-green-700">instituição</span>
                        <span className="text-green-500">texto</span>
                      </li>
                      <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                        <span className="text-green-700">frequência</span>
                        <span className="text-green-500">texto</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800">Métricas</h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                        <span className="text-green-700">total_monitoramentos</span>
                        <span className="text-green-500">COUNT(*)</span>
                      </li>
                      <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                        <span className="text-green-700">monitoramentos_por_categoria</span>
                        <span className="text-green-500">COUNT(*) GROUP BY</span>
                      </li>
                      <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                        <span className="text-green-700">taxa_atualização</span>
                        <span className="text-green-500">CUSTOM</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Adicionar Nova Definição</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="eco-card border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">API para Personalização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="font-mono bg-green-50 p-4 rounded-lg text-sm overflow-auto max-h-64">
                  <pre className="text-green-800">{`// Exemplo de endpoint para dados de monitoramento
GET /api/v1/monitoring/items

// Exemplo de resposta
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Monitoramento DETER",
      "category": "governo",
      "frequency": "diário",
      "url": "https://terrabrasilis.dpi.inpe.br/",
      "responsible": "Carlos Pereira",
      "institution": "INPE"
    },
    ...
  ],
  "meta": {
    "total": 124,
    "page": 1,
    "limit": 10
  }
}`}</pre>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800">Documentação da API</h4>
                    <p className="text-sm text-green-600 mt-2">
                      Acesse a documentação completa com exemplos de uso para todos os endpoints disponíveis.
                    </p>
                    <Button variant="link" className="px-0 mt-2 text-green-700 hover:text-green-800">Ver Documentação</Button>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800">Chaves de API</h4>
                    <p className="text-sm text-green-600 mt-2">
                      Gere e gerencie chaves de API para integrar com seus aplicativos.
                    </p>
                    <Button variant="link" className="px-0 mt-2 text-green-700 hover:text-green-800">Gerenciar Chaves</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="eco-card border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">Relatórios Automatizados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-green-200 rounded-lg p-6 space-y-4 bg-gradient-to-r from-green-50 to-green-100/70">
                  <h3 className="text-lg font-medium text-green-800">Configure Relatórios Periódicos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-green-100">
                      <h4 className="font-medium text-green-800">Diários</h4>
                      <p className="text-sm text-green-600 mt-1">
                        Atualizações críticas enviadas todos os dias
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700 hover:bg-green-50">Configurar</Button>
                    </div>
                    <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-green-100">
                      <h4 className="font-medium text-green-800">Semanais</h4>
                      <p className="text-sm text-green-600 mt-1">
                        Resumos e análises enviados toda semana
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700 hover:bg-green-50">Configurar</Button>
                    </div>
                    <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-green-100">
                      <h4 className="font-medium text-green-800">Mensais</h4>
                      <p className="text-sm text-green-600 mt-1">
                        Relatórios completos e tendências
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700 hover:bg-green-50">Configurar</Button>
                    </div>
                  </div>
                </div>
                <div className="border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Relatórios Agendados</h4>
                  <div className="text-sm">
                    <p className="text-green-600">
                      Nenhum relatório agendado. Configure um relatório para começar a receber insights automaticamente.
                    </p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Criar Novo Relatório</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Gráficos Principais - Layout em Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Evolução de Estudos - Gráfico de Linha */}
        <StudiesChart data={data} />

        {/* Distribuição por Categoria - Gráfico de Pizza */}
        <CategoryChart data={categoryData} />

        {/* Frequência de Atualização - Gráfico de Barras */}
        <FrequencyChart data={frequencyData} />
      </div>

      {/* Gráficos Secundários - 2 em uma linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição por Responsável - Gráfico de Barras */}
        <ResearchersChart data={responsibleData} />

        {/* Cobertura por Tipo - Gráfico Radar */}
        <SourceTypeChart data={radarData} />
      </div>

      {/* Atualizações do Sistema - Gráfico de Área */}
      <SystemUpdatesChart data={data} />
    </div>
  );
};

export default Dashboard;
