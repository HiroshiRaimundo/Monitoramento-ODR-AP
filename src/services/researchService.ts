
import { supabase } from "@/integrations/supabase/client";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { toast } from "@/hooks/use-toast";
import { geocodeLocation } from "@/utils/geocoder";

// Buscar todos os estudos
export const fetchResearchStudies = async (): Promise<ResearchStudy[]> => {
  try {
    const { data, error } = await supabase
      .from('research_studies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log("Nenhum estudo encontrado no banco de dados");
      return [];
    }
    
    console.log(`Recuperados ${data.length} estudos do banco de dados`);
    
    // Converter formato do banco para o formato da aplicação
    return data.map(study => ({
      id: study.id,
      title: study.title,
      author: study.author,
      coAuthors: study.co_authors || "",
      summary: study.summary || "",
      repositoryUrl: study.repository_url || "",
      location: study.location,
      coordinates: study.coordinates as [number, number],
      type: study.type as "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro"
    }));
  } catch (error) {
    console.error("Erro ao buscar estudos:", error);
    toast({
      title: "Erro ao carregar estudos",
      description: "Não foi possível carregar os estudos. Tente novamente mais tarde.",
      variant: "destructive"
    });
    return [];
  }
};

// Adicionar um novo estudo
export const addResearchStudy = async (data: ResearchStudyFormData): Promise<ResearchStudy | null> => {
  try {
    console.log("Adicionando novo estudo:", data.title);
    
    // Garantir que o tipo não seja nulo
    const type = data.type || "artigo";
    
    // Obter coordenadas para a localização
    const coordinates = await geocodeLocation(data.location);
    console.log(`Coordenadas obtidas para ${data.location}:`, coordinates);
    
    // Inserir no banco de dados
    const { data: newStudy, error } = await supabase
      .from('research_studies')
      .insert({
        title: data.title,
        author: data.author,
        co_authors: data.coAuthors,
        summary: data.summary,
        repository_url: data.repositoryUrl,
        location: data.location,
        coordinates: coordinates,
        type: type
      })
      .select()
      .single();
    
    if (error) {
      console.error("Erro ao inserir estudo:", error);
      throw error;
    }
    
    if (!newStudy) {
      console.error("Estudo inserido mas não retornado");
      throw new Error("Erro ao recuperar o estudo após inserção");
    }
    
    console.log("Estudo adicionado com sucesso:", newStudy.id);
    
    // Converter para o formato da aplicação
    return {
      id: newStudy.id,
      title: newStudy.title,
      author: newStudy.author,
      coAuthors: newStudy.co_authors || "",
      summary: newStudy.summary || "",
      repositoryUrl: newStudy.repository_url || "",
      location: newStudy.location,
      coordinates: newStudy.coordinates as [number, number],
      type: newStudy.type as "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro"
    };
  } catch (error) {
    console.error("Erro ao adicionar estudo:", error);
    toast({
      title: "Erro ao adicionar estudo",
      description: "Não foi possível adicionar o estudo. Tente novamente.",
      variant: "destructive"
    });
    return null;
  }
};

// Excluir um estudo
export const deleteResearchStudy = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('research_studies')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    console.log("Estudo removido com sucesso:", id);
    return true;
  } catch (error) {
    console.error("Erro ao remover estudo:", error);
    toast({
      title: "Erro ao remover estudo",
      description: "Não foi possível remover o estudo. Tente novamente.",
      variant: "destructive"
    });
    return false;
  }
};
