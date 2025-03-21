
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { 
  fetchResearchStudies as fetchStudies, 
  addResearchStudy, 
  deleteResearchStudy,
  updateResearchStudy 
} from "@/services/researchService";

export const useResearch = () => {
  const [studies, setStudies] = useState<ResearchStudy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ResearchStudyFormData>({
    defaultValues: {
      type: "artigo" // Valor padrão para o campo type
    }
  });

  const fetchResearchStudies = async () => {
    setIsLoading(true);
    try {
      const fetchedStudies = await fetchStudies();
      setStudies(fetchedStudies);
    } catch (error) {
      console.error('Erro ao buscar estudos:', error);
      toast({
        title: "Erro ao carregar estudos",
        description: "Não foi possível buscar os estudos. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudySubmit = async (data: ResearchStudyFormData) => {
    setIsLoading(true);
    try {
      const newStudy = await addResearchStudy(data);
      
      if (newStudy) {
        // Atualizar estado
        setStudies(prev => [newStudy, ...prev]);
        form.reset({
          type: "artigo" // Reinicia o formulário mantendo o valor padrão
        });
        
        toast({
          title: "Estudo adicionado",
          description: `"${data.title}" foi adicionado ao mapa.`
        });
      }
    } catch (error) {
      console.error('Erro ao adicionar estudo:', error);
      toast({
        title: "Erro ao adicionar estudo",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditStudy = async (id: string, data: ResearchStudyFormData) => {
    setIsLoading(true);
    try {
      const updatedStudy = await updateResearchStudy(id, data);
      
      if (updatedStudy) {
        // Atualizar estado, substituindo o estudo existente
        setStudies(prev => prev.map(study => 
          study.id === id ? updatedStudy : study
        ));
        
        toast({
          title: "Estudo atualizado",
          description: `"${data.title}" foi atualizado com sucesso.`
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar estudo:', error);
      toast({
        title: "Erro ao atualizar estudo",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive"
      });
      throw error; // Propagar o erro para o componente chamador
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStudy = async (id: string) => {
    setIsLoading(true);
    try {
      const success = await deleteResearchStudy(id);
      
      if (success) {
        setStudies(prev => prev.filter(study => study.id !== id));
        
        toast({
          title: "Análise removida",
          description: "A análise foi removida com sucesso."
        });
      }
    } catch (error) {
      console.error('Erro ao remover estudo:', error);
      toast({
        title: "Erro ao remover estudo",
        description: "Não foi possível remover a análise. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    studies,
    form,
    isLoading,
    fetchResearchStudies,
    handleStudySubmit,
    handleEditStudy,
    handleDeleteStudy
  };
};
