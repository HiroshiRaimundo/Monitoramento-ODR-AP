
import React from "react";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { MonitoringItem } from "@/hooks/useMonitoring";
import { BarChart4, LineChart, PieChart, FileBarChart2, Filter, Layers, ArrowRightLeft } from "lucide-react";

interface AnalysisToolsProps {
  monitoringItems: MonitoringItem[];
}

const AnalysisTools: React.FC<AnalysisToolsProps> = ({ monitoringItems }) => {
  const hasMonitorings = monitoringItems.length > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          className="flex items-center justify-start gap-2 p-4 h-auto"
          disabled={!hasMonitorings}
        >
          <BarChart4 size={18} className="text-forest-600" />
          <div className="text-left">
            <p className="font-medium">Análise Estatística</p>
            <p className="text-xs text-muted-foreground">Gerar estatísticas básicas</p>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center justify-start gap-2 p-4 h-auto"
          disabled={!hasMonitorings}
        >
          <LineChart size={18} className="text-forest-600" />
          <div className="text-left">
            <p className="font-medium">Análise Temporal</p>
            <p className="text-xs text-muted-foreground">Tendências ao longo do tempo</p>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center justify-start gap-2 p-4 h-auto"
          disabled={!hasMonitorings}
        >
          <PieChart size={18} className="text-forest-600" />
          <div className="text-left">
            <p className="font-medium">Análise Proporcional</p>
            <p className="text-xs text-muted-foreground">Distribuição de dados</p>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center justify-start gap-2 p-4 h-auto"
          disabled={!hasMonitorings}
        >
          <FileBarChart2 size={18} className="text-forest-600" />
          <div className="text-left">
            <p className="font-medium">Relatório Completo</p>
            <p className="text-xs text-muted-foreground">Exportar análise detalhada</p>
          </div>
        </Button>
=======
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
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937
      </div>
      
      <div className="bg-forest-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-forest-800 mb-2 flex items-center gap-1">
          <Filter size={16} />
          <span>Análises avançadas</span>
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          <Button 
            variant="ghost" 
            className="justify-start text-forest-700 hover:text-forest-800 hover:bg-forest-100/60"
            disabled={!hasMonitorings}
          >
            <Layers size={16} className="mr-2" />
            <span>Análise cruzada de dados</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start text-forest-700 hover:text-forest-800 hover:bg-forest-100/60"
            disabled={!hasMonitorings}
          >
            <ArrowRightLeft size={16} className="mr-2" />
            <span>Comparação entre monitoramentos</span>
          </Button>
        </div>
      </div>
      
      {!hasMonitorings && (
        <div className="text-center p-4 text-muted-foreground text-sm">
          Adicione monitoramentos para desbloquear as ferramentas de análise.
        </div>
      )}
    </div>
  );
};

export default AnalysisTools;
