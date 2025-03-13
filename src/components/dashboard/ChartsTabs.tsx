
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import SourceTypeChart from "./SourceTypeChart";
import FrequencyChart from "./FrequencyChart";
import SystemUpdatesChart from "./SystemUpdatesChart";
import ResearchersChart from "./ResearchersChart";
import CategoryChart from "./CategoryChart";
import RecentMonitorings from "./RecentMonitorings";
import AnalysisTools from "./AnalysisTools";
import RecentUpdates from "./RecentUpdates";
import { mapToStatusEnum } from "@/lib/chartUtils";

// Sample data
const sourceTypeData = [
  { subject: "Portal Gov", A: 42, fullMark: 100 },
  { subject: "Diário Oficial", A: 28, fullMark: 100 },
  { subject: "API", A: 15, fullMark: 100 },
  { subject: "Estatísticas", A: 8, fullMark: 100 },
  { subject: "Outros", A: 7, fullMark: 100 },
];

const updateFrequencyData = [
  { frequency: "Diária", quantidade: 35 },
  { frequency: "Semanal", quantidade: 25 },
  { frequency: "Mensal", quantidade: 20 },
  { frequency: "Trimestral", quantidade: 15 },
  { frequency: "Anual", quantidade: 5 },
];

const systemUpdatesData = [
  { name: "Segunda", updates: 24 },
  { name: "Terça", updates: 18 },
  { name: "Quarta", updates: 16 },
  { name: "Quinta", updates: 23 },
  { name: "Sexta", updates: 29 },
  { name: "Sábado", updates: 12 },
  { name: "Domingo", updates: 7 },
];

const researchersData = [
  { responsible: "Carlos Silva", monitoramentos: 12, institution: "UFPA" },
  { responsible: "Ana Oliveira", monitoramentos: 9, institution: "UFAM" },
  { responsible: "Roberto Santos", monitoramentos: 7, institution: "INPA" },
  { responsible: "Julia Lima", monitoramentos: 6, institution: "IEPA" },
  { responsible: "Pedro Martins", monitoramentos: 5, institution: "UNIFAP" },
];

// Dados fictícios para monitoramentos recentes
const recentUpdates = [
  { id: "1", site: "Portal da Transparência", date: "2024-05-10T10:30:00", status: "success" as const },
  { id: "2", site: "Diário Oficial do Amapá", date: "2024-05-09T14:45:00", status: "success" as const },
  { id: "3", site: "IBGE - Estatísticas", date: "2024-05-08T09:15:00", status: "error" as const },
  { id: "4", site: "Datasus", date: "2024-05-08T16:20:00", status: "success" as const },
  { id: "5", site: "MMA - Política Ambiental", date: "2024-05-07T11:05:00", status: "warning" as const },
];

interface ChartsTabsProps {
  monitoringItems: MonitoringItem[];
}

const ChartsTabs: React.FC<ChartsTabsProps> = ({ monitoringItems }) => {
  // Filtrar para obter os 5 mais recentes monitoramentos
  const recentMonitorings = monitoringItems 
    .slice()
    .sort((a, b) => new Date(b.created_at ?? "").getTime() - new Date(a.created_at ?? "").getTime())
    .slice(0, 5);

  // Preparar dados para as estatísticas
  const categories = Array.from(new Set(monitoringItems.map(item => item.category)));
  const categoryStats = categories.map(cat => ({
    name: cat,
    value: monitoringItems.filter(item => item.category === cat).length
  }));

  return (
    <div className="bg-white rounded-lg border border-forest-100 shadow-sm overflow-hidden">
      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="flex w-full border-b border-forest-100 bg-white p-0 h-auto">
          <TabsTrigger 
            value="visao-geral" 
            className="flex-1 px-6 py-3 font-medium text-sm data-[state=active]:bg-forest-50 data-[state=active]:text-forest-700 data-[state=active]:border-b-2 data-[state=active]:border-forest-600 text-forest-600 hover:bg-forest-50/50 rounded-none"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger 
            value="monitoramentos" 
            className="flex-1 px-6 py-3 font-medium text-sm data-[state=active]:bg-forest-50 data-[state=active]:text-forest-700 data-[state=active]:border-b-2 data-[state=active]:border-forest-600 text-forest-600 hover:bg-forest-50/50 rounded-none"
          >
            Monitoramentos
          </TabsTrigger>
          <TabsTrigger 
            value="ferramentas" 
            className="flex-1 px-6 py-3 font-medium text-sm data-[state=active]:bg-forest-50 data-[state=active]:text-forest-700 data-[state=active]:border-b-2 data-[state=active]:border-forest-600 text-forest-600 hover:bg-forest-50/50 rounded-none"
          >
            Ferramentas
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da Tab de Visão Geral */}
        <TabsContent value="visao-geral" className="p-6">
          {/* Grid de Estatísticas é passado do componente principal */}
          
          {/* Gráficos em grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Gráfico de tipos de fonte */}
            <div className="h-full">
              <SourceTypeChart data={sourceTypeData} />
            </div>

            {/* Gráfico de frequência de atualização */}
            <div className="h-full">
              <FrequencyChart data={updateFrequencyData} />
            </div>

            {/* Gráfico de atualizações do sistema */}
            <div className="h-full">
              <SystemUpdatesChart data={systemUpdatesData} />
            </div>

            {/* Gráfico de Pesquisadores */}
            <div className="h-full">
              <ResearchersChart data={researchersData} />
            </div>
          </div>

          {/* Lista de atualizações recentes */}
          <RecentUpdates updates={recentUpdates} />
        </TabsContent>

        {/* Conteúdo da Tab de Monitoramentos */}
        <TabsContent value="monitoramentos" className="p-6">
          {/* Área de monitoramentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-full">
              <CategoryChart 
                data={categoryStats} 
                title="Monitoramentos por Categoria" 
              />
            </div>

            <RecentMonitorings monitorings={recentMonitorings} />
          </div>
        </TabsContent>

        {/* Conteúdo da Tab de Ferramentas */}
        <TabsContent value="ferramentas" className="p-6">
          <AnalysisTools />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartsTabs;
