
import React from "react";
import PublicDashboard from "@/components/dashboard/PublicDashboard";
import { ResearchStudy } from "@/types/research";

interface PublicTabProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  isAuthenticated: boolean;
  studies: ResearchStudy[];
  simulatedMonthlyData: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
}

const PublicTab: React.FC<PublicTabProps> = ({
  timeRange,
  setTimeRange,
  isAuthenticated,
  studies,
  simulatedMonthlyData
}) => {
  // Filtrar os dados com base no timeRange selecionado
  const filteredData = React.useMemo(() => {
    // Se não houver dados, retornar array vazio
    if (!simulatedMonthlyData.length) return [];
    
    const currentDate = new Date();
    let filteredData = [...simulatedMonthlyData];

    switch (timeRange) {
      case "diario":
        // Últimos 7 dias
        filteredData = simulatedMonthlyData.slice(-7);
        break;
      case "semanal":
        // Últimas 4 semanas
        filteredData = simulatedMonthlyData.slice(-4);
        break;
      case "mensal":
        // Últimos 6 meses
        filteredData = simulatedMonthlyData.slice(-6);
        break;
      case "anual":
        // Manter todos os dados (último ano)
        break;
      default:
        break;
    }

    return filteredData;
  }, [timeRange, simulatedMonthlyData]);

  return (
    <PublicDashboard
      data={filteredData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      isAuthenticated={isAuthenticated}
      studies={studies}
    />
  );
};

export default PublicTab;
