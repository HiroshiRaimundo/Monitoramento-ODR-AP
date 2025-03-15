
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";
import { toast } from "@/hooks/use-toast";

interface MapaTabContentProps {
  isAuthenticated: boolean;
  studies: ResearchStudy[];
  handleStudySubmit: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
}

const MapaTabContent: React.FC<MapaTabContentProps> = ({ 
  isAuthenticated,
  studies,
  handleStudySubmit
}) => {
  if (!isAuthenticated) return null;
  
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
  
  return (
    <TabsContent value="registroEstudos">
      <MapView 
        studies={studies} 
        isAuthenticated={isAuthenticated}
        onStudySubmit={handleFormSubmit}
        showRegistrationForm={true}
        title="Registro de Estudos"
        description="Cadastre novos estudos para serem exibidos no mapa da área pública."
      />
    </TabsContent>
  );
};

export default MapaTabContent;
