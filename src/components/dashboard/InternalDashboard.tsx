
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardControls from "./DashboardControls";
import MonitoringStatsGrid from "./MonitoringStatsGrid";
import ChartsTabs from "./ChartsTabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { mapToSystemUpdates } from "@/lib/chartUtils";

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
  monitoringItems: any[];
  systemUpdatesData: { name: string; updates: number; }[];
}

const InternalDashboard: React.FC<InternalDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems,
  systemUpdatesData
}) => {
  // Prepare stats items for dashboard header
  const headerStats = [
    { value: monitoringItems.length, label: "Monitoramentos Ativos" },
    { value: Array.from(new Set(monitoringItems.map(item => item.category))).length, label: "Categorias" },
    { value: 128, label: "Coletas na Semana" }
  ];

  // Transformar o formato dos dados para corresponder ao esperado pelo SystemUpdatesChart
  const formattedUpdatesData = mapToSystemUpdates(data);

  return (
    <div className="grid gap-6 font-poppins">
      {/* Cabeçalho */}
      <DashboardHeader 
        title="Análise de Dados"
        description="Acompanhamento detalhado dos monitoramentos e análises internas"
        statsItems={headerStats}
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
        totalMonitorings={monitoringItems.length}
        activeSpiders={monitoringItems.filter(item => item.category === "api").length}
        pendingUpdates={12}
        lastUpdateDate="10/05/2024"
      />

      {/* Conteúdo em abas */}
      <ChartsTabs monitoringItems={monitoringItems} />
    </div>
  );
};

export default InternalDashboard;
