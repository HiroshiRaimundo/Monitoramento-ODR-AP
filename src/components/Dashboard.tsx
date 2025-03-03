
import React, { useMemo, useState } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import DashboardControls from "./dashboard/DashboardControls";
import DashboardTabs from "./dashboard/DashboardTabs";
import ChartsLayout from "./dashboard/ChartsLayout";
import { 
  getCategoryData,
  getFrequencyData,
  getResponsibleData,
  getRadarData
} from "./dashboard/DashboardUtils";

interface DashboardProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Preparar dados para gráficos baseados nos monitoringItems
  const categoryData = useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = useMemo(() => getRadarData(monitoringItems), [monitoringItems]);

  // Dashboard content with charts
  const dashboardContent = (
    <ChartsLayout 
      data={data}
      categoryData={categoryData}
      frequencyData={frequencyData}
      responsibleData={responsibleData}
      radarData={radarData}
    />
  );

  return (
    <div className="space-y-6">
      {/* Filtros e Controles */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {/* Novas funcionalidades integradas - Somente para usuários autenticados */}
      {isAuthenticated ? (
        <DashboardTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          dashboardContent={dashboardContent}
        />
      ) : (
        /* Se não estiver autenticado, mostrar apenas o dashboard */
        dashboardContent
      )}
    </div>
  );
};

export default Dashboard;
