
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
  // Filtrar pontos com coordenadas válidas
  const validPoints = pointsGroup.filter(point => 
    point.coordinates && 
    Array.isArray(point.coordinates) && 
    point.coordinates.length === 2 &&
    !isNaN(point.coordinates[0]) && 
    !isNaN(point.coordinates[1])
  );
  
  return (
    <>
      {validPoints.map((point, index) => {
        // Formatar coordenadas antes de passar para o marcador
        const formattedPoint = formatMapboxCoordinates(point);
        
        return (
          <MapMarker 
            key={`marker-${point.id}-${index}`} 
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
