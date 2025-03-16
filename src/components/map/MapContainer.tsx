
import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPoint } from '@/types/map';
import MapMarkerGroup from './MapMarkerGroup';
import { useMapbox } from '@/hooks/useMapbox';
import { groupPointsByLocation } from '@/utils/mapUtils';

interface MapContainerProps {
  points: MapPoint[];
  onSelectPoint: (point: MapPoint) => void;
  centerOnAmapa?: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({ 
  points, 
  onSelectPoint,
  centerOnAmapa = true
}) => {
  const { mapContainer, map, mapLoaded } = useMapbox({ centerOnAmapa, points });
  const [markerGroups, setMarkerGroups] = useState<{[key: string]: MapPoint[]}>({});
  const [markersRendered, setMarkersRendered] = useState<boolean>(false);

  // Agrupar pontos por localização uma vez quando os pontos mudam
  useEffect(() => {
    console.log("MapContainer: Atualizando grupos de pontos, total:", points.length);
    
    // Verificar se há pontos para processar
    if (!points || points.length === 0) {
      console.log("MapContainer: Sem pontos para agrupar");
      setMarkerGroups({});
      return;
    }
    
    // Verificação adicional de coordenadas válidas
    const validPoints = points.filter(point => {
      const hasValidCoords = point.coordinates && 
                            Array.isArray(point.coordinates) && 
                            point.coordinates.length === 2 &&
                            !isNaN(point.coordinates[0]) && 
                            !isNaN(point.coordinates[1]);
                            
      if (!hasValidCoords) {
        console.warn(`Ponto inválido: ${point.id} (${point.title})`, point.coordinates);
      }
      
      return hasValidCoords;
    });
    
    console.log(`MapContainer: ${validPoints.length} pontos válidos de ${points.length} totais`);
    
    // Detalhando os primeiros pontos para depuração
    validPoints.slice(0, 5).forEach((point, idx) => {
      console.log(`Detalhe do ponto ${idx}: ID=${point.id}, Título=${point.title}, Coords=[${point.coordinates}]`);
    });
    
    // Agrupar pontos por localização
    const groups = groupPointsByLocation(validPoints);
    console.log("MapContainer: Grupos criados:", Object.keys(groups).length);
    setMarkerGroups(groups);
    setMarkersRendered(false); // Marcadores precisam ser renderizados novamente
  }, [points]);

  // Efeito para registrar quando os marcadores são renderizados
  useEffect(() => {
    if (mapLoaded && map.current && Object.keys(markerGroups).length > 0 && !markersRendered) {
      console.log("MapContainer: Renderizando", Object.keys(markerGroups).length, "grupos de marcadores");
      setMarkersRendered(true);
    }
  }, [mapLoaded, map, markerGroups, markersRendered]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      {mapLoaded && map.current && Object.entries(markerGroups).map(([locationKey, pointsGroup]) => (
        <MapMarkerGroup
          key={locationKey}
          locationKey={locationKey}
          pointsGroup={pointsGroup}
          map={map.current!}
          onSelectPoint={onSelectPoint}
        />
      ))}
      
      {/* Contador visual de alfinetes */}
      {mapLoaded && (
        <div className="absolute top-2 left-2 bg-white/80 p-2 rounded-lg text-sm font-medium z-10">
          {Object.values(markerGroups).reduce((acc, group) => acc + group.length, 0)} alfinetes no mapa
        </div>
      )}
      
      {/* Indicador visual quando não há pontos */}
      {points.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-700">Nenhum ponto para exibir no mapa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
