
import React, { useMemo, useState } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { getCategoryData, getFrequencyData, getResponsibleData, getRadarData, getAnalysisTypeStats } from "./DashboardUtils";

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
    if (selectedMonitoring === "todos") return monitoringItems;
    return monitoringItems.filter(item => item.id === selectedMonitoring);
  }, [monitoringItems, selectedMonitoring]);

  // Preparar estatísticas derivadas dos dados de monitoramento filtrados
  const categoryData = useMemo(() => getCategoryData(filteredMonitoringItems), [filteredMonitoringItems]);
  const frequencyData = useMemo(() => getFrequencyData(filteredMonitoringItems), [filteredMonitoringItems]);
  const responsibleData = useMemo(() => getResponsibleData(filteredMonitoringItems), [filteredMonitoringItems]);
  const radarData = useMemo(() => getRadarData(filteredMonitoringItems), [filteredMonitoringItems]);
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
