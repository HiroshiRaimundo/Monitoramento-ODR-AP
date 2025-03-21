
import React, { useMemo } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import AnalysisTools from "./dashboard/AnalysisTools";
import DashboardControls from "./dashboard/DashboardControls";
import StudiesChart from "./dashboard/StudiesChart";
import CategoryChart from "./dashboard/CategoryChart";
import FrequencyChart from "./dashboard/FrequencyChart";
import ResearchersChart from "./dashboard/ResearchersChart";
import SourceTypeChart from "./dashboard/SourceTypeChart";
import SystemUpdatesChart from "./dashboard/SystemUpdatesChart";
import { 
  getCategoryData,
  getFrequencyData,
  getResponsibleData,
  getRadarData
} from "./dashboard/DashboardUtils";
import { mapToSystemUpdates } from "@/lib/chartUtils";

interface DashboardProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems
}) => {
  // Preparar dados para gráficos adicionais baseados nos monitoringItems
  const categoryData = useMemo(() => getCategoryData(monitoringItems), [monitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(monitoringItems), [monitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(monitoringItems), [monitoringItems]);
  const radarData = useMemo(() => getRadarData(monitoringItems), [monitoringItems]);

  // Converter dados para o formato correto de SystemUpdatesChart
  const systemUpdatesData = useMemo(() => mapToSystemUpdates(data), [data]);

  return (
    <div className="grid gap-6">
      {/* Filtros e Controles */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        totalItems={monitoringItems.length}
      />

      {/* Gráficos Principais - Layout em Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Evolução de Estudos - Gráfico de Linha */}
        <StudiesChart data={data} />

        {/* Distribuição por Categoria - Gráfico de Pizza */}
        <CategoryChart data={categoryData} />

        {/* Frequência de Atualização - Gráfico de Barras */}
        <FrequencyChart data={frequencyData} />
      </div>

      {/* Gráficos Secundários - 2 em uma linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição por Responsável - Gráfico de Barras */}
        <ResearchersChart data={responsibleData} />

        {/* Cobertura por Tipo - Gráfico Radar */}
        <SourceTypeChart data={radarData} />
      </div>

      {/* Atualizações do Sistema - Gráfico de Área */}
      <SystemUpdatesChart data={systemUpdatesData} />

      {/* Ferramentas de Análise - apenas para administradores */}
      {isAuthenticated && <AnalysisTools monitoringItems={monitoringItems} />}
    </div>
  );
};

export default Dashboard;
