
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MonitoringItem {
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
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
                <Input placeholder="Ex: Índice de Desmatamento - Amazônia Legal" {...field} />
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
                <Input placeholder="https://dados.gov.br/exemplo" {...field} />
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
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="governo">Governo</option>
                  <option value="indicadores">Indicadores</option>
                  <option value="legislacao">Legislação</option>
                  <option value="api">API</option>
                </select>
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
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="">Selecione uma frequência</option>
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="quinzenal">Quinzenal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </FormControl>
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
                <Input placeholder="Desmatamento, meio ambiente, amazônia" {...field} />
              </FormControl>
              <FormDescription>
                Separe as palavras-chave por vírgula
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

        <Button type="submit">Adicionar Monitoramento</Button>
      </form>
    </Form>
  );
};

export default MonitoringFormInputs;
