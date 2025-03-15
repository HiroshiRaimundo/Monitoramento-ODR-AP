
import React from "react";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";

interface MapSectionProps {
  filteredMapData: ResearchStudy[];
}

const MapSection: React.FC<MapSectionProps> = ({ filteredMapData }) => {
  return (
    <div className="mt-6">
      <MapView 
        studies={filteredMapData} 
        showRegistrationForm={false}
        title="Visualização Geográfica"
        description="Distribuição espacial dos estudos e pesquisas na região amazônica"
      />
    </div>
  );
};

export default MapSection;
