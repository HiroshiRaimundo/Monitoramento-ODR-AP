
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";

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
    <Card className="eco-card-accent amazon-gradient-light">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-primary-foreground">
          Sistema de Monitoramento Regional
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4 pt-4">
        <div className="flex items-center gap-2 bg-white/80 p-2 rounded-md shadow-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <label htmlFor="timeRange" className="text-sm whitespace-nowrap">Período:</label>
          <select 
            id="timeRange"
            className="rounded-md border border-border bg-transparent p-1.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
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
          <div className="flex items-center gap-2 bg-white/80 p-2 rounded-md shadow-sm">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-sm">
              Total de monitoramentos: <strong className="text-primary">{totalItems}</strong>
            </span>
          </div>
          
          {isAuthenticated && (
            <Button onClick={handleExport} className="bg-primary hover:bg-primary/90 gap-2">
              <Download className="h-4 w-4" />
              Exportar Dados
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardControls;
