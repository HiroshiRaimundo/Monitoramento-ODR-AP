
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ResearchStudy } from '@/types/research';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  studies: ResearchStudy[];
  height?: string;
  width?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  studies, 
  height = '700px',  // Aumentado para 700px para mostrar todo o mapa
  width = '100%'
}) => {
  // Coordenadas ajustadas com base no link do Google Maps
  const defaultCenter: [number, number] = [1.5, -52.0];
  const [selectedStudy, setSelectedStudy] = useState<ResearchStudy | null>(null);

  // Add CSS to fix Leaflet container in responsive designs
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .leaflet-container {
        height: 100%;
        width: 100%;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Define os limites do mapa para incluir todo o Amapá com margem extra
  const bounds: L.LatLngBoundsExpression = [
    [5.5, -55.5],  // Noroeste (acima de Oiapoque/divisa oeste) com margem extra
    [-2.0, -49.0]  // Sudeste (abaixo de Laranjal do Jari/costa leste) com margem extra
  ];

  return (
    <div style={{ height, width, position: 'relative' }} className="border border-forest-100 rounded-lg shadow-sm">
      <MapContainer 
        style={{ height: '100%', width: '100%' }}
        center={defaultCenter}
        zoom={6.0} // Zoom ajustado para melhor visualização
        scrollWheelZoom={true}
        bounds={bounds}
        minZoom={5}
        maxZoom={12}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          noWrap={true}
          bounds={bounds}
        />
        
        {studies.map(study => {
          // Skip invalid coordinates
          if (!study.coordinates || 
              !Array.isArray(study.coordinates) || 
              study.coordinates.length !== 2 ||
              typeof study.coordinates[0] !== 'number' || 
              typeof study.coordinates[1] !== 'number') {
            console.warn('Invalid coordinates for study:', study.id);
            return null;
          }
          
          return (
            <Marker 
              key={study.id} 
              position={[study.coordinates[0], study.coordinates[1]]}
              eventHandlers={{
                click: () => setSelectedStudy(study),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{study.title}</h3>
                  <p className="text-sm">Autor: {study.author}</p>
                  <p className="text-sm">Local: {study.location}</p>
                  {study.type && (
                    <p className="text-sm">Tipo: {study.type}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
