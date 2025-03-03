
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/Dashboard";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";
import ResearchForm from "@/components/ResearchForm";
import ResearchList from "@/components/ResearchList";
import MapView from "@/components/MapView";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ResearchStudy } from "@/types/research";
import AnalysisToolsTabs from "@/components/analysis/AnalysisToolsTabs";

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

// Dados iniciais vazios para o dashboard
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
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="map">Mapa Interativo</TabsTrigger>
      </TabsList>

      {/* Aba do Dashboard */}
      <TabsContent value="dashboard">
        <Dashboard 
          data={initialMockData}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          handleExport={handleExport}
          isAuthenticated={isAuthenticated}
          monitoringItems={monitoringItems}
        />
      </TabsContent>

      {/* Aba do Mapa */}
      <TabsContent value="map">
        <MapView studies={studies} />
      </TabsContent>

      {/* Abas adicionais somente visíveis para administradores */}
      {isAuthenticated && (
        <>
          <div className="mt-8 border-t pt-4">
            <Tabs defaultValue="monitoring" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
                <TabsTrigger value="research">Pesquisa</TabsTrigger>
                <TabsTrigger value="analysis">Análise Automática</TabsTrigger>
              </TabsList>

              {/* Aba de Monitoramento */}
              <TabsContent value="monitoring">
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
              </TabsContent>

              {/* Aba de Pesquisa */}
              <TabsContent value="research">
                <div className="grid gap-6 md:grid-cols-2">
                  <ResearchForm 
                    form={studyForm} 
                    onSubmit={handleStudySubmit} 
                  />
                  <ResearchList 
                    studies={studies} 
                    onDelete={handleDeleteStudy}
                    isLoading={isLoading}
                  />
                </div>
              </TabsContent>

              {/* Nova aba de Análise Automática */}
              <TabsContent value="analysis">
                <AnalysisToolsTabs items={monitoringItems} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </Tabs>
  );
};

export default TabContent;
