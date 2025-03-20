import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuração do ícone do marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
    iconUrl: 'leaflet/dist/images/marker-icon.png',
    shadowUrl: 'leaflet/dist/images/marker-shadow.png',
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
    console.log(studies); // Verificar se os dados estão sendo passados corretamente
    return (
        <MapContainer center={[2.05108, -50.7945]} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2RyMjAyNSIsImEiOiJjbTduZmJ6emUwMGxoMmlxNDQ2MGtkNXl2In0.e-WKQa0gIyZM9w7SaGi_ag`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {studies.filter(study => study.latitude && study.longitude).map((study, index) => (
                <Marker key={index} position={[study.latitude, study.longitude]}>
                    <Popup>
                        <strong>{study.title}</strong><br />
                        Autor: {study.author}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default InteractiveMap;
