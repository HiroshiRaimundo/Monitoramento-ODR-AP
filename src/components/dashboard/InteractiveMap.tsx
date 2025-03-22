
import React, { useState } from 'react';
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
  height = '400px',
  width = '100%'
}) => {
  // Default center coordinates for Amapá state
  const defaultCenter: [number, number] = [1.0354, -51.0669];
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

  return (
    <div style={{ height, width, position: 'relative' }}>
      <MapContainer 
        // Properly type MapContainer props - removed center and zoom as direct props
        style={{ height: '100%', width: '100%' }}
        // Add these properties through actual options
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          // Properly type TileLayer props
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
