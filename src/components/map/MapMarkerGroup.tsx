
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
  
  // Criar um marcador de cluster se houver muitos pontos (mais de 10)
  if (pointsGroup.length > 15) {
    // Lógica para renderizar um marcador de cluster seria implementada aqui
    // Mas como não queremos alterar a estrutura atual, renderizamos todos os marcadores individualmente
    console.log(`Grupo grande com ${pointsGroup.length} pontos detectado em ${locationKey}`);
  }
  
  // Detalhes de depuração para identificar problemas
  pointsGroup.forEach((point, i) => {
    if (i < 3 || i >= pointsGroup.length - 3) { // Mostrar os primeiros e últimos 3 pontos
      console.log(`Ponto ${i} em grupo ${locationKey}: ID=${point.id}, Título=${point.title}, Coords=[${point.coordinates}]`);
    }
  });
  
  return (
    <>
      {pointsGroup.map((point, index) => {
        console.log(`Preparando marcador ${index+1}/${pointsGroup.length} para ${point.title}`);
        // Formatando as coordenadas antes de passar para o marcador
        const formattedPoint = formatMapboxCoordinates(point);
        
        // Verificação detalhada das coordenadas
        if (formattedPoint.coordinates.some(isNaN)) {
          console.error(`Coordenadas inválidas após formatação para ${point.title}:`, formattedPoint.coordinates);
          return null; // Não renderizar este marcador
        }
        
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
