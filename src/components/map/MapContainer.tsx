
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPoint } from '@/types/map';
import MapMarker from './MapMarker';

interface MapContainerProps {
  points: MapPoint[];
  onSelectPoint: (point: MapPoint) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ points, onSelectPoint }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Coordenadas para o centro geográfico do Amapá (ajustadas)
  const amapaCenterLng = -52.0;
  const amapaCenterLat = 1.9;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with the provided token
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag';
    
    // Definindo os limites do mapa para incluir todo o Amapá
    const maxBounds = [
      [-54.1, -0.1], // Sudoeste [longitude, latitude]
      [-50.4, 3.9]   // Nordeste [longitude, latitude]
    ];
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'mercator',
      zoom: 6.2, // Zoom ajustado para ver todo o Amapá
      center: [amapaCenterLng, amapaCenterLat], // Centralizado no Amapá
      pitch: 30,
      maxBounds: maxBounds
    });

    // Adiciona controles de navegação
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Adiciona efeitos atmosféricos
    map.current.on('style.load', () => {
      if (map.current) {
        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
      }
    });

    // Desabilita o zoom do scroll para uma experiência mais suave
    map.current.scrollZoom.disable();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Ajustar a visualização do mapa quando os pontos mudam
  useEffect(() => {
    if (!map.current || !points || points.length === 0) return;

    if (points.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      points.forEach(point => {
        bounds.extend(point.coordinates as mapboxgl.LngLatLike);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    } else if (points.length === 1) {
      // Se há apenas um ponto, centraliza o mapa nele
      map.current.flyTo({
        center: points[0].coordinates,
        zoom: 12
      });
    } else {
      // Se não há pontos, volta para a visão padrão do Amapá
      map.current.flyTo({
        center: [amapaCenterLng, amapaCenterLat],
        zoom: 6.2,
        pitch: 30
      });
    }
  }, [points]);

  // Function to group points by coordinates
  const groupPointsByLocation = () => {
    const locationGroups: { [key: string]: MapPoint[] } = {};
    
    points.forEach(point => {
      const locationKey = `${point.coordinates[0]},${point.coordinates[1]}`;
      if (!locationGroups[locationKey]) {
        locationGroups[locationKey] = [];
      }
      locationGroups[locationKey].push(point);
    });
    
    return locationGroups;
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      {map.current && (() => {
        const locationGroups = groupPointsByLocation();
        
        return Object.values(locationGroups).flatMap(group => 
          group.map((point, index) => (
            <MapMarker 
              key={point.id} 
              point={point} 
              map={map.current!} 
              onClick={onSelectPoint}
              index={index}
              total={group.length}
            />
          ))
        );
      })()}
    </div>
  );
};

export default MapContainer;
