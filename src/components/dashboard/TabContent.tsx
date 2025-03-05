
import React from "react";
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
    <Tabs defaultValue="publicDashboard" className="w-full">
      <TabsList className="grid grid-cols-4 w-full bg-forest-50 p-1">
        <TabsTrigger value="publicDashboard" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Monitoramento
        </TabsTrigger>
        {isAuthenticated && (
          <TabsTrigger value="internalDashboard" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
            Dashboard Interno
          </TabsTrigger>
        )}
        {isAuthenticated && (
          <TabsTrigger value="management" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
            Gerenciamento
          </TabsTrigger>
        )}
        <TabsTrigger value="map" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Mapa Interativo
        </TabsTrigger>
      </TabsList>

      {/* Aba do Dashboard Público (agora chamada de "Monitoramento") */}
      <TabsContent value="publicDashboard">
        <PublicDashboard 
          data={initialMockData}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          isAuthenticated={isAuthenticated}
          studies={studies}
        />
      </TabsContent>

      {/* Aba do Dashboard Interno (apenas para usuários autenticados) */}
      {isAuthenticated && (
        <TabsContent value="internalDashboard">
          <InternalDashboard 
            data={initialMockData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleExport={handleExport}
            isAuthenticated={isAuthenticated}
            monitoringItems={monitoringItems}
          />
        </TabsContent>
      )}

      {/* Aba de Gerenciamento (combina Monitoramento e Pesquisa) */}
      {isAuthenticated && (
        <TabsContent value="management">
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
            <div className="grid gap-6 md:grid-cols-2 mt-6">
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
          </div>
        </TabsContent>
      )}

      {/* Aba do Mapa */}
      <TabsContent value="map">
        <MapView studies={studies} />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
