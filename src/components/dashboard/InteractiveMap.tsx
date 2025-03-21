
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cn } from '@/lib/utils';

// Fix Leaflet icon issue
useEffect(() => {
  // Fix Leaflet's icon path issues
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}, []);

interface Study {
  title: string;
  author: string;
  latitude: number;
  longitude: number;
}

interface InteractiveMapProps {
  studies: Study[];
  className?: string;
  height?: string;
  width?: string;
  zoom?: number;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  studies, 
  className,
  height = '400px',
  width = '100%',
  zoom = 6
}) => {
  const mapRef = useRef<L.Map | null>(null);
  
  // Set default center to Amapá
  const defaultCenter: [number, number] = [2.05108, -50.7945];
  
  // Log studies data for debugging
  useEffect(() => {
    console.log('InteractiveMap: Studies data:', studies);
    
    // Make map responsive on container resize
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [studies]);
  
  // Check if we have valid studies with coordinates
  const validStudies = studies.filter(
    study => typeof study.latitude === 'number' && 
             typeof study.longitude === 'number' && 
             !isNaN(study.latitude) && 
             !isNaN(study.longitude)
  );
  
  return (
    <div className={cn("leaflet-container-wrapper", className)} style={{ height, width }}>
      <MapContainer 
        center={defaultCenter}
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {validStudies.map((study, index) => (
          <Marker 
            key={`study-marker-${index}`} 
            position={[study.latitude, study.longitude]}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-medium text-forest-700">{study.title}</h3>
                <p className="text-forest-600">Autor: {study.author}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
