
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { RecentUpdate } from "./RecentUpdates";
import { mapToRecentUpdates } from "@/lib/updateUtils";

// Import the tab content components
import OverviewTabContent from "./tabs/OverviewTabContent";
import CategoriesTabContent from "./tabs/CategoriesTabContent";
import UpdatesTabContent from "./tabs/UpdatesTabContent";
import AnalysisTabContent from "./tabs/AnalysisTabContent";

// Definir a interface para as estatísticas de análise
interface AnalysisStats {
  contentAnalysis: number;
  sentimentAnalysis: number;
  crossAnalysis: number;
  nlpAnalysis: number;
}

// Mock updates agora com as propriedades necessárias
const mockUpdateData = [
  { id: "1", title: "Portal de Transparência", description: "Atualização de dados fiscais", date: "10/05/2024", type: "content", site: "Portal da Transparência", status: "success" },
  { id: "2", title: "IBGE - Indicadores", description: "Novos dados demográficos", date: "09/05/2024", type: "data", site: "IBGE", status: "pending" },
  { id: "3", title: "Diário Oficial", description: "Publicação de nova legislação", date: "08/05/2024", type: "alert", site: "Diário Oficial", status: "warning" }
];

// Converter para o formato compatível
const mockUpdates: RecentUpdate[] = mapToRecentUpdates(mockUpdateData);

interface ChartsTabsProps {
  monitoringItems: MonitoringItem[];
  categoryData?: { name: string; value: number }[];
  frequencyData?: { frequency: string; quantidade: number }[];
  responsibleData?: { responsible: string; monitoramentos: number; institution: string }[];
  radarData?: { subject: string; A: number; fullMark: number }[];
  systemUpdatesData: { name: string; updates: number }[];
  analysisStats?: AnalysisStats;
  recentAlerts?: RecentUpdate[];
  recentReports?: RecentUpdate[];
}

const ChartsTabs = ({ 
  monitoringItems, 
  categoryData, 
  frequencyData, 
  responsibleData, 
  radarData,
  systemUpdatesData,
  analysisStats = {
    contentAnalysis: 0,
    sentimentAnalysis: 0,
    crossAnalysis: 0,
    nlpAnalysis: 0
  },
  recentAlerts = mockUpdates,
  recentReports = mockUpdates
}: ChartsTabsProps) => {
  return (
    <Tabs defaultValue="visão-geral" className="w-full">
      <TabsList className="w-full grid grid-cols-4 mb-6">
        <TabsTrigger value="visão-geral" className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <span>Visão Geral</span>
        </TabsTrigger>
        <TabsTrigger value="categorias" className="flex items-center gap-2">
          <PieChart className="h-4 w-4" />
          <span>Categorias</span>
        </TabsTrigger>
        <TabsTrigger value="atualizações" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Atualizações</span>
        </TabsTrigger>
        <TabsTrigger value="análises" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>Análises</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visão-geral">
        <OverviewTabContent
          systemUpdatesData={systemUpdatesData}
          categoryData={categoryData}
          frequencyData={frequencyData}
          monitoringItems={monitoringItems}
          recentAlerts={recentAlerts}
        />
      </TabsContent>

      <TabsContent value="categorias">
        <CategoriesTabContent
          categoryData={categoryData}
          radarData={radarData}
          responsibleData={responsibleData}
          monitoringItems={monitoringItems}
        />
      </TabsContent>

      <TabsContent value="atualizações">
        <UpdatesTabContent
          systemUpdatesData={systemUpdatesData}
          recentReports={recentReports}
          monitoringItems={monitoringItems}
        />
      </TabsContent>

      <TabsContent value="análises">
        <AnalysisTabContent
          monitoringItems={monitoringItems}
          analysisStats={analysisStats}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChartsTabs;
