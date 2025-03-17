
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPoint } from '@/types/map';

interface UseMapboxProps {
  centerOnAmapa?: boolean;
  points: MapPoint[];
}

export const useMapbox = ({ centerOnAmapa = true }: UseMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Coordenadas do centro do Amapá
  const amapaCenterLng = -52.0215415;
  const amapaCenterLat = 1.4441146;

  // Inicializar mapa apenas uma vez
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Inicializar Mapbox
    mapboxgl.accessToken = 'pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag';
    
    // Criar mapa estático e estável
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [amapaCenterLng, amapaCenterLat], // Centro do Amapá
      zoom: 7,
      pitch: 0, // Sem inclinação para maior estabilidade
      bearing: 0, // Sem rotação para maior estabilidade
      
      // Opções para estabilidade:
      dragRotate: false,             // Desabilitar rotação
      pitchWithRotate: false,        // Desabilitar inclinação
      attributionControl: false,     // Remover controle de atribuição
      
      // Limitar a área visível para o Amapá
      maxBounds: [
        [amapaCenterLng - 4, amapaCenterLat - 4], // Sudoeste
        [amapaCenterLng + 4, amapaCenterLat + 4]  // Nordeste
      ]
    });
    
    // Adicionar controles simplificados
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false,
        showCompass: false
      }),
      'top-right'
    );

    // Desabilitar interações que causam instabilidade
    map.current.dragRotate.disable();
    map.current.touchZoomRotate.disableRotation();
    
    // Marcar quando o mapa estiver carregado
    map.current.on('load', () => {
      setMapLoaded(true);
      console.log("Mapa carregado com sucesso");
    });

    // Limpeza ao desmontar
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Recentrar mapa quando solicitado
  useEffect(() => {
    if (!map.current || !mapLoaded || !centerOnAmapa) return;
    
    // Centralizar no Amapá de forma suave
    map.current.flyTo({
      center: [amapaCenterLng, amapaCenterLat],
      zoom: 7,
      pitch: 0,
      bearing: 0,
      essential: true // Garante que a animação é completada
    });
  }, [centerOnAmapa, mapLoaded]);

  return { mapContainer, map, mapLoaded };
};
