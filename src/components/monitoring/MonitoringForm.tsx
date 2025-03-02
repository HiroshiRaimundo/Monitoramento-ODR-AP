
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import MonitoringFormInputs from "./MonitoringFormInputs";
import CodeExampleViewer from "./CodeExampleViewer";
import { spiderExamples } from "./code-examples";

// Make the interface explicit and ensure it includes the institution field
export interface MonitoringItem {
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
}

interface MonitoringFormProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
}

const MonitoringForm: React.FC<MonitoringFormProps> = ({ form, onSubmit }) => {
  const [activeSpider, setActiveSpider] = useState("transparencia");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Monitoramento</CardTitle>
        <CardDescription>
          Gerencie monitoramentos automáticos de fontes de dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="form">Adicionar Monitoramento</TabsTrigger>
            <TabsTrigger value="examples">Exemplos de Spiders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <MonitoringFormInputs form={form} onSubmit={onSubmit} />
          </TabsContent>
          
          <TabsContent value="examples">
            <CodeExampleViewer 
              examples={spiderExamples}
              activeExample={activeSpider}
              onExampleChange={setActiveSpider}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MonitoringForm;
