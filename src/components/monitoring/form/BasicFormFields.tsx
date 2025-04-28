
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FormFieldWrapper from "./FormFieldWrapper";

interface BasicFormFieldsProps {
  form: UseFormReturn<any>;
}

const BasicFormFields: React.FC<BasicFormFieldsProps> = ({ form }) => {
  return (
    <>
      <FormFieldWrapper
        form={form}
        name="name"
        label="Nome do Monitoramento"
      >
        <Input placeholder="Ex: Diário Oficial da União - Seção 1" />
      </FormFieldWrapper>

      <FormFieldWrapper
        form={form}
        name="url"
        label="URL da Fonte"
      >
        <Input placeholder="https://www.in.gov.br/leiturajornal" />
      </FormFieldWrapper>

      <FormFieldWrapper
        form={form}
        name="api_url"
        label="URL da API (opcional)"
        description="Insira o endpoint da API para monitoramento via integração direta"
      >
        <Input placeholder="https://api.exemplo.com/dados" />
      </FormFieldWrapper>
    </>
  );
};

export default BasicFormFields;
