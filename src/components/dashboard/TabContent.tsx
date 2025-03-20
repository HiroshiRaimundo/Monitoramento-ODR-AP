
<<<<<<< HEAD
import React, { useMemo, useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ResearchStudy } from "@/types/research";
import { simulatedMonthlyData, simulateMonitoringItems, filterStudiesByTimeRange } from "./utils/tabContentUtils";

// Tab components
import TabsList from "./tabs/TabsList";
import PublicoTabContent from "./tabs/PublicoTabContent";
import GerenciamentoTabContent from "./tabs/GerenciamentoTabContent";
import AnaliseTabContent from "./tabs/AnaliseTabContent";
import MapaTabContent from "./tabs/MapaTabContent";
import PressTabContent from "./tabs/PressTabContent";
=======
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
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937

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
  studies: originalStudies,
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
<<<<<<< HEAD
  // Estado para armazenar a lista atualizada de estudos
  const [studies, setStudies] = useState<ResearchStudy[]>(originalStudies);
  
  // Atualiza o estado local quando os estudos originais mudam
  useEffect(() => {
    console.log("TabContent: Atualizando estudos com", originalStudies.length, "itens");
    setStudies(originalStudies);
  }, [originalStudies]);

=======
  // Generate simulated data
  const simulatedMonthlyData = useMemo(() => generateSimulatedMonthlyData(), []);

  // Usar dados simulados se não houver dados reais suficientes
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937
  const monitoringItems = useMemo(() => {
    if (originalMonitoringItems.length < 20) {
      return simulateMonitoringItems() as MonitoringItem[];
    }
    return originalMonitoringItems as unknown as MonitoringItem[];
  }, [originalMonitoringItems]);

<<<<<<< HEAD
  const filteredStudies = useMemo(() => {
    console.log("TabContent: Aplicando filtro de tempo a", studies.length, "estudos");
    return filterStudiesByTimeRange(studies, timeRange);
  }, [studies, timeRange]);

  // Manipulador para manter os estudos sincronizados após o envio de um novo estudo
  const handleStudySubmitSync = async (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    try {
      console.log("TabContent: Enviando novo estudo:", data.title);
      // Chamar o manipulador original para adicionar o estudo
      await handleStudySubmit(data);
      
      // Após adicionar com sucesso, podemos confiar que originalStudies será atualizado
      // no próximo ciclo de renderização por meio do useEffect
    } catch (error) {
      console.error("Erro ao sincronizar estudos:", error);
    }
  };
=======
  // Preparar dados no formato correto para o gráfico de atualizações
  const systemUpdatesData = useMemo(() => {
    return mapToSystemUpdates(simulatedMonthlyData);
  }, [simulatedMonthlyData]);

  // Buscar alertas e relatórios simulados
  const recentAlerts = useMemo((): RecentUpdate[] => getRecentAlerts(), []);
  const recentReports = useMemo((): RecentUpdate[] => getRecentReports(), []);
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937

  return (
    <Tabs defaultValue="publico" className="w-full">
      <TabsList isAuthenticated={isAuthenticated} />

<<<<<<< HEAD
      <PublicoTabContent 
        data={simulatedMonthlyData}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isAuthenticated={isAuthenticated}
        studies={studies}
        mapData={filteredStudies}
      />

      <GerenciamentoTabContent 
        isAuthenticated={isAuthenticated}
        form={monitoringForm}
        handleAddMonitoring={handleAddMonitoring}
        monitoringItems={monitoringItems}
        handleDeleteMonitoring={handleDeleteMonitoring}
        isLoading={isLoading}
        uniqueResponsibles={[...new Set(monitoringItems.map(item => item.responsible))].filter(Boolean) as string[]}
        responsibleFilter={responsibleFilter}
        setResponsibleFilter={setResponsibleFilter}
      />

      <AnaliseTabContent 
        isAuthenticated={isAuthenticated}
        data={simulatedMonthlyData}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        monitoringItems={monitoringItems}
      />

      <MapaTabContent 
        isAuthenticated={isAuthenticated}
        studies={studies}  // Usar todos os estudos sem filtrar por tempo
        handleStudySubmit={handleStudySubmitSync}
        handleDeleteStudy={handleDeleteStudy}
      />

      <PressTabContent 
        isAuthenticated={isAuthenticated} 
      />
=======
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
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937
    </Tabs>
  );
};

export default TabContent;
