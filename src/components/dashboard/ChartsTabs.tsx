
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { RecentUpdate, AnalysisStats } from "./types/dashboardTypes";
import OverviewTabContent from "./tabs/OverviewTabContent";
import CategoriesTabContent from "./tabs/CategoriesTabContent";
import UpdatesTabContent from "./tabs/UpdatesTabContent";
import AnalysisTabContent from "./tabs/AnalysisTabContent";

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

const ChartsTabs: React.FC<ChartsTabsProps> = ({ 
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
  recentAlerts = [],
  recentReports = []
}: ChartsTabsProps) => {
  const mockUpdates: RecentUpdate[] = [
    { 
      id: "1", 
      title: "Portal de Transparência", 
      description: "Atualização de dados fiscais", 
      date: "10/05/2024", 
      type: "content", 
      site: "Portal da Transparência", 
      status: "success",
      isDemo: true
    },
    { 
      id: "2", 
      title: "IBGE - Indicadores", 
      description: "Novos dados demográficos", 
      date: "09/05/2024", 
      type: "data", 
      site: "IBGE", 
      status: "pending",
      isDemo: true
    },
    { 
      id: "3", 
      title: "Diário Oficial", 
      description: "Publicação de nova legislação", 
      date: "08/05/2024", 
      type: "alert", 
      site: "Diário Oficial", 
      status: "warning",
      isDemo: true
    }
  ];

  const displayAlerts = recentAlerts.length > 0 ? recentAlerts : mockUpdates;
  const displayReports = recentReports.length > 0 ? recentReports : mockUpdates;

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
          monitoringItems={monitoringItems}
          categoryData={categoryData}
          frequencyData={frequencyData}
          systemUpdatesData={systemUpdatesData}
          displayAlerts={displayAlerts}
        />
      </TabsContent>

      <TabsContent value="categorias">
        <CategoriesTabContent
          monitoringItems={monitoringItems}
          categoryData={categoryData}
          responsibleData={responsibleData}
          radarData={radarData}
        />
      </TabsContent>

      <TabsContent value="atualizações">
        <UpdatesTabContent
          systemUpdatesData={systemUpdatesData}
          displayReports={displayReports}
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
