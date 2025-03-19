
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface MonitoringHeaderProps {
  itemCount: number;
  uniqueResponsibles: string[];
  responsibleFilter: string;
  onFilterChange: (responsible: string) => void;
}

const MonitoringHeader: React.FC<MonitoringHeaderProps> = ({
  itemCount,
  uniqueResponsibles,
  responsibleFilter,
  onFilterChange
}) => {
  return (
    <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-forest-700">Monitoramentos Ativos</CardTitle>
          <span className="text-sm bg-forest-600/10 text-forest-700 px-2 py-1 rounded-full font-medium">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-forest-600" />
          <label htmlFor="responsibleFilter" className="text-sm text-forest-700 font-medium">
            Filtrar por responsável:
          </label>
          <select
            id="responsibleFilter"
            className="h-9 rounded-md border border-forest-200 bg-white px-3 py-1 text-sm ring-offset-background focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
            value={responsibleFilter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="">Todos</option>
            {uniqueResponsibles.map((responsible, index) => (
              <option key={index} value={responsible}>
                {responsible}
              </option>
            ))}
          </select>
        </div>
      </div>
    </CardHeader>
  );
};

export default MonitoringHeader;
