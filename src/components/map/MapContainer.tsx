
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPoint } from '@/types/map';
import MapMarker from './MapMarker';

interface MapContainerProps {
  points: MapPoint[];
  onSelectPoint: (point: MapPoint) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ points, onSelectPoint }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Coordenadas do centro do Amapá
  const amapaCenterLng = -51.0669;
  const amapaCenterLat = 1.0354;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with the provided token
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      projection: 'mercator',
      zoom: 7, // Zoom mais próximo para ver o Amapá
      center: [amapaCenterLng, amapaCenterLat], // Centralizado no Amapá
      pitch: 30,
      maxBounds: [
        [amapaCenterLng - 3, amapaCenterLat - 3], // Sudoeste
        [amapaCenterLng + 3, amapaCenterLat + 3]  // Nordeste
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
    });

    // Desabilita o zoom do scroll para uma experiência mais suave
    map.current.scrollZoom.disable();

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  // Ajustar a visualização do mapa quando os pontos mudam
  useEffect(() => {
    if (!map.current || !points) return;

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
        zoom: 7,
        pitch: 30
      });
    }
  }, [points]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      {map.current && points.map(point => (
        <MapMarker 
          key={point.id} 
          point={point} 
          map={map.current} 
          onClick={onSelectPoint}
        />
      ))}
    </div>
  );
};

export default MapContainer;
