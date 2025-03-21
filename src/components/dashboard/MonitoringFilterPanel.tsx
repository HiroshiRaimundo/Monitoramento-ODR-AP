
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { FilterPanelProps } from "./types/dashboardTypes";

const MonitoringFilterPanel: React.FC<FilterPanelProps> = ({
  selectedMonitoring,
  setSelectedMonitoring,
  monitoringItems,
  exportSelectedMonitoring
}) => {
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
              onValueChange={setSelectedMonitoring}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um monitoramento" />
              </SelectTrigger>
              <SelectContent>
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
            onClick={exportSelectedMonitoring}
            className="bg-forest-600 hover:bg-forest-700 flex items-center gap-2"
          >
            <Download size={16} />
            Exportar Dados
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringFilterPanel;
