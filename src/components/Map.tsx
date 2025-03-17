
import React, { useState, useEffect } from 'react';
import MapContainer from './map/MapContainer';
import StudyDetail from './map/StudyDetail';
import AddStudyForm from './AddStudyForm';
import { MapPoint } from '@/types/map';

interface MapProps {
  points: MapPoint[];
  centerOnAmapa?: boolean;
  onSelectPoint?: (point: MapPoint) => void;
}

const Map: React.FC<MapProps> = ({ 
  points = [], 
  centerOnAmapa = true, 
  onSelectPoint
}) => {
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

  // Atualizar allPoints quando points mudar
  useEffect(() => {
    console.log("Map: Recebendo novos pontos:", points.length);
    setAllPoints(points);
  }, [points]);

  const handleSelectPoint = (point: MapPoint) => {
    // Se onSelectPoint foi fornecido, use-o
    if (onSelectPoint) {
      onSelectPoint(point);
      return;
    }
    
    // Se não, use a lógica interna
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
  
  // Log para depuração
  console.log("Map: Renderizando com", validPoints.length, "pontos válidos");
  
  return (
    <div className="flex flex-col gap-4">
      {!onSelectPoint && <AddStudyForm onAddStudy={handleAddStudy} />}
      <div className="border border-forest-100 rounded-lg overflow-hidden shadow-md">
        <MapContainer 
          points={validPoints} 
          onSelectPoint={handleSelectPoint}
          centerOnAmapa={centerOnAmapa}
        />
      </div>
      
      {!onSelectPoint && selectedStudies.length > 0 && (
        <StudyDetail 
          selectedStudies={selectedStudies}
          onRemoveStudy={removeStudyFromList}
        />
      )}
    </div>
  );
};

export default Map;
