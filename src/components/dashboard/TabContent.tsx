
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PublicDashboard from "@/components/dashboard/PublicDashboard";
import InternalDashboard from "@/components/dashboard/InternalDashboard";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";
import ResearchForm from "@/components/ResearchForm";
import ResearchList from "@/components/ResearchList";
import MapView from "@/components/MapView";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ResearchStudy } from "@/types/research";
import PressOfficeTab from "@/components/press/PressOfficeTab";
import { mapToSystemUpdates } from "@/lib/chartUtils";

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

const initialMockData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
  estudos: 0,
  monitoramentos: 0,
  atualizacoes: 0
}));

const TabContent: React.FC<TabContentProps> = ({
  isAuthenticated,
  timeRange,
  setTimeRange,
  handleExport,
  monitoringItems,
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
  // Preparar os dados no formato correto para o SystemUpdatesChart
  const systemUpdatesData = useMemo(() => mapToSystemUpdates(initialMockData), []);

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
        <PublicDashboard 
          data={initialMockData}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          isAuthenticated={isAuthenticated}
          studies={studies}
        />
      </TabsContent>

      {isAuthenticated && (
        <TabsContent value="gerenciamento">
          <div className="grid gap-6">
            <MonitoringForm 
              form={monitoringForm} 
              onSubmit={handleAddMonitoring} 
            />
            <MonitoringList 
              items={monitoringItems} 
              onDelete={handleDeleteMonitoring} 
              isLoading={isLoading}
              uniqueResponsibles={uniqueResponsibles}
              responsibleFilter={responsibleFilter}
              onFilterChange={setResponsibleFilter}
            />
          </div>
        </TabsContent>
      )}

      {isAuthenticated && (
        <TabsContent value="analise">
          <InternalDashboard 
            data={initialMockData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={handleExport}
            isAuthenticated={isAuthenticated}
            monitoringItems={monitoringItems}
            systemUpdatesData={systemUpdatesData} 
          />
        </TabsContent>
      )}

      <TabsContent value="map">
        <MapView 
          studies={studies} 
          isAuthenticated={isAuthenticated}
          onStudySubmit={isAuthenticated ? handleStudySubmit : undefined}
        />
      </TabsContent>

      {isAuthenticated && (
        <TabsContent value="pressOffice">
          <PressOfficeTab />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default TabContent;
