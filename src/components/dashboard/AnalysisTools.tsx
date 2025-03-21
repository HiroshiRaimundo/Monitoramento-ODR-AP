
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, PieChart, AreaChart, Table, Layers, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MonitoringItem } from "@/hooks/useMonitoring";

interface AnalysisToolsProps {
  monitoringItems: MonitoringItem[];
}

const AnalysisTools: React.FC<AnalysisToolsProps> = ({ monitoringItems }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
          <BarChart className="h-8 w-8 mb-1 text-forest-600" />
          <span className="text-xs text-center">Análise de Barras</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
          <LineChart className="h-8 w-8 mb-1 text-forest-600" />
          <span className="text-xs text-center">Tendências</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
          <PieChart className="h-8 w-8 mb-1 text-forest-600" />
          <span className="text-xs text-center">Distribuição</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
          <AreaChart className="h-8 w-8 mb-1 text-forest-600" />
          <span className="text-xs text-center">Comparativo</span>
        </Button>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-forest-700">Dados Disponíveis para Análise</h3>
        <div className="bg-forest-50 p-3 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-forest-800">Monitoramentos Ativos</span>
            <span className="text-forest-700 text-sm">{monitoringItems.length} itens</span>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" className="h-8 text-xs flex items-center gap-1">
              <Table className="h-3 w-3" />
              <span>Tabular</span>
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs flex items-center gap-1">
              <Layers className="h-3 w-3" />
              <span>Agrupar</span>
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground pt-2">
          {monitoringItems.length === 0 ? 
            "Nenhum monitoramento disponível para análise." : 
            "Selecione um método de análise para começar a explorar seus dados."}
        </div>
      </div>
    </div>
  );
};

export default AnalysisTools;
