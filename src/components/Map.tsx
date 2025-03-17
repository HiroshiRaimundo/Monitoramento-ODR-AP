<<<<<<< Updated upstream

import React from 'react';
import MapContainer from './map/MapContainer';
=======
import React, { useState, useEffect } from 'react';
import MapContainer from './map/MapContainer';
import StudyDetail from './map/StudyDetail';
import AddStudyForm from './AddStudyForm';
>>>>>>> Stashed changes
import { MapPoint } from '@/types/map';

interface MapProps {
  points: MapPoint[];
  centerOnAmapa?: boolean;
  onSelectPoint?: (point: MapPoint) => void;
}

<<<<<<< Updated upstream
const Map: React.FC<MapProps> = ({ 
  points,
  centerOnAmapa = true,
  onSelectPoint = () => {} // Valor padrão para evitar erros
}) => {
=======
const Map: React.FC<MapProps> = ({ points = [], centerOnAmapa = true }) => {
  const [selectedStudies, setSelectedStudies] = useState<MapPoint[]>([]);
  const [validPoints, setValidPoints] = useState<MapPoint[]>([]);
  const [allPoints, setAllPoints] = useState<MapPoint[]>(points);

  // Filtrar pontos válidos (com coordenadas)
  useEffect(() => {
    const filtered = allPoints.filter(point => 
      point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2
    );
    
    console.log("Map: Filtrando pontos válidos", allPoints.length, "->", filtered.length);
    console.log("Map: Pontos válidos filtrados:", filtered);
    setValidPoints(filtered);
  }, [allPoints]);

  const handleSelectPoint = (point: MapPoint) => {
    // Se o ponto já estiver selecionado, não adicione novamente
    if (!selectedStudies.find(study => study.id === point.id)) {
      setSelectedStudies(prev => [...prev, point]);
    }
  };

  const removeStudyFromList = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };

  const handleAddStudy = (newPoint: MapPoint) => {
    setAllPoints(prev => [...prev, newPoint]);
  };

>>>>>>> Stashed changes
  // Log para depuração
  console.log("Map: Recebendo", points.length, "pontos");
  
  return (
<<<<<<< Updated upstream
    <MapContainer 
      points={points} 
      centerOnAmapa={centerOnAmapa}
      onSelectPoint={onSelectPoint}
    />
=======
    <div className="flex flex-col gap-4">
      <AddStudyForm onAddStudy={handleAddStudy} />
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
>>>>>>> Stashed changes
  );
};

export default Map;
