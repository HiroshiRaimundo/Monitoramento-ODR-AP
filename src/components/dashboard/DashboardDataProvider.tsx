
import React, { useMemo, useState } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { getCategoryData, getFrequencyData, getResponsibleData, getRadarData, getAnalysisTypeStats } from "./DashboardUtils";
import { toast } from "@/hooks/use-toast";

interface DashboardDataProviderProps {
  monitoringItems: MonitoringItem[];
  children: (data: {
    filteredMonitoringItems: MonitoringItem[];
    selectedMonitoring: string;
    setSelectedMonitoring: (value: string) => void;
    categoryData: ReturnType<typeof getCategoryData>;
    frequencyData: ReturnType<typeof getFrequencyData>;
    responsibleData: ReturnType<typeof getResponsibleData>;
    radarData: ReturnType<typeof getRadarData>;
    analysisStats: ReturnType<typeof getAnalysisTypeStats>;
    exportSelectedMonitoring: () => void;
  }) => React.ReactNode;
}

const DashboardDataProvider: React.FC<DashboardDataProviderProps> = ({ 
  monitoringItems,
  children 
}) => {
  // Estado para filtro de monitoramento individual
  const [selectedMonitoring, setSelectedMonitoring] = useState<string>("todos");

  // Filtrar itens de monitoramento com base na seleção
  const filteredMonitoringItems = useMemo(() => {
    if (!monitoringItems || monitoringItems.length === 0) return [];
    if (selectedMonitoring === "todos") return monitoringItems;
    
    const filtered = monitoringItems.filter(item => item.id === selectedMonitoring);
    return filtered.length > 0 ? filtered : [];
  }, [monitoringItems, selectedMonitoring]);

  // Preparar estatísticas derivadas dos dados de monitoramento filtrados
  const categoryData = useMemo(() => getCategoryData(filteredMonitoringItems), [filteredMonitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(filteredMonitoringItems), [filteredMonitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(filteredMonitoringItems), [filteredMonitoringItems]);
  const radarData = useMemo(() => getRadarData(filteredMonitoringItems), [filteredMonitoringItems]);
  const analysisStats = useMemo(() => getAnalysisTypeStats(), []);

  // Função para exportar dados do monitoramento selecionado
  const exportSelectedMonitoring = () => {
    try {
      const dataToExport = selectedMonitoring === "todos" ? monitoringItems : filteredMonitoringItems;
      
      if (!dataToExport || dataToExport.length === 0) {
        toast({
          title: "Sem dados para exportar",
          description: "Não há dados disponíveis para exportação.",
          variant: "destructive",
        });
        return;
      }

      const dataStr = JSON.stringify(dataToExport, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const fileName = selectedMonitoring === "todos" 
        ? 'todos-monitoramentos.json' 
        : `monitoramento-${filteredMonitoringItems[0]?.name.replace(/\s+/g, '-').toLowerCase() || 'selecionado'}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', fileName);
      linkElement.click();
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {children({
        filteredMonitoringItems,
        selectedMonitoring,
        setSelectedMonitoring,
        categoryData,
        frequencyData,
        responsibleData,
        radarData,
        analysisStats,
        exportSelectedMonitoring
      })}
    </>
  );
};

export default DashboardDataProvider;
