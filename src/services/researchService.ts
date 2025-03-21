
import { supabase } from "@/integrations/supabase/client";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { getCoordinatesForLocation, handleApiError } from "@/utils/researchUtils";

// Fetch all research studies
export const fetchResearchStudies = async (): Promise<ResearchStudy[]> => {
  try {
    const { data, error } = await supabase
      .from('research_studies')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Converter o formato do banco para o formato da aplicação
    return data.map(study => ({
      id: study.id,
      title: study.title,
      author: study.author,
      coAuthors: study.co_authors,
      summary: study.summary,
      repositoryUrl: study.repository_url,
      location: study.location,
      coordinates: study.coordinates as [number, number],
      type: study.type as "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro"
    }));
  } catch (error) {
    handleApiError(error, 'Erro ao buscar estudos');
    return [];
  }
};

// Add a new research study
export const addResearchStudy = async (data: ResearchStudyFormData): Promise<ResearchStudy | null> => {
  try {
    // Verificação para garantir que type não seja nulo
    if (!data.type) {
      data.type = "artigo"; // Valor padrão se estiver faltando
    }
    
    console.log("Dados do formulário antes de enviar:", data);
    
    // Get coordinates for the location
    const coordinates = await getCoordinatesForLocation(data.location);
    
    // Inserir no Supabase
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
        type: data.type
      })
      .select()
      .single();
    
    if (error) {
      console.error('Erro detalhado ao inserir estudo:', error);
      throw error;
    }
    
    // Converter formato do banco para formato da aplicação
    return {
      id: newStudy.id,
      title: newStudy.title,
      author: newStudy.author,
      coAuthors: newStudy.co_authors,
      summary: newStudy.summary,
      repositoryUrl: newStudy.repository_url,
      location: newStudy.location,
      coordinates: newStudy.coordinates as [number, number],
      type: newStudy.type as "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro"
    };
  } catch (error) {
    handleApiError(error, 'Erro ao adicionar estudo');
    return null;
  }
};

// Update a research study
export const updateResearchStudy = async (id: string, data: ResearchStudyFormData): Promise<ResearchStudy | null> => {
  try {
    // Verificação para garantir que type não seja nulo
    if (!data.type) {
      data.type = "artigo"; // Valor padrão se estiver faltando
    }
    
    console.log("Dados de atualização antes de enviar:", data);
    
    // Get coordinates for the location (só atualiza se a localização mudar)
    const coordinates = await getCoordinatesForLocation(data.location);
    
    // Atualizar no Supabase
    const { data: updatedStudy, error } = await supabase
      .from('research_studies')
      .update({
        title: data.title,
        author: data.author,
        co_authors: data.coAuthors,
        summary: data.summary,
        repository_url: data.repositoryUrl,
        location: data.location,
        coordinates: coordinates,
        type: data.type
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Erro detalhado ao atualizar estudo:', error);
      throw error;
    }
    
    // Converter formato do banco para formato da aplicação
    return {
      id: updatedStudy.id,
      title: updatedStudy.title,
      author: updatedStudy.author,
      coAuthors: updatedStudy.co_authors,
      summary: updatedStudy.summary,
      repositoryUrl: updatedStudy.repository_url,
      location: updatedStudy.location,
      coordinates: updatedStudy.coordinates as [number, number],
      type: updatedStudy.type as "artigo" | "dissertacao" | "tese" | "livros" | "ebooks" | "outro"
    };
  } catch (error) {
    handleApiError(error, 'Erro ao atualizar estudo');
    return null;
  }
};

// Delete a research study
export const deleteResearchStudy = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('research_studies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    handleApiError(error, 'Erro ao remover estudo');
    return false;
  }
};
