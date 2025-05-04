
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ResearchStudy } from '@/types/research';
import 'leaflet/dist/leaflet.css';
import '@/styles/map.css';

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para ajustar a visualização do mapa
const MapViewAdjuster = ({ studies }: { studies: ResearchStudy[] }) => {
  const map = useMap();
  
  useEffect(() => {
    // Definir os limites do Amapá
    const bounds = L.latLngBounds([
      [4.5, -55.0],  // Noroeste (acima de Oiapoque)
      [-1.0, -49.5]  // Sudeste (abaixo de Laranjal do Jari)
    ]);
    
    // Ajustar visualização
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 8
    });
    
    // Adicionar efeitos visuais
    map.once("load", () => {
      map.getContainer().classList.add("map-enhanced");
    });

    // Desabilitar zoom out além dos limites do mapa
    map.setMinZoom(6);
    
    // Para evitar que os usuários percam os marcadores
    map.on('zoomend', function() {
      const currentZoom = map.getZoom();
      if (currentZoom < 6) {
        map.setZoom(6);
      }
    });
    
    return () => {
      map.off('zoomend');
    };
  }, [map, studies]);
  
  return null;
};

// Função para obter cor baseada no tipo de estudo
const getStudyTypeColor = (type?: string): string => {
  if (!type) return '#808080'; // Default gray
  
  switch(type.toLowerCase()) {
    case 'artigo': return '#c30010'; // Vermelho institucional
    case 'dissertacao': return '#0047ab'; // Azul institucional
    case 'tese': return '#00693e'; // Verde institucional
    case 'livros': return '#5a005a'; // Roxo mais escuro
    case 'ebooks': return '#ff5500'; // Laranja mais vibrante
    default: return '#808080';
  }
};

// Função para criar um ícone personalizado para os marcadores
const createCustomIcon = (type?: string): L.DivIcon => {
  const color = getStudyTypeColor(type);
  
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: ${color}; 
        width: 12px; 
        height: 12px; 
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.5);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

interface InteractiveMapProps {
  studies: ResearchStudy[];
  height?: string;
  width?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  studies, 
  height = '650px', // Altura maior para melhor visualização
  width = '100%'
}) => {
  const [selectedStudy, setSelectedStudy] = useState<ResearchStudy | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Coordenadas centrais do Amapá
  const defaultCenter: [number, number] = [1.5, -52.0];
  
  // Agrupar estudos por coordenadas
  const groupedStudies = studies.reduce<Record<string, ResearchStudy[]>>((acc, study) => {
    if (!study.coordinates || 
        !Array.isArray(study.coordinates) || 
        study.coordinates.length !== 2 ||
        typeof study.coordinates[0] !== 'number' || 
        typeof study.coordinates[1] !== 'number') {
      return acc;
    }
    
    const key = `${study.coordinates[0]},${study.coordinates[1]}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(study);
    return acc;
  }, {});

  return (
    <div style={{ height, width, position: 'relative' }} className="leaflet-map-container">
      <div className="absolute top-0 right-0 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 m-2 rounded-md border border-forest-100 text-xs font-semibold text-forest-700">
        Mapa Interativo do Amapá
      </div>
      
      <MapContainer 
        style={{ height: '100%', width: '100%' }}
        center={defaultCenter}
        zoom={6.5}
        scrollWheelZoom={true}
        className="leaflet-map-enhanced"
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Adiciona camada de relevo para mais estilo */}
        <TileLayer
          attribution='&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a>'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          opacity={0.3}
        />
        
        {/* Renderizar marcadores agrupados */}
        {Object.entries(groupedStudies).map(([key, studies], locationIndex) => {
          const [lat, lng] = key.split(',').map(parseFloat);
          
          return studies.map((study, studyIndex) => {
            // Calcular pequeno deslocamento para estudos na mesma localização
            const angleStep = (Math.PI * 2) / studies.length;
            const radius = studies.length > 1 ? 0.01 : 0;
            const angle = angleStep * studyIndex;
            
            const adjustedLat = lat + Math.sin(angle) * radius;
            const adjustedLng = lng + Math.cos(angle) * radius;
            
            return (
              <Marker 
                key={`${study.id}-${studyIndex}`}
                position={[adjustedLat, adjustedLng]}
                icon={createCustomIcon(study.type)}
                eventHandlers={{
                  click: () => setSelectedStudy(study),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">{study.title}</h3>
                    <p className="text-xs">Autor: {study.author}</p>
                    <p className="text-xs">Local: {study.location}</p>
                    {study.type && (
                      <p className="text-xs">Tipo: {study.type}</p>
                    )}
                    {study.repositoryUrl && (
                      <a 
                        href={study.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-forest-600 hover:underline mt-1 inline-block"
                      >
                        Ver repositório
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          });
        })}
        
        {/* Componente para ajustar a visualização do mapa */}
        <MapViewAdjuster studies={studies} />
        
      </MapContainer>
      
      {/* Legenda */}
      <div className="absolute bottom-0 left-0 z-10 bg-white/80 backdrop-blur-sm p-2 m-2 rounded-md border border-forest-100 text-xs">
        <div className="font-semibold mb-1">Tipos de Estudos:</div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getStudyTypeColor('artigo') }}></span>
            <span>Artigo</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getStudyTypeColor('dissertacao') }}></span>
            <span>Dissertação</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getStudyTypeColor('tese') }}></span>
            <span>Tese</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getStudyTypeColor('livros') }}></span>
            <span>Livros</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getStudyTypeColor('ebooks') }}></span>
            <span>E-books</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
