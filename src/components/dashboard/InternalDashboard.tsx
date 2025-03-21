
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardControls from "./DashboardControls";
import MonitoringStatsGrid from "./MonitoringStatsGrid";
import ChartsTabs from "./ChartsTabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import DashboardDataProvider from "./DashboardDataProvider";
import MonitoringFilterPanel from "./MonitoringFilterPanel";
import { InternalDashboardProps, RecentUpdate } from "./types/dashboardTypes";

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
