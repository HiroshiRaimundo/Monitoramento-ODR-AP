
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { fetchResearchStudies as fetchStudies, addResearchStudy, deleteResearchStudy } from "@/services/researchService";

export const useResearch = () => {
  const [studies, setStudies] = useState<ResearchStudy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Para forçar atualizações
  
  // Inicializar o formulário com valores padrão
  const form = useForm<ResearchStudyFormData>({
    defaultValues: {
      title: '',
      author: '',
      coAuthors: '',
      summary: '',
      repositoryUrl: '',
      location: '',
      type: "artigo"
    }
  });

  // Carregar estudos do banco de dados
  const fetchResearchStudies = async () => {
    setIsLoading(true);
    try {
      const fetchedStudies = await fetchStudies();
      console.log(`useResearch: Carregados ${fetchedStudies.length} estudos`);
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

  // Efeito para carregar estudos inicialmente e quando refreshTrigger mudar
  useEffect(() => {
    console.log("useResearch: Carregando estudos...");
    fetchResearchStudies();
  }, [refreshTrigger]);

  // Manipulador para envio de formulário
  const handleStudySubmit = async (data: ResearchStudyFormData) => {
    setIsLoading(true);
    try {
      console.log("useResearch: Adicionando novo estudo:", data.title);
      const newStudy = await addResearchStudy(data);
      
      if (newStudy) {
        // Atualizar estudos localmente para evitar nova requisição
        setStudies(prev => [newStudy, ...prev]);
        
        // Limpar o formulário completamente
        form.reset({
          title: '',
          author: '',
          coAuthors: '',
          summary: '',
          repositoryUrl: '',
          location: '',
          type: "artigo"
        });
        
        // Notificar o usuário
        toast({
          title: "Estudo adicionado",
          description: `"${data.title}" foi adicionado ao mapa.`
        });
        
        // Forçar uma atualização completa da lista
        setRefreshTrigger(prev => prev + 1);
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

  // Manipulador para excluir estudo
  const handleDeleteStudy = async (id: string) => {
    setIsLoading(true);
    try {
      console.log("useResearch: Removendo estudo:", id);
      const success = await deleteResearchStudy(id);
      
      if (success) {
        // Atualizar estudos localmente
        setStudies(prev => prev.filter(study => study.id !== id));
        
        // Notificar o usuário
        toast({
          title: "Análise removida",
          description: "A análise foi removida com sucesso."
        });
        
        // Forçar uma atualização completa da lista
        setRefreshTrigger(prev => prev + 1);
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
    handleDeleteStudy
  };
};
