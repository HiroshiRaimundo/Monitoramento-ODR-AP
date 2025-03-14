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
import { getMonitoringsByResearcher, getRecentAlerts, getRecentReports } from "./DashboardUtils";

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

// Dados simulados para o dashboard
const simulatedMonthlyData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
  estudos: Math.floor(Math.random() * 10) + 15,
  monitoramentos: Math.floor(Math.random() * 8) + 12,
  atualizacoes: Math.floor(Math.random() * 20) + 25
}));

// Simulação de monitoramentos com os pesquisadores solicitados
const simulateMonitoringItems = (): MonitoringItem[] => {
  const researchers = [
    "Marilia Gabriela Silva Lobato", "Patrícia Helena Turola Takamatsu", "Lylian Caroline Maciel",
    "André Rodrigues Guimarães", "Sidney da Silva Lobato", "Antônia Costa Andrade",
    "Hiroshi da Silva Koga", "Keliane Bastos de Sousa", "Elane de Lima Ferreira",
    "Suzane Biapino dos Santos", "Wemerson Costa dos Santos", "Wender Carlos Nunes Maciel",
    "Raylan Miranda Cortez", "Emilly Patricia dos Santos Barbosa", "Thayze Guedes Barreto",
    "Jeancarlo Pontes Carvalho", "Joao Paulo Silva Santos", "Alice Agnes Weiser",
    "Renan Mendonça Dantas", "Ana Karolina Lima Pedrada", "Irenildo Costa da Silva"
  ];
  
  const institutions = ["UNIFAP", "PPGDAPP", "Pós-Doc", "UEAP", "UFRJ", "USP"];
  const categories = ["governo", "indicadores", "legislacao", "api", "social"];
  const frequencies = ["diária", "semanal", "quinzenal", "mensal"];
  const sites = [
    "Portal da Transparência", "Diário Oficial do Estado", "IBGE", "DataSUS",
    "Governo do Amapá", "INPE", "IBAMA", "MMA", "Gov.br", "TCU", "CGU"
  ];

  return Array.from({ length: 52 }, (_, i) => {
    const researcherIndex = Math.floor(Math.random() * researchers.length);
    const institutionIndex = Math.floor(Math.random() * institutions.length);
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const frequencyIndex = Math.floor(Math.random() * frequencies.length);
    const siteIndex = Math.floor(Math.random() * sites.length);
    
    return {
      id: `mon-${i+1}`,
      name: `Monitoramento ${sites[siteIndex]}`,
      url: `https://example.com/${sites[siteIndex].toLowerCase().replace(/\s+/g, '-')}`,
      api_url: Math.random() > 0.5 ? `https://api.example.com/${sites[siteIndex].toLowerCase().replace(/\s+/g, '-')}` : undefined,
      frequency: frequencies[frequencyIndex],
      category: categories[categoryIndex],
      keywords: `amazônia, sustentabilidade, ${categories[categoryIndex]}`,
      responsible: researchers[researcherIndex],
      institution: institutions[institutionIndex],
      created_at: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString()
    };
  });
};

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

  // Preparar dados no formato correto para o gráfico de atualizações
  const systemUpdatesData = useMemo(() => {
    return mapToSystemUpdates(simulatedMonthlyData);
  }, []);

  // Buscar alertas e relatórios simulados
  const recentAlerts = useMemo(() => getRecentAlerts(), []);
  const recentReports = useMemo(() => getRecentReports(), []);

  // Filtrar estudos com base no timeRange para o mapa
  const filteredStudies = useMemo(() => {
    // Em uma implementação real, você usaria datas reais para filtrar
    // Aqui estamos apenas simulando uma filtragem baseada no timeRange
    switch(timeRange) {
      case 'diario':
        return studies.filter((_, index) => index % 4 === 0);
      case 'semanal':
        return studies.filter((_, index) => index % 3 === 0);
      case 'mensal':
        return studies.filter((_, index) => index % 2 === 0);
      case 'anual':
        return studies;
      default:
        return studies;
    }
  }, [studies, timeRange]);

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
          data={simulatedMonthlyData}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          isAuthenticated={isAuthenticated}
          mapData={filteredStudies}
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
              uniqueResponsibles={[...new Set(monitoringItems.map(item => item.responsible))].filter(Boolean) as string[]}
              responsibleFilter={responsibleFilter}
              onFilterChange={setResponsibleFilter}
            />
          </div>
        </TabsContent>
      )}

      {isAuthenticated && (
        <TabsContent value="analise">
          <InternalDashboard 
            data={simulatedMonthlyData}
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
      )}

      <TabsContent value="map">
        <MapView 
          studies={filteredStudies} 
          isAuthenticated={isAuthenticated}
          onStudySubmit={handleStudySubmit}
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
