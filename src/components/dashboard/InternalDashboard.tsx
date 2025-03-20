
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardControls from "./DashboardControls";
import MonitoringStatsGrid from "./MonitoringStatsGrid";
import ChartsTabs, { RecentUpdate } from "./ChartsTabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
<<<<<<< HEAD
import { mapToSystemUpdates } from "@/lib/chartUtils";
import { 
  getCategoryData, 
  getFrequencyData, 
  getResponsibleData, 
  getRadarData,
  getAnalysisTypeStats
} from "./DashboardUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Definição da interface de props
interface InternalDashboardProps {
  data: {
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
  systemUpdatesData: { name: string; updates: number; }[];
  recentAlerts?: RecentUpdate[];
  recentReports?: RecentUpdate[];
}
=======
import DashboardDataProvider from "./DashboardDataProvider";
import MonitoringFilterPanel from "./MonitoringFilterPanel";
import { InternalDashboardProps } from "./types/dashboardTypes";
import { RecentUpdate } from "./types/dashboardTypes";
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937

const InternalDashboard: React.FC<InternalDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems,
  systemUpdatesData,
  recentAlerts = [],
  recentReports = []
}) => {
  // Prepare stats items for dashboard header
  const headerStats = [
    { value: monitoringItems.length, label: "Monitoramentos Ativos" },
    { value: Array.from(new Set(monitoringItems.map(item => item.category))).length, label: "Categorias" },
    { value: 128, label: "Coletas na Semana" }
  ];

<<<<<<< HEAD
  // Calcular estatísticas sobre os tipos de análise ativos para cada monitoramento
  const analysisStats = useMemo(() => {
    return [getAnalysisTypeStats()];
  }, []);

  // Função para exportar dados do monitoramento selecionado
  const exportSelectedMonitoring = () => {
    const dataToExport = selectedMonitoring === 'todos' ? monitoringItems : filteredMonitoringItems;
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const fileName = selectedMonitoring === 'todos' 
      ? 'todos-monitoramentos.json' 
      : `monitoramento-${filteredMonitoringItems[0]?.name.replace(/\s+/g, '-').toLowerCase() || 'selecionado'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
  };

=======
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937
  return (
    <DashboardDataProvider monitoringItems={monitoringItems}>
      {({ 
        filteredMonitoringItems, 
        selectedMonitoring, 
        setSelectedMonitoring,
        categoryData,
        frequencyData,
        responsibleData,
        radarData,
        analysisStats,
        exportSelectedMonitoring
      }) => (
        <div className="grid gap-6 font-poppins">
          {/* Cabeçalho */}
          <DashboardHeader 
            title="Análise de Dados"
            description="Acompanhamento detalhado dos monitoramentos e análises internas"
            statsItems={headerStats}
          />

          {/* Filtro de monitoramento individual */}
          <MonitoringFilterPanel
            selectedMonitoring={selectedMonitoring}
            setSelectedMonitoring={setSelectedMonitoring}
            monitoringItems={monitoringItems}
            exportSelectedMonitoring={exportSelectedMonitoring}
          />

          {/* Filtros */}
          <DashboardControls 
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={handleExport}
            isAuthenticated={isAuthenticated}
            totalItems={monitoringItems.length}
          />

          {/* Grade de estatísticas */}
          <MonitoringStatsGrid 
            totalMonitorings={filteredMonitoringItems.length}
            activeSpiders={filteredMonitoringItems.filter(item => item.category === "api").length}
            pendingUpdates={selectedMonitoring === "todos" ? 12 : 2}
            lastUpdateDate="10/05/2024"
          />

          {/* Conteúdo em abas - Passamos todos os dados processados para o componente de abas */}
          <ChartsTabs 
            monitoringItems={filteredMonitoringItems}
            categoryData={categoryData}
            frequencyData={frequencyData}
            responsibleData={responsibleData}
            radarData={radarData}
            systemUpdatesData={systemUpdatesData}
            analysisStats={analysisStats}
            recentAlerts={recentAlerts}
            recentReports={recentReports}
          />
        </div>
      )}
    </DashboardDataProvider>
  );
};

export default InternalDashboard;
