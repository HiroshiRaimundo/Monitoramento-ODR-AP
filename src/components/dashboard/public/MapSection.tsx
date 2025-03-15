
import React, { useState } from "react";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";
import SearchPanel from "@/components/map/SearchPanel";
import { MapPoint } from "@/types/map";

interface MapSectionProps {
  filteredMapData: ResearchStudy[];
}

const MapSection: React.FC<MapSectionProps> = ({ filteredMapData }) => {
  const [searchResults, setSearchResults] = useState<ResearchStudy[]>([]);
  
  // Determina quais dados mostrar no mapa: resultados da busca ou todos os dados
  const displayData = searchResults.length > 0 ? searchResults : filteredMapData;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <MapView 
          studies={displayData} 
          showRegistrationForm={false}
          title="Visualização Geográfica"
          description="Distribuição espacial dos estudos e pesquisas na região amazônica"
          centerOnAmapa={true}
        />
      </div>
      
      <div className="md:col-span-1">
        <SearchPanel 
          studies={filteredMapData}
          onSearchResults={setSearchResults}
        />
      </div>
    </div>
  );
};

export default MapSection;
