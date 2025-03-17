
import React, { useEffect, useRef } from 'react';
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
  const renderedMarkersRef = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    console.log(`Renderizando grupo de marcadores em ${locationKey} com ${pointsGroup.length} pontos`);
    
    // Limpar o conjunto de marcadores renderizados ao atualizar o grupo
    renderedMarkersRef.current = new Set();
    
    return () => {
      console.log(`Limpando grupo de marcadores em ${locationKey}`);
    };
  }, [locationKey, pointsGroup.length]);
  
  // Criar um marcador de cluster se houver muitos pontos (mais de 15)
  if (pointsGroup.length > 15) {
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
        // Verificar se este marcador já foi renderizado
        const markerId = `${point.id}-${index}`;
        if (renderedMarkersRef.current.has(markerId)) {
          return null;
        }
        
        // Marcar como renderizado
        renderedMarkersRef.current.add(markerId);
        
        console.log(`Preparando marcador ${index+1}/${pointsGroup.length} para ${point.title}`);
        
        // Formatando as coordenadas antes de passar para o marcador
        const formattedPoint = formatMapboxCoordinates(point);
        
        // Verificação detalhada das coordenadas
        if (!formattedPoint.coordinates || formattedPoint.coordinates.some(isNaN)) {
          console.error(`Coordenadas inválidas após formatação para ${point.title}:`, formattedPoint.coordinates);
          return null; // Não renderizar este marcador
        }
        
        return (
          <MapMarker 
            key={markerId} 
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
