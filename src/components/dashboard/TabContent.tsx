
import React, { useMemo, useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { getRecentAlerts, getRecentReports } from "@/lib/alertsUtils";
import { generateSimulatedMonthlyData, simulateMonitoringItems } from "./simulationUtils";
import { mapToSystemUpdates } from "@/lib/chartUtils";
import { RecentUpdate } from "./types/dashboardTypes";

// Tab components
import TabsList from "./tabs/TabsList";
import PublicoTabContent from "./tabs/PublicoTabContent";
import GerenciamentoTabContent from "./tabs/GerenciamentoTabContent";
import AnaliseTabContent from "./tabs/AnaliseTabContent";
import MapTab from "./tabs/MapTab";
import PressTabContent from "./tabs/PressTabContent";
import { filterStudiesByTimeRange } from "./utils/tabContentUtils";

interface TabContentProps {
  isAuthenticated: boolean;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  monitoringItems: MonitoringItem[];
  studies: ResearchStudy[];
  monitoringForm: any;
  studyForm: any;
  handleAddMonitoring: (data: Omit<MonitoringItem, "id">) => void;
  handleDeleteMonitoring: (id: string) => void;
  handleStudySubmit: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy: (id: string) => void;
  handleEditStudy?: (id: string, data: ResearchStudyFormData) => void;
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
  handleEditStudy,
  isLoading,
  uniqueResponsibles = [],
  responsibleFilter = "",
  setResponsibleFilter = () => {}
}) => {
  // Estado para armazenar a lista atualizada de estudos
  const [studies, setStudies] = useState<ResearchStudy[]>(originalStudies);
  
  // Atualiza o estado local quando os estudos originais mudam
  useEffect(() => {
    console.log("TabContent: Atualizando estudos com", originalStudies.length, "itens");
    setStudies(originalStudies);
  }, [originalStudies]);

  // Generate simulated data
  const simulatedMonthlyData = useMemo(() => generateSimulatedMonthlyData(), []);

  // Usar dados simulados se não houver dados reais suficientes
  const monitoringItems = useMemo(() => {
    if (originalMonitoringItems.length < 20) {
      return simulateMonitoringItems() as MonitoringItem[];
    }
    return originalMonitoringItems as MonitoringItem[];
  }, [originalMonitoringItems]);

  const filteredStudies = useMemo(() => {
    console.log("TabContent: Aplicando filtro de tempo a", studies.length, "estudos");
    return filterStudiesByTimeRange(studies, timeRange);
  }, [studies, timeRange]);

  // Preparar dados no formato correto para o gráfico de atualizações
  const systemUpdatesData = useMemo(() => {
    return mapToSystemUpdates(simulatedMonthlyData);
  }, [simulatedMonthlyData]);

  // Buscar alertas e relatórios simulados
  const recentAlerts = useMemo((): RecentUpdate[] => getRecentAlerts(), []);
  const recentReports = useMemo((): RecentUpdate[] => getRecentReports(), []);

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

  return (
    <Tabs defaultValue="publico" className="w-full">
      <TabsList isAuthenticated={isAuthenticated} />

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

      <MapTab 
        studies={studies}
        isAuthenticated={isAuthenticated}
        handleStudySubmit={handleStudySubmitSync}
        handleDeleteStudy={handleDeleteStudy}
        handleEditStudy={handleEditStudy}
      />

      <PressTabContent 
        isAuthenticated={isAuthenticated} 
      />
    </Tabs>
  );
};

export default TabContent;
