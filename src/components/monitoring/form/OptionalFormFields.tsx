
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormFieldWrapper from "./FormFieldWrapper";

interface OptionalFormFieldsProps {
  form: UseFormReturn<any>;
}

const OptionalFormFields: React.FC<OptionalFormFieldsProps> = ({ form }) => {
  return (
    <>
      <FormFieldWrapper
        form={form}
        name="keywords"
        label="Palavras-chave (opcional)"
        description="Separe as palavras-chave por vírgula. Para Diários Oficiais, estas palavras serão buscadas no texto do PDF."
      >
        <Input placeholder="licitação, contrato, portaria, edital" />
      </FormFieldWrapper>

      <FormFieldWrapper
        form={form}
        name="responsible"
        label="Responsável"
        description="Informe o nome do pesquisador responsável por este monitoramento"
      >
        <Input placeholder="Nome do pesquisador ou responsável" />
      </FormFieldWrapper>

      <FormFieldWrapper
        form={form}
        name="institution"
        label="Instituição"
        description="Informe a instituição à qual o responsável está vinculado"
      >
        <Input placeholder="Nome da instituição do responsável" />
      </FormFieldWrapper>
    </>
  );
};

export default OptionalFormFields;
