
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { FilterPanelProps } from "./types/dashboardTypes";
import { toast } from "@/hooks/use-toast";

const MonitoringFilterPanel: React.FC<FilterPanelProps> = ({
  selectedMonitoring,
  setSelectedMonitoring,
  monitoringItems,
  exportSelectedMonitoring
}) => {
  const [isExporting, setIsExporting] = useState(false);

  // Safe guard against errors when no monitoring items are available
  const handleSelectionChange = (value: string) => {
    try {
      setSelectedMonitoring(value);
      toast({
        title: "Filtro aplicado",
        description: `Monitoramento "${value === 'todos' ? 'Todos' : monitoringItems.find(item => item.id === value)?.name || value}" selecionado.`,
      });
    } catch (error) {
      console.error("Error changing monitoring selection:", error);
      toast({
        title: "Erro ao filtrar",
        description: "Não foi possível aplicar o filtro selecionado.",
        variant: "destructive",
      });
    }
  };

  // Safe guard for export function
  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportSelectedMonitoring();
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
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="border-forest-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
          <Filter size={18} className="text-forest-600" />
          Filtrar por Monitoramento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/2">
            <Select 
              value={selectedMonitoring} 
              onValueChange={handleSelectionChange}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Selecione um monitoramento" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="todos">Todos os monitoramentos</SelectItem>
                {monitoringItems.map(item => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleExport} 
            className="bg-forest-600 hover:bg-forest-700 flex items-center gap-2"
            disabled={isExporting}
          >
            <Download size={16} />
            {isExporting ? "Exportando..." : "Exportar Dados"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringFilterPanel;
