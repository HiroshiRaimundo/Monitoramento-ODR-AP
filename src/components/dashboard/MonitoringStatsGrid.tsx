
import React, { useMemo } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { Clock, Globe, Database, Users } from "lucide-react";

interface MonitoringStatsGridProps {
  totalMonitorings: number;
  activeSpiders: number;
  pendingUpdates: number;
  lastUpdateDate: string;
}

const MonitoringStatsGrid: React.FC<MonitoringStatsGridProps> = ({ 
  totalMonitorings,
  activeSpiders,
  pendingUpdates,
  lastUpdateDate
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Globe className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700">{totalMonitorings}</div>
          <div className="text-xs text-forest-600">Sites Monitorados</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Database className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700">{activeSpiders}</div>
          <div className="text-xs text-forest-600">Monitoramentos Ativos</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Clock className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700">{pendingUpdates}</div>
          <div className="text-xs text-forest-600">Atualizações Pendentes</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Users className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700">{lastUpdateDate}</div>
          <div className="text-xs text-forest-600">Última Atualização</div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringStatsGrid;
