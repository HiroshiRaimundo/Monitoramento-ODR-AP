
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import MonitoringMetrics from "./MonitoringMetrics";
import BasicFormFields from "./form/BasicFormFields";
import SelectFormFields from "./form/SelectFormFields";
import OptionalFormFields from "./form/OptionalFormFields";

interface MonitoringItem {
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
  file_type?: string;
}

interface MonitoringFormInputsProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
}

const MonitoringFormInputs: React.FC<MonitoringFormInputsProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BasicFormFields form={form} />
        <SelectFormFields form={form} />
        <OptionalFormFields form={form} />

        <div className="mt-8">
          <MonitoringMetrics />
        </div>

        <Button type="submit" className="mt-6">Adicionar Monitoramento</Button>
      </form>
    </Form>
  );
};

export default MonitoringFormInputs;
