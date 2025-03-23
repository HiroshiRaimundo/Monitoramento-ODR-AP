
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Database, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DashboardControlsProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  totalItems: number;
  isPublic?: boolean;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({ 
  timeRange, 
  setTimeRange, 
  handleExport, 
  isAuthenticated,
  totalItems,
  isPublic = false
}) => {
  const handleExportWithToast = () => {
    try {
      handleExport();
      toast({
        title: "Exportação concluída",
        description: "Os dados foram exportados com sucesso.",
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden border-forest-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white py-3">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-forest-600" />
          <CardTitle className="text-forest-700 font-poppins text-base">Filtros e Controles</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4 p-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-forest-600" />
          <label htmlFor="timeRange" className="text-sm font-medium text-forest-700 whitespace-nowrap">Período:</label>
          <select 
            id="timeRange"
            className="rounded-md border border-forest-200 p-2 bg-white text-forest-800 focus:ring-forest-500 focus:border-forest-500 font-poppins"
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
            <span className="text-sm text-forest-700 font-poppins">
              Total de {isPublic ? "estudos" : "monitoramentos"}: <strong className="text-forest-800">{totalItems}</strong>
            </span>
          </div>
          
          {isAuthenticated && !isPublic && (
            <Button 
              onClick={handleExportWithToast} 
              className="bg-forest-600 hover:bg-forest-700 text-white flex items-center gap-2 font-poppins"
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
