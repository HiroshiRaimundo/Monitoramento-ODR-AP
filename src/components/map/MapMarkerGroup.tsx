
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
  console.log(`Renderizando grupo de marcadores em ${locationKey} com ${pointsGroup.length} pontos`);
  
  return (
    <>
      {pointsGroup.map((point, index) => {
        console.log(`Preparando marcador ${index+1}/${pointsGroup.length} para ${point.title}`);
        // Formatando as coordenadas antes de passar para o marcador
        const formattedPoint = formatMapboxCoordinates(point);
        return (
          <MapMarker 
            key={`${point.id}-${index}`} 
            point={formattedPoint} 
            map={map} 
            onClick={onSelectPoint}
            index={index}
            total={pointsGroup.length}
          />
        );
      })}
    </>
  );
};

export default MapMarkerGroup;

