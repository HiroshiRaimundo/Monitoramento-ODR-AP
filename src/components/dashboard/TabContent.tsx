
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
  // Estado para armazenar a lista atualizada de estudos
  const [studies, setStudies] = useState<ResearchStudy[]>(originalStudies);
  
  // Atualiza o estado local quando os estudos originais mudam
  useEffect(() => {
    setStudies(originalStudies);
  }, [originalStudies]);

  const monitoringItems = useMemo(() => {
    if (originalMonitoringItems.length < 20) {
      return simulateMonitoringItems();
    }
    return originalMonitoringItems;
  }, [originalMonitoringItems]);

  const filteredStudies = useMemo(() => {
    return filterStudiesByTimeRange(studies, timeRange);
  }, [studies, timeRange]);

  // Manipulador para manter os estudos sincronizados após o envio de um novo estudo
  const handleStudySubmitSync = async (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    try {
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

      <MapaTabContent 
        isAuthenticated={isAuthenticated}
        studies={filteredStudies}
        handleStudySubmit={handleStudySubmitSync}
        handleDeleteStudy={handleDeleteStudy}
      />

      <PressTabContent 
        isAuthenticated={isAuthenticated} 
      />
    </Tabs>
  );
};

export default TabContent;
