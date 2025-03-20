
import React from "react";
import InternalDashboard from "@/components/dashboard/InternalDashboard";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { RecentUpdate } from "@/components/dashboard/types/dashboardTypes";

interface AnalysisTabProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
  simulatedMonthlyData: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  systemUpdatesData: {
    name: string;
    updates: number;
  }[];
  recentAlerts: RecentUpdate[];
  recentReports: RecentUpdate[];
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({
  timeRange,
  setTimeRange,
  handleExport,
  isAuthenticated,
  monitoringItems,
  simulatedMonthlyData,
  systemUpdatesData,
  recentAlerts,
  recentReports
}) => {
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
