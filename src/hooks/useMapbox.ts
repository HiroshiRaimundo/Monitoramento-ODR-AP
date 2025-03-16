
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPoint } from '@/types/map';

interface UseMapboxProps {
  centerOnAmapa?: boolean;
  points: MapPoint[];
}

export const useMapbox = ({ centerOnAmapa = true, points }: UseMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const initializedRef = useRef(false);

  // Coordenadas do centro do Amapá
  const amapaCenterLng = -51.0669;
  const amapaCenterLat = 0.0356;

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
      dragRotate: false, // Desabilita rotação para manter o mapa estável
      interactive: true, // Mantém o mapa interativo
      renderWorldCopies: false, // Evita renderizar múltiplas cópias do mundo
      maxBounds: [
        [amapaCenterLng - 10, amapaCenterLat - 10], // Sudoeste (ampliado)
        [amapaCenterLng + 10, amapaCenterLat + 10]  // Nordeste (ampliado)
      ]
    });

    // Adiciona controles de navegação
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false, // Desabilita visualização de pitch para manter o mapa plano
        showCompass: false, // Remove a bússola para simplificar
      }),
      'top-right'
    );

    // Configura eventos apenas uma vez na inicialização
    map.current.on('style.load', () => {
      console.log("Mapa carregado");
      setMapLoaded(true);
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

  // Ajustar a visualização do mapa apenas uma vez quando os pontos são carregados
  useEffect(() => {
    if (!map.current || !mapLoaded || !points.length || initializedRef.current) return;

    console.log("Ajustando visualização do mapa uma única vez com", points.length, "pontos");
    
    // Centraliza no Amapá e ajusta para mostrar todos os pontos
    if (centerOnAmapa) {
      // Primeiro, centraliza no Amapá
      map.current.jumpTo({
        center: [amapaCenterLng, amapaCenterLat],
        zoom: 6,
        pitch: 0
      });
      
      // Depois, ajusta para mostrar todos os pontos se houver mais de um
      if (points.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        let validPointsCount = 0;
        
        points.forEach(point => {
          if (point.coordinates && Array.isArray(point.coordinates) && point.coordinates.length === 2) {
            // Verificar se as coordenadas são números válidos
            if (!isNaN(point.coordinates[0]) && !isNaN(point.coordinates[1])) {
              // No Mapbox, as coordenadas são [longitude, latitude]
              bounds.extend([point.coordinates[1], point.coordinates[0]] as mapboxgl.LngLatLike);
              validPointsCount++;
            }
          }
        });
        
        console.log(`useMapbox: ${validPointsCount} pontos válidos para ajustar bounds`);
        
        // Só ajusta o bounds se houver pontos válidos
        if (!bounds.isEmpty()) {
          console.log("Ajustando bounds para mostrar todos os pontos");
          map.current.fitBounds(bounds, {
            padding: 100,
            maxZoom: 8, // Limita o zoom máximo para evitar zoom excessivo
            duration: 500 // Animação suave
          });
        }
      }
      
      // Marca que o mapa já foi inicializado
      initializedRef.current = true;
    }
  }, [points, mapLoaded, centerOnAmapa]);

  return { mapContainer, map, mapLoaded };
};
