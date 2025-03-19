
import React from "react";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/monitoring/MonitoringList";
import { MonitoringItemType } from "@/components/monitoring/types";
import { UseFormReturn } from "react-hook-form";

interface ManagementTabProps {
  monitoringForm: UseFormReturn<any>;
  monitoringItems: MonitoringItemType[];
  handleAddMonitoring: (data: Omit<MonitoringItemType, "id">) => void;
  handleDeleteMonitoring: (id: string) => void;
  isLoading: boolean;
  uniqueResponsibles: string[];
  responsibleFilter: string;
  setResponsibleFilter: (responsible: string) => void;
}

const ManagementTab: React.FC<ManagementTabProps> = ({
  monitoringForm,
  monitoringItems,
  handleAddMonitoring,
  handleDeleteMonitoring,
  isLoading,
  uniqueResponsibles,
  responsibleFilter,
  setResponsibleFilter
}) => {
  return (
    <div className="grid gap-6">
      <MonitoringForm 
        form={monitoringForm} 
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
  );
};

export default ManagementTab;
