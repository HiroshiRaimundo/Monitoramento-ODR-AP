
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPoint } from '@/types/map';
import MapMarker from './MapMarker';

interface MapContainerProps {
  points: MapPoint[];
  onSelectPoint: (point: MapPoint) => void;
  centerOnAmapa?: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({ 
  points, 
  onSelectPoint,
  centerOnAmapa = true // Alterado para true por padrão
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Coordenadas do centro do Amapá
  const amapaCenterLng = -51.0669;
  const amapaCenterLat = 1.0354;

  // Inicialização do mapa
  useEffect(() => {
    if (!mapContainer.current) return;

    console.log("Inicializando mapa com", points.length, "pontos");

    // Initialize map with the provided token
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'mercator',
      zoom: 6, // Zoom inicial para ver o Amapá
      center: [amapaCenterLng, amapaCenterLat], // Centralizado no Amapá
      pitch: 30,
      maxBounds: [
        [amapaCenterLng - 5, amapaCenterLat - 5], // Sudoeste (ampliado)
        [amapaCenterLng + 5, amapaCenterLat + 5]  // Nordeste (ampliado)
      ]
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
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
      console.log("Mapa carregado");
      setMapLoaded(true);
    });

    // Cleanup
    return () => {
      if (map.current) {
        console.log("Removendo mapa");
        map.current.remove();
      }
    };
  }, []);

  // Ajustar a visualização do mapa quando os pontos mudam
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    console.log("Atualizando visualização do mapa com", points.length, "pontos");
    
    // Sempre centraliza no Amapá primeiro para garantir uma boa visualização inicial
    map.current.flyTo({
      center: [amapaCenterLng, amapaCenterLat],
      zoom: 6,
      pitch: 30,
      essential: true,
      duration: 1000
    });
    
    // Após centralizar no Amapá, ajusta para mostrar todos os pontos se houver mais de um
    if (points.length > 1) {
      setTimeout(() => {
        if (!map.current) return;
        
        const bounds = new mapboxgl.LngLatBounds();
        points.forEach(point => {
          if (point.coordinates && Array.isArray(point.coordinates) && point.coordinates.length === 2) {
            bounds.extend(point.coordinates as mapboxgl.LngLatLike);
          }
        });
        
        // Só ajusta o bounds se houver pontos válidos
        if (!bounds.isEmpty()) {
          console.log("Ajustando bounds para mostrar todos os pontos");
          map.current.fitBounds(bounds, {
            padding: 100,
            maxZoom: 10
          });
        }
      }, 1500); // Delay para permitir que a primeira animação termine
    } else if (points.length === 1 && points[0].coordinates) {
      // Se há apenas um ponto, centraliza o mapa nele
      setTimeout(() => {
        if (!map.current) return;
        
        console.log("Centralizando em um único ponto:", points[0].coordinates);
        map.current.flyTo({
          center: points[0].coordinates,
          zoom: 10,
          duration: 1000
        });
      }, 1500);
    }
  }, [points, mapLoaded]);

  // Function to group points by coordinates
  const groupPointsByLocation = () => {
    const locationGroups: { [key: string]: MapPoint[] } = {};
    
    points.forEach(point => {
      if (point.coordinates && Array.isArray(point.coordinates) && point.coordinates.length === 2) {
        const locationKey = `${point.coordinates[0]},${point.coordinates[1]}`;
        if (!locationGroups[locationKey]) {
          locationGroups[locationKey] = [];
        }
        locationGroups[locationKey].push(point);
      }
    });
    
    return locationGroups;
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      {mapLoaded && map.current && (() => {
        const locationGroups = groupPointsByLocation();
        console.log("Grupos de localização:", Object.keys(locationGroups).length);
        
        return Object.values(locationGroups).flatMap(group => 
          group.map((point, index) => (
            <MapMarker 
              key={`${point.id}-${index}`} 
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
