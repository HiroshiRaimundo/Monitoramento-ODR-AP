
import React from "react";

interface DashboardStatsProps {
  monitoringCount: number;
  categoryCount: number;
  collectionsPerWeek: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  monitoringCount,
  categoryCount,
  collectionsPerWeek
}) => {
  return [
    { value: monitoringCount, label: "Monitoramentos Ativos" },
    { value: categoryCount, label: "Categorias" },
    { value: collectionsPerWeek, label: "Coletas na Semana" }
  ];
};

export default DashboardStats;
