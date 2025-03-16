
import React, { useState } from 'react';
import MapContainer from './map/MapContainer';
import { MapPoint } from '@/types/map';

interface MapProps {
  points: MapPoint[];
  centerOnAmapa?: boolean;
  onSelectPoint?: (point: MapPoint) => void;
}

const Map: React.FC<MapProps> = ({ 
  points,
  centerOnAmapa = true,
  onSelectPoint = () => {} // Valor padrão para evitar erros
}) => {
  // Log para depuração
  console.log("Map: Recebendo", points.length, "pontos");
  
  return (
    <MapContainer 
      points={points} 
      centerOnAmapa={centerOnAmapa}
      onSelectPoint={onSelectPoint}
    />
  );
};

export default Map;
