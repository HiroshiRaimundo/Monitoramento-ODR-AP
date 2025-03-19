import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, PieChart, TrendingUp, Users, ServerCrash, Zap, Layers } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ChartContainer } from "@/components/ui/chart";
import CategoryChart from "./CategoryChart";
import FrequencyChart from "./FrequencyChart";
import ResearchersChart from "./ResearchersChart";
import SourceTypeChart from "./SourceTypeChart";
import SystemUpdatesChart from "./SystemUpdatesChart";
import RecentMonitorings from "./RecentMonitorings";
import RecentUpdates from "./RecentUpdates";
import AnalysisTools from "./AnalysisTools";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RecentUpdate } from "./types/dashboardTypes";

interface AnalysisStats {
  contentAnalysis: number;
  sentimentAnalysis: number;
  crossAnalysis: number;
  nlpAnalysis: number;
}

interface ChartsTabsProps {
  monitoringItems: MonitoringItem[];
  categoryData?: { name: string; value: number }[];
  frequencyData?: { frequency: string; quantidade: number }[];
  responsibleData?: { responsible: string; monitoramentos: number; institution: string }[];
  radarData?: { subject: string; A: number; fullMark: number }[];
  systemUpdatesData: { name: string; updates: number }[];
  analysisStats?: AnalysisStats;
  recentAlerts?: RecentUpdate[];
  recentReports?: RecentUpdate[];
}

const ChartsTabs = ({ 
  monitoringItems, 
  categoryData, 
  frequencyData, 
  responsibleData, 
  radarData,
  systemUpdatesData,
  analysisStats = {
    contentAnalysis: 0,
    sentimentAnalysis: 0,
    crossAnalysis: 0,
    nlpAnalysis: 0
  },
  recentAlerts = [],
  recentReports = []
}: ChartsTabsProps) => {
  const mockUpdates: RecentUpdate[] = [
    { 
      id: "1", 
      title: "Portal de Transparência", 
      description: "Atualização de dados fiscais", 
      date: "10/05/2024", 
      type: "content", 
      site: "Portal da Transparência", 
      status: "success" 
    },
    { 
      id: "2", 
      title: "IBGE - Indicadores", 
      description: "Novos dados demográficos", 
      date: "09/05/2024", 
      type: "data", 
      site: "IBGE", 
      status: "pending" 
    },
    { 
      id: "3", 
      title: "Diário Oficial", 
      description: "Publicação de nova legislação", 
      date: "08/05/2024", 
      type: "alert", 
      site: "Diário Oficial", 
      status: "warning" 
    }
  ];

  const displayAlerts = recentAlerts.length > 0 ? recentAlerts : mockUpdates;
  const displayReports = recentReports.length > 0 ? recentReports : mockUpdates;

  return (
    <Tabs defaultValue="visão-geral" className="w-full">
      <TabsList className="w-full grid grid-cols-4 mb-6">
        <TabsTrigger value="visão-geral" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span>Visão Geral</span>
        </TabsTrigger>
        <TabsTrigger value="categorias" className="flex items-center gap-2">
          <PieChart className="h-4 w-4" />
          <span>Categorias</span>
        </TabsTrigger>
        <TabsTrigger value="atualizações" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Atualizações</span>
        </TabsTrigger>
        <TabsTrigger value="análises" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>Análises</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visão-geral">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Atualizações do Sistema</CardTitle>
              <CardDescription>Monitoramento de atualizações ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <SystemUpdatesChart data={systemUpdatesData} />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categorias</CardTitle>
              <CardDescription>Monitoramentos agrupados por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-60">
                <CategoryChart data={categoryData || []} />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Frequência</CardTitle>
              <CardDescription>Monitoramentos agrupados por frequência de atualização</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-60">
                <FrequencyChart data={frequencyData || []} />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monitoramentos Recentes</CardTitle>
              <CardDescription>Últimos monitoramentos adicionados</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentMonitorings monitorings={monitoringItems} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atualizações Recentes</CardTitle>
              <CardDescription>Últimas alterações detectadas nos monitoramentos</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUpdates updates={displayAlerts} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="categorias">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categorias</CardTitle>
              <CardDescription>Monitoramentos agrupados por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <CategoryChart data={categoryData || []} />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de Fontes</CardTitle>
              <CardDescription>Distribuição por tipos de fontes monitoradas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <SourceTypeChart data={radarData || []} />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Por Responsável</CardTitle>
              <CardDescription>Monitoramentos agrupados por responsável</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <ResearchersChart data={responsibleData || []} />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ServerCrash className="h-5 w-5 text-forest-600" />
                <span>Estado dos Monitoramentos</span>
              </CardTitle>
              <CardDescription>Status atual de todos os monitoramentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{monitoringItems.filter(item => item.category === "api").length}</div>
                    <div className="text-sm text-green-700">Monitoramentos Ativos</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">2</div>
                    <div className="text-sm text-yellow-700">Requerem Atenção</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{monitoringItems.filter(item => item.frequency === "diario").length}</div>
                    <div className="text-sm text-blue-700">Atualizações Diárias</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">0</div>
                    <div className="text-sm text-red-700">Falhas Críticas</div>
                  </div>
                </div>

                <Alert>
                  <AlertTitle className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Resumo de Estado
                  </AlertTitle>
                  <AlertDescription>
                    {monitoringItems.length > 0 
                      ? "Todos os sistemas de monitoramento estão funcionando normalmente." 
                      : "Nenhum monitoramento configurado até o momento."}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="atualizações">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Atualizações Detectadas</CardTitle>
              <CardDescription>Histórico de mudanças detectadas pelos monitoramentos</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-80">
                <SystemUpdatesChart data={systemUpdatesData} />
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Atualizações</CardTitle>
              <CardDescription>Detalhes das últimas atualizações detectadas</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUpdates updates={displayReports} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <span>Alertas de Monitoramento</span>
              </CardTitle>
              <CardDescription>Notificações sobre alterações importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertTitle className="text-yellow-800">Mudança de Conteúdo Detectada</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Alteração significativa detectada em "Portal de Transparência" (10/05/2024)
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle className="text-blue-800">Nova Coleta Programada</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Próxima coleta do monitoramento "IBGE - Indicadores" programada para 12/05/2024
                  </AlertDescription>
                </Alert>
                
                <div className="text-sm text-muted-foreground mt-4">
                  Mostrando alertas dos últimos 7 dias.
                  {monitoringItems.length === 0 && " Nenhum monitoramento configurado."}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="análises">
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
                  {monitoringItems.length > 0 ? (
                    monitoringItems.slice(0, 5).map((item, index) => (
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
                  
                  {monitoringItems.length > 5 && (
                    <div className="text-center text-sm text-muted-foreground mt-2">
                      Mostrando 5 de {monitoringItems.length} monitoramentos
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
      </TabsContent>
    </Tabs>
  );
};

export default ChartsTabs;
