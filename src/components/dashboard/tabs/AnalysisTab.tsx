
import React, { useMemo } from "react";
import { AnalysisTabProps } from "../types";
import InternalDashboard from "@/components/dashboard/InternalDashboard";
import { mapToSystemUpdates } from "@/lib/chartUtils";

const AnalysisTab: React.FC<AnalysisTabProps> = ({ 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems 
}) => {
  // Import simulated data and utility functions from mockData
  const { simulatedMonthlyData, getRecentAlerts, getRecentReports } = require("../mockData");

  // Preparar dados no formato correto para o gráfico de atualizações
  const systemUpdatesData = useMemo(() => {
    return mapToSystemUpdates(simulatedMonthlyData);
  }, []);

  // Buscar alertas e relatórios simulados
  const recentAlerts = useMemo(() => getRecentAlerts(), []);
  const recentReports = useMemo(() => getRecentReports(), []);

  return (
    <InternalDashboard 
      data={simulatedMonthlyData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      handleExport={handleExport}
      isAuthenticated={isAuthenticated}
      monitoringItems={monitoringItems}
      systemUpdatesData={systemUpdatesData}
      recentAlerts={recentAlerts}
      recentReports={recentReports}
    />
  );
};

export default AnalysisTab;
