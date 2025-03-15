
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";
import { toast } from "@/hooks/use-toast";
import ResearchList from "@/components/ResearchList";

interface MapaTabContentProps {
  isAuthenticated: boolean;
  studies: ResearchStudy[];
  handleStudySubmit: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy?: (id: string) => void;
}

const MapaTabContent: React.FC<MapaTabContentProps> = ({ 
  isAuthenticated,
  studies,
  handleStudySubmit,
  handleDeleteStudy
}) => {
  if (!isAuthenticated) return null;
  
  // Estado local para rastrear estudos
  const [localStudies, setLocalStudies] = useState<ResearchStudy[]>(studies);
  
  // Atualiza o estado local quando os estudos originais mudam
  useEffect(() => {
    console.log("MapaTabContent: Atualizando estudos locais", studies.length);
    setLocalStudies(studies);
  }, [studies]);
  
  // Manipulador de envio do formulário com notificação de sucesso
  const handleFormSubmit = async (data: Omit<ResearchStudy, "id" | "coordinates">) => {
    try {
      await handleStudySubmit(data);
      
      // Exibir feedback positivo para o usuário
      toast({
        title: "Estudo registrado com sucesso",
        description: "O estudo foi adicionado e está disponível no mapa da aba pública.",
      });
    } catch (error) {
      console.error("Erro ao registrar estudo:", error);
      
      // Notificar o usuário sobre o erro
      toast({
        title: "Erro ao registrar estudo",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  // Manipulador para excluir estudos
  const handleDelete = async (id: string) => {
    if (handleDeleteStudy) {
      try {
        await handleDeleteStudy(id);
        // Exibir feedback positivo para o usuário
        toast({
          title: "Estudo removido com sucesso",
          description: "O estudo foi removido do sistema.",
        });
      } catch (error) {
        console.error("Erro ao excluir estudo:", error);
        // Notificar o usuário sobre o erro
        toast({
          title: "Erro ao remover estudo",
          description: "Ocorreu um problema ao tentar remover o estudo.",
          variant: "destructive"
        });
      }
    }
  };
  
  return (
    <TabsContent value="registroEstudos" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3">
          <MapView 
            studies={localStudies} 
            isAuthenticated={isAuthenticated}
            onStudySubmit={handleFormSubmit}
            showRegistrationForm={true}
            title="Registro de Estudos"
            description="Cadastre novos estudos para serem exibidos no mapa da área pública."
            centerOnAmapa={true}
          />
        </div>
        
        <div className="md:col-span-2">
          <ResearchList 
            studies={localStudies} 
            onDelete={handleDelete}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default MapaTabContent;
