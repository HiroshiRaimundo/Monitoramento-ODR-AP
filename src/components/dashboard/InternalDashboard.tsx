
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardControls from "./DashboardControls";
import MonitoringStatsGrid from "./MonitoringStatsGrid";
import ChartsTabs from "./ChartsTabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import DashboardDataProvider from "./DashboardDataProvider";
import MonitoringFilterPanel from "./MonitoringFilterPanel";
import { InternalDashboardProps } from "./types/dashboardTypes";
import { RecentUpdate } from "./types/dashboardTypes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const [showSimulatedData, setShowSimulatedData] = useState(true);
  
  // Prepare stats items for dashboard header
  const headerStats = [
    { value: monitoringItems.length, label: "Monitoramentos Ativos" },
    { value: Array.from(new Set(monitoringItems.map(item => item.category))).length, label: "Categorias" },
    { value: showSimulatedData ? 128 : monitoringItems.length * 3, label: "Coletas na Semana" }
  ];

  // Add isDemo property to items that don't have it
  const enhancedMonitoringItems = monitoringItems.map(item => ({
    ...item,
    isDemo: item.hasOwnProperty('isDemo') ? item.isDemo : false
  }));

  // Filter out simulated data if option is disabled
  const filteredMonitoringItems = showSimulatedData 
    ? enhancedMonitoringItems 
    : enhancedMonitoringItems.filter(item => !item.isDemo);
  const filteredSystemUpdatesData = showSimulatedData 
    ? systemUpdatesData 
    : systemUpdatesData.filter(item => !item.isDemo);
  const filteredRecentAlerts = showSimulatedData 
    ? recentAlerts 
    : recentAlerts.filter(item => !item.isDemo);
  const filteredRecentReports = showSimulatedData 
    ? recentReports 
    : recentReports.filter(item => !item.isDemo);

  return (
    <DashboardDataProvider monitoringItems={filteredMonitoringItems}>
      {({ 
        filteredMonitoringItems: contextFilteredMonitoringItems, 
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
          {/* Header */}
          <DashboardHeader 
            title="Análise de Dados"
            description="Acompanhamento detalhado dos monitoramentos e análises internas"
            statsItems={headerStats}
          />

          {/* Toggle for showing/hiding simulated data */}
          {isAuthenticated && (
            <div className="flex items-center space-x-2 justify-end">
              <Label htmlFor="show-simulated" className="text-sm text-muted-foreground">
                {showSimulatedData ? "Exibindo dados simulados" : "Apenas dados reais"}
              </Label>
              <Switch
                id="show-simulated"
                checked={showSimulatedData}
                onCheckedChange={setShowSimulatedData}
              />
            </div>
          )}

          {/* Individual monitoring filter */}
          <MonitoringFilterPanel
            selectedMonitoring={selectedMonitoring}
            setSelectedMonitoring={setSelectedMonitoring}
            monitoringItems={filteredMonitoringItems}
            exportSelectedMonitoring={async () => {
              // Convert synchronous function to async to match the expected type
              await Promise.resolve(exportSelectedMonitoring());
            }}
          />

          {/* Filters */}
          <DashboardControls 
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={handleExport}
            isAuthenticated={isAuthenticated}
            totalItems={filteredMonitoringItems.length}
          />

          {/* Statistics grid */}
          <MonitoringStatsGrid 
            totalMonitorings={contextFilteredMonitoringItems.length}
            activeSpiders={contextFilteredMonitoringItems.filter(item => item.category === "api").length}
            pendingUpdates={selectedMonitoring === "todos" ? (showSimulatedData ? 12 : 3) : (showSimulatedData ? 2 : 1)}
            lastUpdateDate={showSimulatedData ? "10/05/2024" : new Date().toLocaleDateString('pt-BR')}
          />

          {/* Tab content - Pass all processed data to the tabs component */}
          <ChartsTabs 
            monitoringItems={contextFilteredMonitoringItems}
            categoryData={categoryData}
            frequencyData={frequencyData}
            responsibleData={responsibleData}
            radarData={radarData}
            systemUpdatesData={filteredSystemUpdatesData}
            analysisStats={analysisStats}
            recentAlerts={filteredRecentAlerts}
            recentReports={filteredRecentReports}
          />
        </div>
      )}
    </DashboardDataProvider>
  );
};

export default InternalDashboard;
