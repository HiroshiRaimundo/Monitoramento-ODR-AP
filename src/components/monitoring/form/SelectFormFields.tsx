
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormFieldWrapper from "./FormFieldWrapper";

interface SelectFormFieldsProps {
  form: UseFormReturn<any>;
}

const SelectFormFields: React.FC<SelectFormFieldsProps> = ({ form }) => {
  return (
    <>
      <FormFieldWrapper
        form={form}
        name="category"
        label="Categoria"
      >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="governo">Governo</SelectItem>
            <SelectItem value="diario_oficial">Diário Oficial</SelectItem>
            <SelectItem value="indicadores">Indicadores</SelectItem>
            <SelectItem value="legislacao">Legislação</SelectItem>
            <SelectItem value="api">API</SelectItem>
          </SelectContent>
        </Select>
      </FormFieldWrapper>

      <FormFieldWrapper
        form={form}
        name="frequency"
        label="Frequência de Atualização"
      >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma frequência" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diario">Diário</SelectItem>
            <SelectItem value="semanal">Semanal</SelectItem>
            <SelectItem value="quinzenal">Quinzenal</SelectItem>
            <SelectItem value="mensal">Mensal</SelectItem>
          </SelectContent>
        </Select>
      </FormFieldWrapper>

      <FormFieldWrapper
        form={form}
        name="file_type"
        label="Tipo de Arquivo"
        description="Para monitoramentos de Diários Oficiais, geralmente são arquivos PDF"
      >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de arquivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML (Página Web)</SelectItem>
            <SelectItem value="pdf">PDF (Documento)</SelectItem>
            <SelectItem value="json">JSON (Dados estruturados)</SelectItem>
            <SelectItem value="xml">XML (Dados estruturados)</SelectItem>
          </SelectContent>
        </Select>
      </FormFieldWrapper>
    </>
  );
};

export default SelectFormFields;
