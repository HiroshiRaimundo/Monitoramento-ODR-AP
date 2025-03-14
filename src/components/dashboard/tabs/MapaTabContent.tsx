
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";

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
  
  return (
    <TabsContent value="registroEstudos">
      <MapView 
        studies={studies} 
        isAuthenticated={isAuthenticated}
        onStudySubmit={handleStudySubmit}
        showRegistrationForm={true}
        title="Registro de Estudos"
        description="Cadastre novos estudos para serem exibidos no mapa."
      />
    </TabsContent>
  );
};

export default MapaTabContent;
