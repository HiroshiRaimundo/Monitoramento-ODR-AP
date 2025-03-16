
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

  // Agrupar pontos por localização uma vez quando os pontos mudam
  useEffect(() => {
    const groups = groupPointsByLocation(points);
    setMarkerGroups(groups);
  }, [points]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      {mapLoaded && map.current && Object.entries(markerGroups).map(([locationKey, pointsGroup]) => (
        <MapMarkerGroup
          key={locationKey}
          locationKey={locationKey}
          pointsGroup={pointsGroup}
          map={map.current}
          onSelectPoint={onSelectPoint}
        />
      ))}
    </div>
  );
};

export default MapContainer;
