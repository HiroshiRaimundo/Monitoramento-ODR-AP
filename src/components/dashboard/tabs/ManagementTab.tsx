
import React from "react";
import { MonitoringTabProps } from "../types";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/MonitoringList";

const ManagementTab: React.FC<MonitoringTabProps> = ({ 
  monitoringItems,
  monitoringForm,
  handleAddMonitoring,
  handleDeleteMonitoring,
  isLoading,
  uniqueResponsibles = [],
  responsibleFilter = "",
  setResponsibleFilter = () => {}
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
        uniqueResponsibles={[...new Set(monitoringItems.map(item => item.responsible))].filter(Boolean) as string[]}
        responsibleFilter={responsibleFilter}
        onFilterChange={setResponsibleFilter}
      />
    </div>
  );
};

export default ManagementTab;
