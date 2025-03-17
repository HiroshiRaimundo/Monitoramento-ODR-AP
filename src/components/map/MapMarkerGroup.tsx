
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPoint } from '@/types/map';
import MapMarker from './MapMarker';
import { formatMapboxCoordinates } from '@/utils/mapUtils';

interface MapMarkerGroupProps {
  locationKey: string;
  pointsGroup: MapPoint[];
  map: mapboxgl.Map;
  onSelectPoint: (point: MapPoint) => void;
}

const MapMarkerGroup: React.FC<MapMarkerGroupProps> = ({ 
  locationKey, 
  pointsGroup, 
  map, 
  onSelectPoint 
}) => {
  // Filtrar pontos com coordenadas válidas e registrar no console para diagnóstico
  const validPoints = pointsGroup.filter(point => {
    const isValid = point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2 &&
      !isNaN(point.coordinates[0]) && 
      !isNaN(point.coordinates[1]);
    
    if (!isValid) {
      console.warn(`Ponto inválido removido de grupo ${locationKey}:`, point);
    }
    
    return isValid;
  });
  
  // Log para diagnóstico
  if (validPoints.length > 0) {
    console.log(`Grupo ${locationKey}: renderizando ${validPoints.length} pontos válidos`);
  }
  
  return (
    <>
      {validPoints.map((point, index) => {
        // Formatar coordenadas antes de passar para o marcador
        const formattedPoint = formatMapboxCoordinates(point);
        
        return (
          <MapMarker 
            key={`marker-${formattedPoint.id}-${index}-${locationKey}`}
            point={formattedPoint} 
            map={map} 
            onClick={onSelectPoint}
            index={index}
            total={validPoints.length}
          />
        );
      })}
    </>
  );
};

export default MapMarkerGroup;
