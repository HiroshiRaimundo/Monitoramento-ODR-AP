
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
  
  // Determinar quais dados mostrar no mapa
  const displayData = searchResults.length > 0 ? searchResults : filteredMapData;
  
  // Log para diagnóstico
  useEffect(() => {
    console.log("MapSection: Total de estudos carregados:", filteredMapData.length);
    console.log("MapSection: Estudos sendo exibidos:", displayData.length);
    
    // Notificar sobre atualização de estudos
    if (onStudiesUpdate) {
      onStudiesUpdate(displayData);
    }
  }, [filteredMapData, displayData, onStudiesUpdate]);
  
  // Manipulador para resultados de pesquisa
  const handleSearchResults = (results: ResearchStudy[]) => {
    setSearchResults(results);
    // Limpar estudos selecionados
    setSelectedStudies([]);
    
    // Notificar o usuário sobre os resultados
    if (results.length === 0 && searchResults.length > 0) {
      toast({
        title: "Pesquisa limpa",
        description: "Mostrando todos os estudos disponíveis no mapa.",
      });
    } else if (results.length > 0) {
      toast({
        title: `${results.length} ${results.length === 1 ? 'estudo encontrado' : 'estudos encontrados'}`,
        description: "O mapa foi atualizado com os resultados da pesquisa.",
      });
    }
  };
  
  // Converter estudos para o formato de pontos do mapa
  const prepareMapPoints = (studies: ResearchStudy[]): MapPoint[] => {
    return studies
      .filter(study => 
        study.coordinates && 
        Array.isArray(study.coordinates) && 
        study.coordinates.length === 2 &&
        !isNaN(study.coordinates[0]) && 
        !isNaN(study.coordinates[1])
      )
      .map(study => ({
        id: study.id,
        title: study.title,
        author: study.author,
        coordinates: study.coordinates,
        location: study.location,
        repositoryUrl: study.repositoryUrl,
        type: study.type,
        summary: study.summary
      }));
  };
  
  // Handler para quando um ponto é selecionado no mapa
  const handleSelectPoint = (point: MapPoint) => {
    // Verificar se já está selecionado
    const isAlreadySelected = selectedStudies.some(study => study.id === point.id);
    
    if (!isAlreadySelected) {
      // Adicionar aos selecionados
      setSelectedStudies(prev => [...prev, point]);
      
      // Notificar o usuário
      toast({
        title: "Estudo selecionado",
        description: `"${point.title}" foi adicionado aos detalhes abaixo do mapa.`,
      });
    }
  };
  
  // Handler para remover um estudo selecionado
  const handleRemoveStudy = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };
  
  // Obter pontos para o mapa
  const mapPoints = prepareMapPoints(displayData);
  
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
            {mapPoints.length > 0 ? (
              <>
                <div className="mb-2 text-sm text-forest-600">
                  Mostrando {mapPoints.length} estudos no mapa
                </div>
                <Map 
                  points={mapPoints}
                  centerOnAmapa={true}
                  onSelectPoint={handleSelectPoint}
                />
                
                {/* Detalhes dos estudos selecionados */}
                {selectedStudies.length > 0 && (
                  <StudyDetail 
                    selectedStudies={selectedStudies} 
                    onRemoveStudy={handleRemoveStudy}
                  />
                )}
              </>
            ) : (
              <div className="h-[500px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                <div className="text-center p-8">
                  <MapPin size={40} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Nenhum estudo encontrado</p>
                  <p className="mt-2">Cadastre estudos na aba "Registro de Estudos" para visualizá-los no mapa.</p>
                </div>
              </div>
            )}
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
