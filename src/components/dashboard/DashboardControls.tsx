
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card>
      <CardHeader>
        <CardTitle>Controles do Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="timeRange" className="text-sm whitespace-nowrap">Período:</label>
          <select 
            id="timeRange"
            className="rounded-md border p-2"
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
            <span className="text-sm text-muted-foreground">
              Total de monitoramentos: <strong>{totalItems}</strong>
            </span>
          </div>
          
          {isAuthenticated && <Button onClick={handleExport}>Exportar Dados</Button>}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardControls;
