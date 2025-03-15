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
  centerOnAmapa = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markerGroups, setMarkerGroups] = useState<{[key: string]: MapPoint[]}>({});

  // Coordenadas do centro do Amapá
  const amapaCenterLng = -51.0669;
  const amapaCenterLat = 1.0354;

  // Inicialização do mapa
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    console.log("Inicializando mapa com", points.length, "pontos");

    // Initialize map with the provided token
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'mercator',
      zoom: 6, // Zoom inicial para ver o Amapá
      center: [amapaCenterLng, amapaCenterLat], // Centralizado no Amapá
      pitchWithRotate: false, // Desabilita pitch automático ao rotacionar
      pitch: 0, // Começa sem inclinação para evitar instabilidade
      maxBounds: [
        [amapaCenterLng - 10, amapaCenterLat - 10], // Sudoeste (ampliado)
        [amapaCenterLng + 10, amapaCenterLat + 10]  // Nordeste (ampliado)
      ]
    });

    // Adiciona controles de navegação
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Configura eventos apenas uma vez na inicialização
    map.current.on('style.load', () => {
      // Configuração mais leve da névoa para melhor desempenho
      map.current?.setFog({
        'range': [0.5, 10],
        'color': 'white',
        'horizon-blend': 0.1
      });
      
      console.log("Mapa carregado");
      setMapLoaded(true);
    });

    // Limita a frequência de redesenho do mapa
    map.current.on('moveend', () => {
      console.log("Mapa: movimento finalizado");
    });

    // Cleanup
    return () => {
      if (map.current) {
        console.log("Removendo mapa");
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Agrupar pontos por localização uma vez quando os pontos mudam
  useEffect(() => {
    if (!points.length) return;
    
    const groups: {[key: string]: MapPoint[]} = {};
    
    // Precisão para agrupar pontos (reduzir para agrupar pontos mais próximos)
    const precision = 0.0001; // Aproximadamente 10 metros
    
    points.forEach(point => {
      if (point.coordinates && Array.isArray(point.coordinates) && point.coordinates.length === 2) {
        // Arredondar coordenadas para agrupar pontos próximos
        const roundedLng = Math.round(point.coordinates[0] / precision) * precision;
        const roundedLat = Math.round(point.coordinates[1] / precision) * precision;
        
        const locationKey = `${roundedLng},${roundedLat}`;
        
        if (!groups[locationKey]) {
          groups[locationKey] = [];
        }
        groups[locationKey].push(point);
      }
    });
    
    console.log("Grupos de localização:", Object.keys(groups).length);
    setMarkerGroups(groups);
  }, [points]);

  // Ajustar a visualização do mapa quando os pontos mudam
  useEffect(() => {
    if (!map.current || !mapLoaded || !points.length) return;

    console.log("Atualizando visualização do mapa com", points.length, "pontos");
    
    // Sempre centraliza no Amapá com animação suave
    if (centerOnAmapa) {
      map.current.easeTo({
        center: [amapaCenterLng, amapaCenterLat],
        zoom: 6,
        pitch: 0,
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
              maxZoom: 8, // Limita o zoom máximo para evitar zoom excessivo
              duration: 1500 // Animação mais lenta e suave
            });
          }
        }, 1500); // Delay para permitir que a primeira animação termine
      }
    }
  }, [points, mapLoaded, centerOnAmapa]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      {mapLoaded && map.current && Object.entries(markerGroups).map(([locationKey, pointsGroup]) => 
        pointsGroup.map((point, index) => (
          <MapMarker 
            key={`${point.id}-${index}`} 
            point={point} 
            map={map.current!} 
            onClick={onSelectPoint}
            index={index}
            total={pointsGroup.length}
          />
        ))
      )}
    </div>
  );
};

export default MapContainer;
