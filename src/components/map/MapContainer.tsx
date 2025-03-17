
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

  // Agrupar pontos por localização
  useEffect(() => {
    if (!points || points.length === 0) {
      setMarkerGroups({});
      return;
    }

    // Validar e registrar os pontos
    console.log(`Processando ${points.length} pontos para exibição no mapa`);
    
    // Filtrar pontos com coordenadas válidas
    const validPoints = points.filter(point => 
      point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2 &&
      !isNaN(point.coordinates[0]) && 
      !isNaN(point.coordinates[1])
    );
    
    console.log(`${validPoints.length} pontos válidos para agrupar`);
    
    // Agrupar pontos por localização
    const groups = groupPointsByLocation(validPoints);
    setMarkerGroups(groups);
    
    // Log de diagnóstico
    Object.entries(groups).forEach(([location, group]) => {
      console.log(`Grupo em ${location}: ${group.length} pontos`);
    });
  }, [points]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Contador de alfinetes */}
      {mapLoaded && (
        <div className="absolute top-2 left-2 bg-white/80 p-2 rounded-lg text-sm z-10 shadow">
          <div className="flex items-center gap-2">
            <span className="bg-forest-600 text-white px-2 py-0.5 rounded-full text-xs">
              {Object.values(markerGroups).reduce((acc, group) => acc + group.length, 0)}
            </span>
            <span>estudos no mapa</span>
          </div>
        </div>
      )}
      
      {/* Renderizar grupos de marcadores */}
      {mapLoaded && map.current && Object.entries(markerGroups).map(([locationKey, pointsGroup]) => (
        <MapMarkerGroup
          key={`group-${locationKey}`}
          locationKey={locationKey}
          pointsGroup={pointsGroup}
          map={map.current!}
          onSelectPoint={onSelectPoint}
        />
      ))}
      
      {/* Mensagem quando não há pontos */}
      {mapLoaded && (!points || points.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/30">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-700">Nenhum estudo para exibir no mapa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
