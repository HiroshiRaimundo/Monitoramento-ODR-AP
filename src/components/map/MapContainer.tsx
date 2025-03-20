
<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
=======
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
// Removed CSS import that was causing MIME type error
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937
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
  const prevPointsRef = useRef<MapPoint[]>([]);
  const groupsRef = useRef<{[key: string]: MapPoint[]}>({});

  // Agrupar pontos por localização sempre que os pontos mudarem
  useEffect(() => {
    console.log("MapContainer: Atualizando grupos de pontos, total:", points.length);
    
    // Verificar se houve realmente alteração nos pontos
    const currentPointIds = new Set(points.map(p => p.id));
    const prevPointIds = new Set(prevPointsRef.current.map(p => p.id));
    
    const samePoints = 
      currentPointIds.size === prevPointIds.size && 
      [...currentPointIds].every(id => prevPointIds.has(id));
    
    if (samePoints && Object.keys(groupsRef.current).length > 0) {
      console.log("MapContainer: Mesmos pontos, mantendo grupos existentes");
      return;
    }
    
    prevPointsRef.current = [...points];
    
    // Verificar se há pontos para processar
    if (!points || points.length === 0) {
      console.log("MapContainer: Sem pontos para agrupar");
      setMarkerGroups({});
      groupsRef.current = {};
      return;
    }
    
    // Log detalhado de cada ponto para diagnóstico
    points.forEach((point, idx) => {
      if (idx < 5 || idx >= points.length - 2) {
        console.log(`Ponto ${idx}: ID=${point.id}, Título=${point.title}, Coords=[${point.coordinates}]`);
      }
    });
    
    // Verificação de coordenadas válidas
    const validPoints = points.filter(point => {
      const hasValidCoords = point?.coordinates && 
                            Array.isArray(point.coordinates) && 
                            point.coordinates.length === 2 &&
                            !isNaN(point.coordinates[0]) && 
                            !isNaN(point.coordinates[1]);
                            
      if (!hasValidCoords) {
        console.warn(`Ponto inválido: ${point?.id} (${point?.title})`, point?.coordinates);
      }
      
      return hasValidCoords;
    });
    
    console.log(`MapContainer: ${validPoints.length} pontos válidos de ${points.length} totais`);
    
    // Agrupar pontos por localização
    const groups = groupPointsByLocation(validPoints);
    console.log("MapContainer: Grupos criados:", Object.keys(groups).length);
    
    // Manter referência aos grupos para uso posterior
    groupsRef.current = groups;
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
          key={`group-${locationKey}`}
          locationKey={locationKey}
          pointsGroup={pointsGroup}
          map={map.current!}
          onSelectPoint={onSelectPoint}
        />
      ))}
      
      {/* Contador visual de alfinetes e detalhes */}
      {mapLoaded && (
        <div className="absolute top-2 left-2 bg-white/80 p-2 rounded-lg text-sm font-medium z-10 shadow-md">
          <div className="flex items-center gap-2">
            <span className="bg-forest-600 text-white px-2 py-0.5 rounded-full text-xs">
              {Object.values(markerGroups).reduce((acc, group) => acc + group.length, 0)}
            </span>
            <span>alfinetes no mapa</span>
          </div>
          <div className="text-xs text-forest-600 mt-1">
            {Object.keys(markerGroups).length} locais diferentes
          </div>
        </div>
      )}
      
      {/* Indicador visual quando não há pontos */}
      {(!points || points.length === 0) && (
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