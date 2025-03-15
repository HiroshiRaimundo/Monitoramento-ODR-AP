
import React, { useState, useEffect } from "react";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";
import SearchPanel from "@/components/map/SearchPanel";
import { MapPoint } from "@/types/map";
import { toast } from "@/hooks/use-toast";

interface MapSectionProps {
  filteredMapData: ResearchStudy[];
  onStudiesUpdate?: (studies: ResearchStudy[]) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ 
  filteredMapData,
  onStudiesUpdate 
}) => {
  const [searchResults, setSearchResults] = useState<ResearchStudy[]>([]);
  
  // Determina quais dados mostrar no mapa: resultados da busca ou todos os dados
  const displayData = searchResults.length > 0 ? searchResults : filteredMapData;

  // Avisa quando os dados são atualizados (quando um novo estudo é adicionado)
  useEffect(() => {
    if (onStudiesUpdate) {
      onStudiesUpdate(displayData);
    }
  }, [displayData, onStudiesUpdate]);

  // Manipulador para quando novos resultados de pesquisa estão disponíveis
  const handleSearchResults = (results: ResearchStudy[]) => {
    setSearchResults(results);
    if (results.length === 0 && searchResults.length > 0) {
      // Notifica que a pesquisa foi limpa
      toast({
        title: "Pesquisa limpa",
        description: "Mostrando todos os estudos disponíveis no mapa.",
      });
    } else if (results.length > 0) {
      // Notifica quantos resultados foram encontrados
      toast({
        title: `${results.length} ${results.length === 1 ? 'estudo encontrado' : 'estudos encontrados'}`,
        description: "O mapa foi atualizado com os resultados da pesquisa.",
      });
    }
  };

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
          onSearchResults={handleSearchResults}
        />
      </div>
    </div>
  );
};

export default MapSection;
