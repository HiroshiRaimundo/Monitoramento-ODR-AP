
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitoringItemType } from "@/components/monitoring/types";
import { ResearchStudy } from "@/types/research";
import { mapToSystemUpdates } from "@/lib/chartUtils";
import { getRecentAlerts, getRecentReports } from "@/lib/alertsUtils";
import { generateSimulatedMonthlyData, simulateMonitoringItems } from "./simulationUtils";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { RecentUpdate } from "./types/dashboardTypes";

// Tab components
import PublicTab from "./tabs/PublicTab";
import ManagementTab from "./tabs/ManagementTab";
import AnalysisTab from "./tabs/AnalysisTab";
import MapTab from "./tabs/MapTab";
import PressTab from "./tabs/PressTab";

interface TabContentProps {
  isAuthenticated: boolean;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  monitoringItems: MonitoringItemType[];
  studies: ResearchStudy[];
  monitoringForm: any;
  studyForm: any;
  handleAddMonitoring: (data: Omit<MonitoringItemType, "id">) => void;
  handleDeleteMonitoring: (id: string) => void;
  handleStudySubmit: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy: (id: string) => void;
  isLoading: boolean;
  uniqueResponsibles?: string[];
  responsibleFilter?: string;
  setResponsibleFilter?: (responsible: string) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  isAuthenticated,
  timeRange,
  setTimeRange,
  handleExport,
  monitoringItems: originalMonitoringItems,
  studies,
  monitoringForm,
  studyForm,
  handleAddMonitoring,
  handleDeleteMonitoring,
  handleStudySubmit,
  handleDeleteStudy,
  isLoading,
  uniqueResponsibles = [],
  responsibleFilter = "",
  setResponsibleFilter = () => {}
}) => {
  // Generate simulated data
  const simulatedMonthlyData = useMemo(() => generateSimulatedMonthlyData(), []);

  // Usar dados simulados se não houver dados reais suficientes
  const monitoringItems = useMemo(() => {
    if (originalMonitoringItems.length < 20) {
      return simulateMonitoringItems() as MonitoringItem[];
    }
    return originalMonitoringItems as unknown as MonitoringItem[];
  }, [originalMonitoringItems]);

  // Preparar dados no formato correto para o gráfico de atualizações
  const systemUpdatesData = useMemo(() => {
    return mapToSystemUpdates(simulatedMonthlyData);
  }, [simulatedMonthlyData]);

  // Buscar alertas e relatórios simulados
  const recentAlerts = useMemo((): RecentUpdate[] => getRecentAlerts(), []);
  const recentReports = useMemo((): RecentUpdate[] => getRecentReports(), []);

  return (
    <Tabs defaultValue="publico" className="w-full">
      <TabsList className="grid grid-cols-5 w-full bg-forest-50 p-1">
        <TabsTrigger value="publico" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Público
        </TabsTrigger>
        {isAuthenticated && (
          <TabsTrigger value="gerenciamento" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
            Gerenciamento
          </TabsTrigger>
        )}
        {isAuthenticated && (
          <TabsTrigger value="analise" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
            Análise
          </TabsTrigger>
        )}
        <TabsTrigger value="map" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Mapa Interativo
        </TabsTrigger>
        {isAuthenticated && (
          <TabsTrigger value="pressOffice" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
            Assessoria de Imprensa
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="publico">
        <PublicTab
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          isAuthenticated={isAuthenticated}
          studies={studies}
          simulatedMonthlyData={simulatedMonthlyData}
        />
      </TabsContent>

      {isAuthenticated && (
        <TabsContent value="gerenciamento">
          <ManagementTab
            monitoringForm={monitoringForm}
            monitoringItems={monitoringItems}
            handleAddMonitoring={handleAddMonitoring}
            handleDeleteMonitoring={handleDeleteMonitoring}
            isLoading={isLoading}
            uniqueResponsibles={uniqueResponsibles.length ? uniqueResponsibles : [...new Set(monitoringItems.map(item => item.responsible))].filter(Boolean) as string[]}
            responsibleFilter={responsibleFilter}
            setResponsibleFilter={setResponsibleFilter}
          />
        </TabsContent>
      )}

      {isAuthenticated && (
        <TabsContent value="analise">
          <AnalysisTab
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={handleExport}
            isAuthenticated={isAuthenticated}
            monitoringItems={monitoringItems}
            simulatedMonthlyData={simulatedMonthlyData}
            systemUpdatesData={systemUpdatesData}
            recentAlerts={recentAlerts}
            recentReports={recentReports}
          />
        </TabsContent>
      )}

      <TabsContent value="map">
        <MapTab
          studies={studies}
          isAuthenticated={isAuthenticated}
          handleStudySubmit={handleStudySubmit}
        />
      </TabsContent>

      {isAuthenticated && (
        <TabsContent value="pressOffice">
          <PressTab />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TabContent;
