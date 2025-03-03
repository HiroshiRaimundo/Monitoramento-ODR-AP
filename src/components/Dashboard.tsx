
import React, { useMemo, useState } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import AnalysisTools from "./AnalysisTools";
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

      {/* Novas funcionalidades integradas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-6 bg-accent">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden md:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="visual-editor" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Editor Visual</span>
          </TabsTrigger>
          <TabsTrigger value="sql-editor" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden md:inline">Editor SQL</span>
          </TabsTrigger>
          <TabsTrigger value="semantic-layer" className="flex items-center gap-2">
            <TableProperties className="h-4 w-4" />
            <span className="hidden md:inline">Camada Semântica</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span className="hidden md:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Relatórios</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="visual-editor">
          <Card className="eco-card">
            <CardHeader>
              <CardTitle>Editor Visual de Gráficos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-dashed border-primary p-8 flex flex-col items-center justify-center bg-secondary/50 text-center space-y-4">
                <BarChart3 className="h-12 w-12 text-primary/70" />
                <h3 className="text-lg font-medium">Crie gráficos sem código</h3>
                <p className="text-muted-foreground max-w-lg">
                  Arraste e solte campos da camada semântica para criar gráficos interativos. Escolha entre mais de 20 tipos de visualizações diferentes.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-primary">Criar novo gráfico</Button>
                  <Button variant="outline">Ver tutoriais</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Modelos Prontos</h4>
                  <p className="text-sm text-muted-foreground">Inicie com visualizações pré-configuradas</p>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Dashboards Recentes</h4>
                  <p className="text-sm text-muted-foreground">Continue de onde parou</p>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium">Compartilhar</h4>
                  <p className="text-sm text-muted-foreground">Colabore com outros pesquisadores</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sql-editor">
          <Card className="eco-card">
            <CardHeader>
              <CardTitle>Editor SQL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="font-mono bg-muted p-4 rounded-lg text-sm overflow-auto max-h-64">
                <pre className="whitespace-pre-wrap">{sqlQuery}</pre>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary">Executar Consulta</Button>
                <Button variant="outline">Salvar Consulta</Button>
                <Button variant="outline">Explorar Esquema</Button>
                <Button variant="outline">Verificar Sintaxe</Button>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Resultados:</h4>
                <p className="text-sm text-muted-foreground">Execute uma consulta SQL para ver os resultados aqui.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semantic-layer">
          <Card className="eco-card">
            <CardHeader>
              <CardTitle>Camada Semântica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Defina dimensões e métricas personalizadas para simplificar análises.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Dimensões</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="p-2 hover:bg-secondary rounded-md flex justify-between">
                      <span>categoria</span>
                      <span className="text-muted-foreground">texto</span>
                    </li>
                    <li className="p-2 hover:bg-secondary rounded-md flex justify-between">
                      <span>responsável</span>
                      <span className="text-muted-foreground">texto</span>
                    </li>
                    <li className="p-2 hover:bg-secondary rounded-md flex justify-between">
                      <span>instituição</span>
                      <span className="text-muted-foreground">texto</span>
                    </li>
                    <li className="p-2 hover:bg-secondary rounded-md flex justify-between">
                      <span>frequência</span>
                      <span className="text-muted-foreground">texto</span>
                    </li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Métricas</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="p-2 hover:bg-secondary rounded-md flex justify-between">
                      <span>total_monitoramentos</span>
                      <span className="text-muted-foreground">COUNT(*)</span>
                    </li>
                    <li className="p-2 hover:bg-secondary rounded-md flex justify-between">
                      <span>monitoramentos_por_categoria</span>
                      <span className="text-muted-foreground">COUNT(*) GROUP BY</span>
                    </li>
                    <li className="p-2 hover:bg-secondary rounded-md flex justify-between">
                      <span>taxa_atualização</span>
                      <span className="text-muted-foreground">CUSTOM</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Button className="bg-primary">Adicionar Nova Definição</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="eco-card">
            <CardHeader>
              <CardTitle>API para Personalização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="font-mono bg-muted p-4 rounded-lg text-sm overflow-auto max-h-64">
                <pre>{`// Exemplo de endpoint para dados de monitoramento
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
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Documentação da API</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Acesse a documentação completa com exemplos de uso para todos os endpoints disponíveis.
                  </p>
                  <Button variant="link" className="px-0 mt-2">Ver Documentação</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Chaves de API</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Gere e gerencie chaves de API para integrar com seus aplicativos.
                  </p>
                  <Button variant="link" className="px-0 mt-2">Gerenciar Chaves</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="eco-card">
            <CardHeader>
              <CardTitle>Relatórios Automatizados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-6 space-y-4 amazon-gradient-light">
                <h3 className="text-lg font-medium">Configure Relatórios Periódicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium">Diários</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Atualizações críticas enviadas todos os dias
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">Configurar</Button>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium">Semanais</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Resumos e análises enviados toda semana
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">Configurar</Button>
                  </div>
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium">Mensais</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Relatórios completos e tendências
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">Configurar</Button>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Relatórios Agendados</h4>
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Nenhum relatório agendado. Configure um relatório para começar a receber insights automaticamente.
                  </p>
                </div>
              </div>
              <Button className="bg-primary">Criar Novo Relatório</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ferramentas de Análise - apenas para administradores */}
      {isAuthenticated && <AnalysisTools items={monitoringItems} />}
    </div>
  );
};

export default Dashboard;
