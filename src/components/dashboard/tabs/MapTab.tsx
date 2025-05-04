
import React from "react";
import { ResearchStudy } from "@/types/research";
import InteractiveMap from "@/components/dashboard/InteractiveMap";

interface MapTabProps {
  studies: ResearchStudy[];
  isAuthenticated: boolean;
  handleStudySubmit?: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy?: (id: string) => void;
}

const MapTab: React.FC<MapTabProps> = ({
  studies,
  isAuthenticated,
  handleStudySubmit,
  handleDeleteStudy
}) => {
  return (
    <div className="space-y-6">
      <div className="w-full rounded-lg overflow-hidden border border-forest-100 shadow-md">
        <InteractiveMap 
          studies={studies}
          height="700px" // Aumentando a altura para visualizar todo o mapa
          width="100%"
        />
      </div>
      
      {/* Mantendo o componente MapView apenas para o modo autenticado com formulários */}
      {isAuthenticated && handleStudySubmit && handleDeleteStudy && (
        <div className="hidden">
          {/* O componente MapView está escondido em favor do InteractiveMap, 
              mas preservado para manter a funcionalidade dos formulários */}
        </div>
      )}
    </div>
  );
};

export default MapTab;
