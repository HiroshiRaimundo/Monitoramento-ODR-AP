
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";
import { MonitoringItem } from "@/hooks/useMonitoring";

interface GerenciamentoTabContentProps {
  isAuthenticated: boolean;
  form: any;
  handleAddMonitoring: (data: Omit<MonitoringItem, "id">) => void;
  monitoringItems: MonitoringItem[];
  handleDeleteMonitoring: (id: string) => void;
  isLoading: boolean;
  uniqueResponsibles: string[];
  responsibleFilter: string;
  setResponsibleFilter: (responsible: string) => void;
}

const GerenciamentoTabContent: React.FC<GerenciamentoTabContentProps> = ({ 
  isAuthenticated,
  form,
  handleAddMonitoring,
  monitoringItems,
  handleDeleteMonitoring,
  isLoading,
  uniqueResponsibles,
  responsibleFilter,
  setResponsibleFilter
}) => {
  if (!isAuthenticated) return null;
  
  return (
    <TabsContent value="gerenciamento">
      <div className="grid gap-6">
        <MonitoringForm 
          form={form} 
          onSubmit={handleAddMonitoring} 
        />
        <MonitoringList 
          items={monitoringItems} 
          onDelete={handleDeleteMonitoring} 
          isLoading={isLoading}
          uniqueResponsibles={uniqueResponsibles}
          responsibleFilter={responsibleFilter}
          onFilterChange={setResponsibleFilter}
        />
      </div>
    </TabsContent>
  );
};

export default GerenciamentoTabContent;
