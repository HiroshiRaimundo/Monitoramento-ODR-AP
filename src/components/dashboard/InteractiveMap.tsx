
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuração do ícone do marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Study {
    title: string;
    author: string;
    latitude: number;
    longitude: number;
}

interface InteractiveMapProps {
    studies: Study[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ studies }) => {
    console.log("InteractiveMap: Renderizando com", studies.length, "estudos");
    
    // Default center coordinates for Amapá
    const defaultCenter: [number, number] = [2.05108, -50.7945];
    
    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-forest-100 shadow-sm">
            <MapContainer 
                center={defaultCenter} 
                zoom={6} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {studies.filter(study => study.latitude && study.longitude).map((study, index) => (
                    <Marker 
                        key={index} 
                        position={[study.latitude, study.longitude]}
                    >
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-medium text-forest-700">{study.title}</h3>
                                <p className="text-sm text-forest-600">Autor: {study.author}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default InteractiveMap;
