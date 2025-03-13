
import React, { useMemo } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardControls from "./DashboardControls";
import MonitoringStatsGrid from "./MonitoringStatsGrid";
import ChartsTabs from "./ChartsTabs";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { mapToSystemUpdates } from "@/lib/chartUtils";
import { 
  getCategoryData, 
  getFrequencyData, 
  getResponsibleData, 
  getRadarData 
} from "./DashboardUtils";

// Definição da interface de props
interface InternalDashboardProps {
  data: {
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
  systemUpdatesData: { name: string; updates: number; }[];
}

const InternalDashboard: React.FC<InternalDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems,
  systemUpdatesData
}) => {
  // Preparar estatísticas derivadas dos dados de monitoramento
  const categoryData = useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = useMemo(() => getRadarData(monitoringItems), [monitoringItems]);
  
  // Prepare stats items for dashboard header
  const headerStats = [
    { value: monitoringItems.length, label: "Monitoramentos Ativos" },
    { value: Array.from(new Set(monitoringItems.map(item => item.category))).length, label: "Categorias" },
    { value: 128, label: "Coletas na Semana" }
  ];

  // Obter dados de atualizações processados corretamente para o SystemUpdatesChart
  const processedUpdatesData = useMemo(() => {
    // Utilizamos os dados já processados fornecidos pelas props
    return systemUpdatesData;
  }, [systemUpdatesData]);

  // Calcular estatísticas sobre os tipos de análise ativos para cada monitoramento
  // Normalmente isso viria da persistência real das configurações
  const analysisStats = {
    contentAnalysis: monitoringItems.filter(item => item.category === "indicadores").length,
    sentimentAnalysis: monitoringItems.filter(item => item.category === "legislacao").length,
    crossAnalysis: monitoringItems.filter(item => item.keywords?.includes("comparativo")).length,
    nlpAnalysis: monitoringItems.filter(item => item.keywords?.includes("nlp") || item.keywords?.includes("linguagem natural")).length
  };

  return (
    <div className="grid gap-6 font-poppins">
      {/* Cabeçalho */}
      <DashboardHeader 
        title="Análise de Dados"
        description="Acompanhamento detalhado dos monitoramentos e análises internas"
        statsItems={headerStats}
      />

      {/* Filtros */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {/* Grade de estatísticas */}
      <MonitoringStatsGrid 
        totalMonitorings={monitoringItems.length}
        activeSpiders={monitoringItems.filter(item => item.category === "api").length}
        pendingUpdates={12}
        lastUpdateDate="10/05/2024"
      />

      {/* Conteúdo em abas - Passamos todos os dados processados para o componente de abas */}
      <ChartsTabs 
        monitoringItems={monitoringItems}
        categoryData={categoryData}
        frequencyData={frequencyData}
        responsibleData={responsibleData}
        radarData={radarData}
        systemUpdatesData={processedUpdatesData}
        analysisStats={analysisStats}
      />
    </div>
  );
};

export default InternalDashboard;
