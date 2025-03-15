
import React, { useState, useEffect } from 'react';
import MapContainer from './map/MapContainer';
import StudyDetail from './map/StudyDetail';
import { MapPoint } from '@/types/map';

interface MapProps {
  points?: MapPoint[];
  centerOnAmapa?: boolean;
}

const Map: React.FC<MapProps> = ({ points = [], centerOnAmapa = true }) => {
  const [selectedStudies, setSelectedStudies] = useState<MapPoint[]>([]);
  const [validPoints, setValidPoints] = useState<MapPoint[]>([]);
  
  // Filtrar pontos válidos (com coordenadas)
  useEffect(() => {
    const filtered = points.filter(point => 
      point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2
    );
    
    console.log("Map: Filtrando pontos válidos", points.length, "->", filtered.length);
    setValidPoints(filtered);
  }, [points]);

  const handleSelectPoint = (point: MapPoint) => {
    // Se o ponto já estiver selecionado, não adicione novamente
    if (!selectedStudies.find(study => study.id === point.id)) {
      setSelectedStudies(prev => [...prev, point]);
    }
  };

  const removeStudyFromList = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };

  // Log para depuração
  useEffect(() => {
    console.log("Map: Pontos recebidos:", points.length);
    if (points.length > 0) {
      console.log("Amostra de ponto:", JSON.stringify(points[0]));
    }
  }, [points]);

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-forest-100 rounded-lg overflow-hidden shadow-md">
        <MapContainer 
          points={validPoints} 
          onSelectPoint={handleSelectPoint}
          centerOnAmapa={centerOnAmapa}
        />
      </div>
      
      {selectedStudies.length > 0 && (
        <StudyDetail 
          selectedStudies={selectedStudies}
          onRemoveStudy={removeStudyFromList}
        />
      )}
    </div>
  );
};

export default Map;
