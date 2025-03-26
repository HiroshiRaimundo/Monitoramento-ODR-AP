
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
  return (
    <PublicDashboard
      data={simulatedMonthlyData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      isAuthenticated={isAuthenticated}
      studies={studies}
    />
  );
};

export default PublicTab;
