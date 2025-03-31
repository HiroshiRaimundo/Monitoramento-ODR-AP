
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MonitoringMetrics from "./MonitoringMetrics";

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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Nome do Monitoramento</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Diário Oficial da União - Seção 1" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">URL da Fonte</FormLabel>
              <FormControl>
                <Input placeholder="https://www.in.gov.br/leiturajornal" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="api_url"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">URL da API (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="https://api.exemplo.com/dados" {...field} />
              </FormControl>
              <FormDescription>
                Insira o endpoint da API para monitoramento via integração direta
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Categoria</FormLabel>
              <FormControl>
                <Select 
                  defaultValue={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selecione">Selecione uma categoria</SelectItem>
                    <SelectItem value="governo">Governo</SelectItem>
                    <SelectItem value="diario_oficial">Diário Oficial</SelectItem>
                    <SelectItem value="indicadores">Indicadores</SelectItem>
                    <SelectItem value="legislacao">Legislação</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Frequência de Atualização</FormLabel>
              <FormControl>
                <Select 
                  defaultValue={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selecione">Selecione uma frequência</SelectItem>
                    <SelectItem value="diario">Diário</SelectItem>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quinzenal">Quinzenal</SelectItem>
                    <SelectItem value="mensal">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file_type"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Tipo de Arquivo</FormLabel>
              <FormControl>
                <Select 
                  defaultValue={field.value || "html"} 
                  onValueChange={field.onChange}
                >
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
              </FormControl>
              <FormDescription>
                Para monitoramentos de Diários Oficiais, geralmente são arquivos PDF
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Palavras-chave (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="licitação, contrato, portaria, edital" {...field} />
              </FormControl>
              <FormDescription>
                Separe as palavras-chave por vírgula. Para Diários Oficiais, estas palavras serão buscadas no texto do PDF.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Responsável</FormLabel>
              <FormControl>
                <Input placeholder="Nome do pesquisador ou responsável" {...field} />
              </FormControl>
              <FormDescription>
                Informe o nome do pesquisador responsável por este monitoramento
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Instituição</FormLabel>
              <FormControl>
                <Input placeholder="Nome da instituição do responsável" {...field} />
              </FormControl>
              <FormDescription>
                Informe a instituição à qual o responsável está vinculado
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="mt-8">
          <MonitoringMetrics />
        </div>

        <Button type="submit" className="mt-6">Adicionar Monitoramento</Button>
      </form>
    </Form>
  );
};

export default MonitoringFormInputs;
