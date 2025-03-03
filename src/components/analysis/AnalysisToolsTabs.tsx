
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutomatedAnalysis from "./AutomatedAnalysis";
import PandasScriptsTab from "./tabs/PandasScriptsTab";
import JupyterNotebookTab from "./tabs/JupyterNotebookTab";
import PowerBITab from "./tabs/PowerBITab";
import { MonitoringItem } from "./utils/analysisUtils";

interface AnalysisToolsTabsProps {
  items: MonitoringItem[];
}

const AnalysisToolsTabs: React.FC<AnalysisToolsTabsProps> = ({ items }) => {
  const [activeTab, setActiveTab] = React.useState("auto");
  const [processingItem, setProcessingItem] = React.useState<string | null>(null);
  const [processedItems, setProcessedItems] = React.useState<Record<string, boolean>>({});
  
  const processItem = (itemId: string) => {
    setProcessingItem(itemId);
    
    // Simulação de processamento automático
    setTimeout(() => {
      setProcessingItem(null);
      setProcessedItems(prev => ({...prev, [itemId]: true}));
    }, 2000);
  };

  return (
    <Card className="mt-6 bg-white/95">
      <CardHeader className="border-b border-green-100">
        <CardTitle className="text-green-800">Análise de Dados Automatizada</CardTitle>
        <CardDescription>
          Ferramentas para processamento e visualização de dados
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-green-50">
            <TabsTrigger value="auto">Análise Automática</TabsTrigger>
            <TabsTrigger value="pandas">Scripts Python</TabsTrigger>
            <TabsTrigger value="jupyter">Jupyter Notebook</TabsTrigger>
            <TabsTrigger value="powerbi">Power BI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auto">
            <AutomatedAnalysis items={items} />
          </TabsContent>
          
          <TabsContent value="pandas" className="space-y-4">
            <PandasScriptsTab 
              items={items} 
              processingItem={processingItem} 
              processedItems={processedItems} 
              onProcessItem={processItem} 
            />
          </TabsContent>
          
          <TabsContent value="jupyter" className="space-y-4">
            <JupyterNotebookTab items={items} />
          </TabsContent>
          
          <TabsContent value="powerbi" className="space-y-4">
            <PowerBITab items={items} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalysisToolsTabs;
