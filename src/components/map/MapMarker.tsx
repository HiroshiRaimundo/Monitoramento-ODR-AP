
import React from 'react';
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
  React.useEffect(() => {
    // Create a detailed popup with more information
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -10],
      className: 'custom-popup'
    }).setHTML(`
      <div class="p-2 text-sm">
        <h4 class="font-bold mb-1">${point.title}</h4>
        <p class="text-xs">Autor: ${point.author}</p>
        <p class="text-xs">Tipo: ${point.type}</p>
      </div>
    `);

    // Choose marker color based on study type
    let markerColor = '#808080'; // Default gray
    
    // Check common type values but allow for any string
    if (typeof point.type === 'string') {
      switch (point.type.toLowerCase()) {
        case 'artigo':
          markerColor = '#FF0000'; // Red
          break;
        case 'dissertacao':
          markerColor = '#0066FF'; // Blue
          break;
        case 'tese':
          markerColor = '#008000'; // Green
          break;
        case 'livros':
          markerColor = '#800080'; // Purple
          break;
        case 'ebooks':
          markerColor = '#FF6600'; // Orange
          break;
      }
    }

    // Calculate position offset for markers at the same location
    // This creates a circular pattern around the actual coordinates
    let offsetX = 0;
    let offsetY = 0;
    
    if (total > 1) {
      // Calculate positions in a circular pattern
      const radius = Math.min(total * 5, 25); // Limit the radius
      const angle = (index / total) * 2 * Math.PI;
      offsetX = Math.cos(angle) * radius;
      offsetY = Math.sin(angle) * radius;
    }

    const marker = new mapboxgl.Marker({ 
      color: markerColor,
      offset: [offsetX, offsetY]
    })
      .setLngLat(point.coordinates)
      .addTo(map);

    // Show popup on hover
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
