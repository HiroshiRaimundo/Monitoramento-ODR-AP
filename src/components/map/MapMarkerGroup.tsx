
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
  return (
    <>
      {pointsGroup.map((point, index) => (
        <MapMarker 
          key={`${point.id}-${index}`} 
          point={formatMapboxCoordinates(point)} 
          map={map} 
          onClick={onSelectPoint}
          index={index}
          total={pointsGroup.length}
        />
      ))}
    </>
  );
};

export default MapMarkerGroup;
