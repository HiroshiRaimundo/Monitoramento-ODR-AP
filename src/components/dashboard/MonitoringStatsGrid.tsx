
import React, { useMemo } from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { Clock, Globe, Database, Users } from "lucide-react";

interface MonitoringStatsGridProps {
  monitoringItems: MonitoringItem[];
}

const MonitoringStatsGrid: React.FC<MonitoringStatsGridProps> = ({ monitoringItems }) => {
  // Calcular estatísticas
  const stats = useMemo(() => {
    const categories = new Set(monitoringItems.map(item => item.category));
    const responsibles = new Set(
      monitoringItems
        .map(item => item.responsible)
        .filter(resp => resp !== undefined && resp !== null)
    );
    
    // Contagem por frequência
    const frequencyCounts: {[key: string]: number} = {};
    monitoringItems.forEach(item => {
      if (frequencyCounts[item.frequency]) {
        frequencyCounts[item.frequency]++;
      } else {
        frequencyCounts[item.frequency] = 1;
      }
    });
    
    // Frequência mais comum
    let mostCommonFrequency = "N/A";
    let maxCount = 0;
    for (const [freq, count] of Object.entries(frequencyCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostCommonFrequency = freq;
      }
    }
    
    return {
      totalSites: monitoringItems.length,
      categories: categories.size,
      responsibles: responsibles.size,
      mostCommonFrequency
    };
  }, [monitoringItems]);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Globe className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700">{stats.totalSites}</div>
          <div className="text-xs text-forest-600">Sites Monitorados</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Database className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700">{stats.categories}</div>
          <div className="text-xs text-forest-600">Categorias</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Clock className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700 capitalize">{stats.mostCommonFrequency}</div>
          <div className="text-xs text-forest-600">Frequência Mais Comum</div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-forest-50 p-3 rounded-lg shadow-sm">
        <Users className="h-8 w-8 text-forest-600" />
        <div>
          <div className="text-2xl font-bold text-forest-700">{stats.responsibles}</div>
          <div className="text-xs text-forest-600">Responsáveis</div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringStatsGrid;
