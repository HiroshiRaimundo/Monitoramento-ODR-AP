
import React from "react";
import MonitoringForm from "@/components/monitoring/MonitoringForm";
import MonitoringList from "@/components/monitoring/MonitoringList";
import { MonitoringItemType } from "@/components/monitoring/types";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ManagementTabProps {
  monitoringForm: UseFormReturn<any>;
  monitoringItems: MonitoringItemType[];
  handleAddMonitoring: (data: Omit<MonitoringItemType, "id">) => void;
  handleDeleteMonitoring: (id: string) => void;
  isLoading: boolean;
  uniqueResponsibles: string[];
  responsibleFilter: string;
  setResponsibleFilter: (responsible: string) => void;
  uniqueFileTypes?: string[];
  fileTypeFilter?: string;
  setFileTypeFilter?: (fileType: string) => void;
}

const ManagementTab: React.FC<ManagementTabProps> = ({
  monitoringForm,
  monitoringItems,
  handleAddMonitoring,
  handleDeleteMonitoring,
  isLoading,
  uniqueResponsibles,
  responsibleFilter,
  setResponsibleFilter,
  uniqueFileTypes = [],
  fileTypeFilter = "",
  setFileTypeFilter = () => {}
}) => {
  return (
    <div className="grid gap-6">
      <MonitoringForm 
        form={monitoringForm} 
        onSubmit={handleAddMonitoring} 
      />
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre monitoramentos por responsável ou tipo de arquivo</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Responsável
            </label>
            <Select
              value={responsibleFilter}
              onValueChange={setResponsibleFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os responsáveis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os responsáveis</SelectItem>
                {uniqueResponsibles.map((responsible) => (
                  <SelectItem key={responsible} value={responsible}>
                    {responsible}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {uniqueFileTypes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por Tipo de Arquivo
              </label>
              <Select
                value={fileTypeFilter}
                onValueChange={setFileTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  {uniqueFileTypes.map((fileType) => (
                    <SelectItem key={fileType} value={fileType}>
                      {fileType === 'html' ? 'HTML (Página Web)' : 
                       fileType === 'pdf' ? 'PDF (Documento)' : 
                       fileType === 'json' ? 'JSON (Dados)' : 
                       fileType === 'xml' ? 'XML (Dados)' : 
                       fileType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>
      
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
