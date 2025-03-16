
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Map from "@/components/Map";
import { ResearchStudy } from "@/types/research";
import SearchPanel from "@/components/map/SearchPanel";
import { MapPoint } from "@/types/map";
import { toast } from "@/hooks/use-toast";
import StudyDetail from "@/components/map/StudyDetail";

interface MapSectionProps {
  filteredMapData: ResearchStudy[];
  onStudiesUpdate?: (studies: ResearchStudy[]) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ 
  filteredMapData,
  onStudiesUpdate 
}) => {
  const [searchResults, setSearchResults] = useState<ResearchStudy[]>([]);
  const [selectedStudies, setSelectedStudies] = useState<MapPoint[]>([]);
  
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
    // Limpar estudos selecionados ao mudar a pesquisa
    setSelectedStudies([]);
    
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

  // Preparar os pontos para o mapa
  const mapPoints = displayData.map(study => ({
    id: study.id,
    title: study.title,
    author: study.author,
    coordinates: study.coordinates,
    location: study.location,
    repositoryUrl: study.repositoryUrl,
    type: study.type,
    summary: study.summary
  }));

  // Handler para quando um ponto é selecionado no mapa
  const handleSelectPoint = (point: MapPoint) => {
    console.log("Ponto selecionado:", point.title);
    
    // Verificar se o estudo já está selecionado
    const isAlreadySelected = selectedStudies.some(study => study.id === point.id);
    
    if (!isAlreadySelected) {
      // Adicionar o estudo à lista de selecionados
      setSelectedStudies(prev => [...prev, point]);
      
      // Notificar o usuário
      toast({
        title: "Estudo selecionado",
        description: `"${point.title}" foi adicionado aos detalhes abaixo do mapa.`,
      });
    }
  };

  // Handler para remover um estudo da lista de selecionados
  const handleRemoveStudy = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <Card className="border-forest-100 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-forest-600" />
              <CardTitle className="text-forest-700">Visualização Geográfica</CardTitle>
            </div>
            <CardDescription className="text-forest-600">
              Distribuição espacial dos estudos e pesquisas na região amazônica
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Map 
              points={mapPoints}
              centerOnAmapa={true}
              onSelectPoint={handleSelectPoint}
            />
            
            {/* Componente de detalhe do estudo selecionado */}
            <StudyDetail 
              selectedStudies={selectedStudies} 
              onRemoveStudy={handleRemoveStudy}
            />
          </CardContent>
        </Card>
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
