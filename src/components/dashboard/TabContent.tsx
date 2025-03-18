
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabContentProps } from "./types";

// Import the individual tab components
import PublicTab from "./tabs/PublicTab";
import ManagementTab from "./tabs/ManagementTab";
import AnalysisTab from "./tabs/AnalysisTab";
import MapTab from "./tabs/MapTab";
import PressOfficeTab from "./tabs/PressOfficeTab";
import { simulateMonitoringItems } from "./mockData";

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
  // Usar dados simulados se não houver dados reais suficientes
  const monitoringItems = useMemo(() => {
    if (originalMonitoringItems.length < 20) {
      return simulateMonitoringItems();
    }
    return originalMonitoringItems;
  }, [originalMonitoringItems]);

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
          isLoading={isLoading}
        />
      </TabsContent>

      {isAuthenticated && (
        <TabsContent value="gerenciamento">
          <ManagementTab 
            monitoringItems={monitoringItems}
            monitoringForm={monitoringForm}
            handleAddMonitoring={handleAddMonitoring}
            handleDeleteMonitoring={handleDeleteMonitoring}
            isLoading={isLoading}
            uniqueResponsibles={uniqueResponsibles}
            responsibleFilter={responsibleFilter}
            setResponsibleFilter={setResponsibleFilter}
            isAuthenticated={isAuthenticated}
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
            isLoading={isLoading}
          />
        </TabsContent>
      )}

      <TabsContent value="map">
        <MapTab 
          studies={studies}
          isAuthenticated={isAuthenticated}
          studyForm={studyForm}
          handleStudySubmit={handleStudySubmit}
          isLoading={isLoading}
        />
      </TabsContent>

      {isAuthenticated && (
        <TabsContent value="pressOffice">
          <PressOfficeTab 
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TabContent;
