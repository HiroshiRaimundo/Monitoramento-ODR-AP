
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
    { value: showSimulatedData ? monitoringItems.length : 0, label: "Monitoramentos Ativos" },
    { value: showSimulatedData ? Array.from(new Set(monitoringItems.map(item => item.category))).length : 0, label: "Categorias" },
    { value: showSimulatedData ? 128 : 0, label: "Coletas na Semana" }
  ];

  // Add isDemo property to items that don't have it
  const enhancedMonitoringItems = monitoringItems.map(item => ({
    ...item,
    isDemo: true // Mark all items as demo data for now
  }));

  // Filter out all data if simulated data option is disabled
  const filteredMonitoringItems = showSimulatedData ? enhancedMonitoringItems : [];
  const filteredSystemUpdatesData = showSimulatedData ? systemUpdatesData : [];
  const filteredRecentAlerts = showSimulatedData ? recentAlerts : [];
  const filteredRecentReports = showSimulatedData ? recentReports : [];

  return (
    <div className="pb-20"> {/* Added padding at the bottom to prevent footer overlap */}
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
                  {showSimulatedData ? "Exibindo dados simulados" : "Dados simulados desativados"}
                </Label>
                <Switch
                  id="show-simulated"
                  checked={showSimulatedData}
                  onCheckedChange={setShowSimulatedData}
                />
              </div>
            )}

            {showSimulatedData && (
              <>
                {/* Individual monitoring filter */}
                <MonitoringFilterPanel
                  selectedMonitoring={selectedMonitoring}
                  setSelectedMonitoring={setSelectedMonitoring}
                  monitoringItems={filteredMonitoringItems}
                  exportSelectedMonitoring={async () => {
                    await Promise.resolve(exportSelectedMonitoring());
                  }}
                />

                {/* Statistics grid */}
                <MonitoringStatsGrid 
                  totalMonitorings={contextFilteredMonitoringItems.length}
                  activeSpiders={contextFilteredMonitoringItems.filter(item => item.category === "api").length}
                  pendingUpdates={selectedMonitoring === "todos" ? 12 : 2}
                  lastUpdateDate={new Date().toLocaleDateString('pt-BR')}
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
              </>
            )}
            
            {!showSimulatedData && (
              <div className="text-center py-20 bg-forest-50 rounded-lg border border-forest-100 shadow-sm">
                <h3 className="text-xl font-semibold text-forest-700">Sem dados para exibir</h3>
                <p className="text-forest-600 mt-2">
                  Ative a opção "Exibir dados simulados" para visualizar exemplos ou adicione dados reais.
                </p>
              </div>
            )}
          </div>
        )}
      </DashboardDataProvider>
    </div>
  );
};

export default InternalDashboard;
