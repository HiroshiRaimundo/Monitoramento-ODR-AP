import React from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPoint } from '@/types/map';

interface MapMarkerProps {
  point: MapPoint;
  map: mapboxgl.Map;
  onClick: (point: MapPoint) => void;
  index: number; // Índice para ajudar no posicionamento
  total: number; // Número total de marcadores nesta localização
}

const MapMarker: React.FC<MapMarkerProps> = ({ point, map, onClick, index, total }) => {
  React.useEffect(() => {
    // Criar um popup detalhado com mais informações
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -10],
      className: 'custom-popup',
      maxWidth: '300px'
    }).setHTML(`
      <div class="p-2 text-sm bg-white rounded shadow">
        <h4 class="font-bold mb-1">${point.title}</h4>
        <p class="text-xs">Autor: ${point.author}</p>
        <p class="text-xs">Tipo: ${point.type || 'Não especificado'}</p>
        ${point.summary ? `<p class="text-xs mt-1">Resumo: ${point.summary.substring(0, 100)}${point.summary.length > 100 ? '...' : ''}</p>` : ''}
      </div>
    `);

    // Definir a cor do marcador com base no tipo
    let markerColor = '#FF0000'; // Vermelho por padrão
    
    // Aplicar cores específicas apenas se houver um tipo
    if (point.type) {
      switch (point.type.toLowerCase()) {
        case 'artigo':
          markerColor = '#FF0000'; // Vermelho
          break;
        case 'dissertacao':
          markerColor = '#0066FF'; // Azul
          break;
        case 'tese':
          markerColor = '#008000'; // Verde
          break;
        case 'livros':
          markerColor = '#800080'; // Roxo
          break;
        case 'ebooks':
          markerColor = '#FF6600'; // Laranja
          break;
        default:
          markerColor = '#FF0000'; // Vermelho para 'outro' ou indefinido
      }
    }

    // Calcular deslocamento de posição para marcadores no mesmo local
    let offsetX = 0;
    let offsetY = 0;
    
    if (total > 1) {
      // Implementar um padrão em espiral para distribuir os marcadores
      const angleStep = (2 * Math.PI) / Math.min(total, 8); // Limitar a 8 marcadores por círculo
      const baseRadius = 25; // Raio base em pixels (aumentado para maior separação)
      
      // Determinar em qual "anel" da espiral este marcador deve estar
      const ring = Math.floor(index / 8);
      const indexInRing = index % 8;
      
      // Calcular o raio com base no anel (aumenta para anéis externos)
      const radius = baseRadius * (ring + 1);
      
      // Calcular o ângulo para este marcador
      const angle = indexInRing * angleStep;
      
      // Calcular as coordenadas x e y
      offsetX = Math.cos(angle) * radius;
      offsetY = Math.sin(angle) * radius;
    }

    // Criar um elemento DOM personalizado para o marcador com maior visibilidade
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = markerColor;
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4)';
    
    // Adicionar um número ao marcador se houver vários no mesmo local
    if (total > 1) {
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.color = 'white';
      el.style.fontSize = '10px';
      el.style.fontWeight = 'bold';
      el.innerText = `${index + 1}`;
    }

    // Adicionar o marcador ao mapa
    const marker = new mapboxgl.Marker({ 
      element: el,
      offset: [offsetX, offsetY]
    })
      .setLngLat(point.coordinates)
      .addTo(map);

    // Mostrar popup ao passar o mouse
    marker.getElement().addEventListener('mouseenter', () => {
      popup.addTo(map);
      popup.setLngLat(point.coordinates);
    });

    marker.getElement().addEventListener('mouseleave', () => {
      popup.remove();
    });

    marker.getElement().addEventListener('click', () => {
      onClick(point);
    });

    return () => {
      marker.remove();
      popup.remove();
    };
  }, [map, point, onClick, index, total]);

  return null;
};

export default MapMarker;
