
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

  // Coordenadas corretas do centro do Amapá
  const amapaCenterLng = -52.0215415;
  const amapaCenterLat = 1.4441146;

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
      zoom: 7, // Zoom inicial para ver o Amapá
      center: [amapaCenterLng, amapaCenterLat], // Coordenadas corretas do Amapá
      pitchWithRotate: false, // Desabilita pitch automático ao rotacionar
      pitch: 0, // Começa sem inclinação para evitar instabilidade
      dragRotate: false, // Desabilita rotação para manter o mapa estável
      interactive: true, // Mantém o mapa interativo
      renderWorldCopies: false, // Evita renderizar múltiplas cópias do mundo
      maxBounds: [
        [amapaCenterLng - 5, amapaCenterLat - 5], // Sudoeste (mais restrito)
        [amapaCenterLng + 5, amapaCenterLat + 5]  // Nordeste (mais restrito)
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

  // Ajustar a visualização do mapa quando os pontos são carregados
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    console.log("Ajustando visualização do mapa com", points.length, "pontos");
    
    // Se não tiver sido inicializado ainda, centraliza no Amapá
    if (centerOnAmapa && !initializedRef.current) {
      // Primeiro, centraliza no Amapá
      map.current.jumpTo({
        center: [amapaCenterLng, amapaCenterLat],
        zoom: 7,
        pitch: 0
      });
      initializedRef.current = true;
    }

    // Só ajusta o bounds se houver pontos válidos
    if (points.length > 0) {
      try {
        // Criar bounds para incluir todos os pontos
        const bounds = new mapboxgl.LngLatBounds();
        let validPointsCount = 0;
        
        // Verificar cada ponto para garantir coordenadas válidas
        points.forEach(point => {
          if (point.coordinates && Array.isArray(point.coordinates) && point.coordinates.length === 2) {
            // Verificar se as coordenadas são números válidos
            if (!isNaN(point.coordinates[0]) && !isNaN(point.coordinates[1])) {
              bounds.extend(point.coordinates as mapboxgl.LngLatLike);
              validPointsCount++;
              console.log(`Ponto válido: ${point.title} [${point.coordinates}]`);
            } else {
              console.warn(`Coordenadas inválidas para ${point.title}: [${point.coordinates}]`);
            }
          } else {
            console.warn(`Estrutura de coordenadas inválida para ${point.title}`);
          }
        });
        
        console.log(`useMapbox: ${validPointsCount} pontos válidos para ajustar bounds`);
        
        // Só ajusta o bounds se houver pontos válidos
        if (validPointsCount > 0 && !bounds.isEmpty()) {
          console.log("Ajustando bounds para mostrar todos os pontos");
          map.current.fitBounds(bounds, {
            padding: 100,
            maxZoom: 10, // Limita o zoom máximo para evitar zoom excessivo
            duration: 500 // Animação suave
          });
        } else {
          console.log("Usando visualização padrão para o Amapá");
          // Se não houver pontos válidos, centraliza no Amapá
          map.current.jumpTo({
            center: [amapaCenterLng, amapaCenterLat],
            zoom: 7
          });
        }
      } catch (err) {
        console.error("Erro ao ajustar bounds:", err);
        // Em caso de erro, volta para a visualização padrão
        map.current.jumpTo({
          center: [amapaCenterLng, amapaCenterLat],
          zoom: 7
        });
      }
    }
  }, [points, mapLoaded, centerOnAmapa]);

  return { mapContainer, map, mapLoaded };
};
