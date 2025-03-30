
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
  file_type?: string; // Para indicar se é PDF, HTML, etc.
  created_at: string;
}

export const useMonitoring = () => {
  const [monitoringItems, setMonitoringItems] = useState<MonitoringItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responsibleFilter, setResponsibleFilter] = useState<string>("");
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("");
  const form = useForm<Omit<MonitoringItem, "id" | "created_at">>();

  const fetchMonitoringItems = async () => {
    try {
      const { data, error } = await supabase
        .from('monitoring_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Converter o formato do banco para o formato da aplicação
      const formattedItems = data.map(item => ({
        id: item.id,
        name: item.name,
        url: item.url,
        api_url: item.api_url,
        frequency: item.frequency,
        category: item.category,
        keywords: item.keywords,
        responsible: (item as any).responsible || null,
        institution: (item as any).institution || null,
        file_type: (item as any).file_type || 'html',
        created_at: item.created_at
      }));
      
      setMonitoringItems(formattedItems);
    } catch (error) {
      console.error('Erro ao buscar itens de monitoramento:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os monitoramentos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMonitoring = async (data: Omit<MonitoringItem, "id" | "created_at">) => {
    try {
      // Determinar automaticamente o tipo de arquivo com base na URL
      const fileType = data.url.toLowerCase().endsWith('.pdf') ? 'pdf' : 
                      (data.url.toLowerCase().includes('diariooficial') ? 'pdf' : 'html');
      
      // Inserir no Supabase
      const { data: newItem, error } = await supabase
        .from('monitoring_items')
        .insert({
          name: data.name,
          url: data.url,
          api_url: data.api_url || null,
          frequency: data.frequency,
          category: data.category,
          keywords: data.keywords || null,
          responsible: data.responsible || null,
          institution: data.institution || null,
          file_type: data.file_type || fileType
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Converter formato do banco para formato da aplicação
      const formattedItem: MonitoringItem = {
        id: newItem.id,
        name: newItem.name,
        url: newItem.url,
        api_url: newItem.api_url,
        frequency: newItem.frequency,
        category: newItem.category,
        keywords: newItem.keywords,
        responsible: (newItem as any).responsible || null,
        institution: (newItem as any).institution || null,
        file_type: (newItem as any).file_type || fileType,
        created_at: newItem.created_at
      };
      
      // Atualizar estado
      setMonitoringItems(prev => [formattedItem, ...prev]);
      form.reset();
      
      toast({
        title: "Item adicionado",
        description: `Monitoramento de ${data.name} foi configurado.`,
      });
    } catch (error) {
      console.error('Erro ao adicionar monitoramento:', error);
      toast({
        title: "Erro ao adicionar item",
        description: "Não foi possível adicionar o monitoramento.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMonitoring = async (id: string) => {
    try {
      const { error } = await supabase
        .from('monitoring_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setMonitoringItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: "Item removido",
        description: "O monitoramento foi removido com sucesso."
      });
    } catch (error) {
      console.error('Erro ao remover monitoramento:', error);
      toast({
        title: "Erro ao remover item",
        description: "Não foi possível remover o monitoramento.",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(monitoringItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'monitoramento-dados.json');
    linkElement.click();
  };

  // Obter lista única de responsáveis para o filtro
  const getUniqueResponsibles = () => {
    const responsibles = monitoringItems
      .map(item => item.responsible)
      .filter(responsible => responsible !== undefined && responsible !== null) as string[];
    
    return [...new Set(responsibles)];
  };

  // Obter lista única de tipos de arquivo para o filtro
  const getUniqueFileTypes = () => {
    const fileTypes = monitoringItems
      .map(item => item.file_type)
      .filter(fileType => fileType !== undefined && fileType !== null) as string[];
    
    return [...new Set(fileTypes)];
  };

  // Aplicar filtros aos itens de monitoramento
  const filteredMonitoringItems = monitoringItems.filter(item => {
    // Filtro por responsável
    const passesResponsibleFilter = !responsibleFilter || item.responsible === responsibleFilter;
    
    // Filtro por tipo de arquivo
    const passesFileTypeFilter = !fileTypeFilter || item.file_type === fileTypeFilter;
    
    return passesResponsibleFilter && passesFileTypeFilter;
  });

  return {
    monitoringItems: filteredMonitoringItems,
    allMonitoringItems: monitoringItems,
    isLoading,
    form,
    responsibleFilter,
    setResponsibleFilter,
    fileTypeFilter,
    setFileTypeFilter,
    getUniqueResponsibles,
    getUniqueFileTypes,
    fetchMonitoringItems,
    handleAddMonitoring,
    handleDeleteMonitoring,
    handleExport
  };
};

export type { MonitoringItem };
