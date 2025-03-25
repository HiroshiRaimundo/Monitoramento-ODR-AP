
import React from "react";
import PublicDashboard from "@/components/dashboard/PublicDashboard";
import { ResearchStudy } from "@/types/research";

interface PublicTabProps {
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
  isAuthenticated,
  studies,
  simulatedMonthlyData
}) => {
  return (
    <PublicDashboard
      data={simulatedMonthlyData}
      timeRange=""
      setTimeRange={() => {}}
      isAuthenticated={isAuthenticated}
      studies={studies}
    />
  );
};

export default PublicTab;
