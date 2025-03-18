
import React, { useMemo, useState } from "react";
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
  getRadarData,
  getAnalysisTypeStats
} from "./DashboardUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Interface para RecentUpdate
export interface RecentUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  site: string;
  status: string;
}

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
  recentAlerts?: RecentUpdate[];
  recentReports?: RecentUpdate[];
}

const InternalDashboard: React.FC<InternalDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  monitoringItems,
  systemUpdatesData,
  recentAlerts = [],
  recentReports = []
}) => {
  // Estado para filtro de monitoramento individual
  const [selectedMonitoring, setSelectedMonitoring] = useState<string>("todos");

  // Filtrar itens de monitoramento com base na seleção
  const filteredMonitoringItems = useMemo(() => {
    if (selectedMonitoring === "todos") return monitoringItems;
    return monitoringItems.filter(item => item.id === selectedMonitoring);
  }, [monitoringItems, selectedMonitoring]);

  // Preparar estatísticas derivadas dos dados de monitoramento filtrados
  const categoryData = useMemo(() => getCategoryData(filteredMonitoringItems), [filteredMonitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(filteredMonitoringItems), [filteredMonitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(filteredMonitoringItems), [filteredMonitoringItems]);
  const radarData = useMemo(() => getRadarData(filteredMonitoringItems), [filteredMonitoringItems]);
  
  // Prepare stats items for dashboard header
  const headerStats = [
    { value: monitoringItems.length, label: "Monitoramentos Ativos" },
    { value: Array.from(new Set(monitoringItems.map(item => item.category))).length, label: "Categorias" },
    { value: 128, label: "Coletas na Semana" }
  ];

  // Calcular estatísticas sobre os tipos de análise ativos para cada monitoramento
  const analysisStats = useMemo(() => getAnalysisTypeStats(), []);

  // Função para exportar dados do monitoramento selecionado
  const exportSelectedMonitoring = () => {
    const dataToExport = selectedMonitoring === "todos" ? monitoringItems : filteredMonitoringItems;
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const fileName = selectedMonitoring === "todos" 
      ? 'todos-monitoramentos.json' 
      : `monitoramento-${filteredMonitoringItems[0]?.name.replace(/\s+/g, '-').toLowerCase() || 'selecionado'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
  };

  return (
    <div className="grid gap-6 font-poppins">
      {/* Cabeçalho */}
      <DashboardHeader 
        title="Análise de Dados"
        description="Acompanhamento detalhado dos monitoramentos e análises internas"
        statsItems={headerStats}
      />

      {/* Filtro de monitoramento individual */}
      <Card className="border-forest-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
            <Filter size={18} className="text-forest-600" />
            Filtrar por Monitoramento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2">
              <Select 
                value={selectedMonitoring} 
                onValueChange={setSelectedMonitoring}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um monitoramento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os monitoramentos</SelectItem>
                  {monitoringItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={exportSelectedMonitoring}
              className="bg-forest-600 hover:bg-forest-700 flex items-center gap-2"
            >
              <Download size={16} />
              Exportar Dados
            </Button>
          </div>
        </CardContent>
      </Card>

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
        totalMonitorings={filteredMonitoringItems.length}
        activeSpiders={filteredMonitoringItems.filter(item => item.category === "api").length}
        pendingUpdates={selectedMonitoring === "todos" ? 12 : 2}
        lastUpdateDate="10/05/2024"
      />

      {/* Conteúdo em abas - Passamos todos os dados processados para o componente de abas */}
      <ChartsTabs 
        monitoringItems={filteredMonitoringItems}
        categoryData={categoryData}
        frequencyData={frequencyData}
        responsibleData={responsibleData}
        radarData={radarData}
        systemUpdatesData={systemUpdatesData}
        analysisStats={analysisStats}
        recentAlerts={recentAlerts}
        recentReports={recentReports}
      />
    </div>
  );
};

export default InternalDashboard;
