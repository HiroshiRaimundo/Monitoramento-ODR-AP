
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Database } from "lucide-react";

interface DashboardControlsProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  totalItems: number;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({ 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  totalItems 
}) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700">Controles do Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4 p-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-forest-600" />
          <label htmlFor="timeRange" className="text-sm font-medium text-forest-700 whitespace-nowrap">Período:</label>
          <select 
            id="timeRange"
            className="rounded-md border border-forest-200 p-2 bg-white text-forest-800 focus:ring-forest-500 focus:border-forest-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="anual">Anual</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between flex-1">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-forest-600" />
            <span className="text-sm text-forest-700">
              Total de monitoramentos: <strong className="text-forest-800">{totalItems}</strong>
            </span>
          </div>
          
          {isAuthenticated && (
            <Button 
              onClick={handleExport} 
              className="bg-forest-600 hover:bg-forest-700 text-white flex items-center gap-2"
            >
              <Download size={18} />
              Exportar Dados
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardControls;
