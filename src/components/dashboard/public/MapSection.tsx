
import React, { useState, useEffect, useRef } from "react";
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
  const allPointsRef = useRef<MapPoint[]>([]);
  
  // Determina quais dados mostrar no mapa: resultados da busca ou todos os dados
  const displayData = searchResults.length > 0 ? searchResults : filteredMapData;

  // Log para debug
  useEffect(() => {
    console.log("MapSection: Total de estudos carregados:", filteredMapData.length);
    console.log("MapSection: Estudos sendo exibidos:", displayData.length);
    
    // Detalhes dos primeiros 5 estudos para debug
    displayData.slice(0, 5).forEach((study, idx) => {
      console.log(`Estudo ${idx}: ID=${study.id}, Título=${study.title}, Coords=[${study.coordinates}]`);
    });
    
    // Manter uma referência de todos os pontos
    const newMapPoints = prepareMapPoints(displayData);
    
    // Combinar com pontos existentes, evitando duplicatas
    const existingIds = new Set(allPointsRef.current.map(p => p.id));
    const pointsToAdd = newMapPoints.filter(p => !existingIds.has(p.id));
    
    if (pointsToAdd.length > 0) {
      console.log(`MapSection: Adicionando ${pointsToAdd.length} novos pontos ao mapa`);
      allPointsRef.current = [...allPointsRef.current, ...pointsToAdd];
    }
    
  }, [filteredMapData, displayData]);

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

  // Preparar os pontos para o mapa com verificação de coordenadas válidas
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

  // Obter pontos para o mapa - usar todos os pontos acumulados
  const getMapPoints = (): MapPoint[] => {
    if (searchResults.length > 0) {
      // Se houver resultados de pesquisa, usar apenas esses
      return prepareMapPoints(searchResults);
    }
    // Caso contrário, usar todos os pontos acumulados
    return allPointsRef.current.length > 0 ? 
      allPointsRef.current : 
      prepareMapPoints(filteredMapData);
  };

  // Handler para quando um ponto é selecionado no mapa
  const handleSelectPoint = (point: MapPoint) => {
    console.log("Ponto selecionado:", point.title, point.coordinates);
    
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

  // Obter os pontos para mostrar no mapa
  const mapPoints = getMapPoints();

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
                
                {/* Componente de detalhe do estudo selecionado */}
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
