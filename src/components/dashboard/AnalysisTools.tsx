
import React from "react";
import { Button } from "@/components/ui/button";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { BarChart4, LineChart, PieChart, FileBarChart2, Filter, Layers, ArrowRightLeft, AreaChart, Table, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
