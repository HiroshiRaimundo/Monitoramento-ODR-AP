
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPoint } from '@/types/map';

interface MapMarkerProps {
  point: MapPoint;
  map: mapboxgl.Map;
  onClick: (point: MapPoint) => void;
  index: number;
  total: number;
}

const MapMarker: React.FC<MapMarkerProps> = ({ point, map, onClick, index, total }) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    // Validar coordenadas
    if (!point?.coordinates || 
        !Array.isArray(point.coordinates) || 
        point.coordinates.length !== 2 ||
        isNaN(point.coordinates[0]) || 
        isNaN(point.coordinates[1])) {
      console.error("Coordenadas inválidas:", point?.id, point?.coordinates);
      return;
    }

    // Definir a cor do marcador baseado no tipo de estudo
    let markerColor = '#FF0000'; // Vermelho padrão
    
    if (point.type) {
      switch (point.type.toLowerCase()) {
        case 'artigo': markerColor = '#FF0000'; break;
        case 'dissertacao': markerColor = '#0066FF'; break;
        case 'tese': markerColor = '#008000'; break;
        case 'livros': markerColor = '#800080'; break;
        case 'ebooks': markerColor = '#FF6600'; break;
        default: markerColor = '#FF0000';
      }
    }

    // Calcular offset para evitar sobreposição
    let offsetX = 0;
    let offsetY = 0;
    
    if (total > 1) {
      // Padrão em círculo para distribuir marcadores
      const angle = (index / total) * 2 * Math.PI;
      const radius = 30; // Distância em pixels
      
      offsetX = Math.cos(angle) * radius;
      offsetY = Math.sin(angle) * radius;
    }

    // Criar elemento para o marcador
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = markerColor;
    el.style.cursor = 'pointer';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 3px 6px rgba(0,0,0,0.5)';

    // Adicionar número ao marcador se houver múltiplos
    if (total > 1) {
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = 'white';
      el.style.fontSize = '12px';
      el.style.fontWeight = 'bold';
      el.innerHTML = `${index + 1}`;
    }

    // Criar popup informativo
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -15],
      maxWidth: '300px'
    }).setHTML(`
      <div class="p-2 text-sm">
        <h4 class="font-bold">${point.title}</h4>
        <p class="text-xs">Autor: ${point.author || 'Não especificado'}</p>
        <p class="text-xs">Tipo: ${point.type || 'Não especificado'}</p>
        <p class="text-xs text-blue-600 mt-1">Clique para detalhes</p>
      </div>
    `);
    
    popupRef.current = popup;

    // Adicionar marcador ao mapa
    const marker = new mapboxgl.Marker({
      element: el,
      offset: [offsetX, offsetY]
    })
      .setLngLat(point.coordinates)
      .addTo(map);
      
    markerRef.current = marker;

    // Eventos do marcador
    const markerElement = marker.getElement();
    
    markerElement.addEventListener('mouseenter', () => {
      popup.addTo(map);
      popup.setLngLat(point.coordinates);
    });

    markerElement.addEventListener('mouseleave', () => {
      popup.remove();
    });

    markerElement.addEventListener('click', () => {
      onClick(point);
      console.log("Marcador clicado:", point.title);
    });

    // Limpeza
    return () => {
      if (markerRef.current) markerRef.current.remove();
      if (popupRef.current) popupRef.current.remove();
    };
  }, [map, point, onClick, index, total]);

  return null;
};

export default MapMarker;
