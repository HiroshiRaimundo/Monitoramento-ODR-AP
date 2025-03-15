
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import InternalDashboard from "../InternalDashboard";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { mapToSystemUpdates } from "@/lib/chartUtils";
import { getRecentAlerts, getRecentReports } from "../DashboardUtils";

interface AnaliseTabContentProps {
  isAuthenticated: boolean;
  data: {
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  monitoringItems: MonitoringItem[];
}

const AnaliseTabContent: React.FC<AnaliseTabContentProps> = ({ 
  isAuthenticated,
  data,
  timeRange,
  setTimeRange,
  handleExport,
  monitoringItems
}) => {
  if (!isAuthenticated) return null;

  const systemUpdatesData = mapToSystemUpdates(data);
  const recentAlerts = getRecentAlerts();
  const recentReports = getRecentReports();
  
  return (
    <TabsContent value="analise">
      <InternalDashboard 
        data={data}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        monitoringItems={monitoringItems}
        systemUpdatesData={systemUpdatesData}
        recentAlerts={recentAlerts}
        recentReports={recentReports}
      />
    </TabsContent>
  );
};

export default AnaliseTabContent;
