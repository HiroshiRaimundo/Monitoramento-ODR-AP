
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
  const stats = [
    { value: monitoringCount, label: "Monitoramentos Ativos" },
    { value: categoryCount, label: "Categorias" },
    { value: collectionsPerWeek, label: "Coletas na Semana" }
  ];
  
  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-forest-700">{stat.value}</div>
          <div className="text-sm text-forest-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
