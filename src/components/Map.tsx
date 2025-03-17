
import React, { useState, useEffect } from 'react';
import MapContainer from './map/MapContainer';
import StudyDetail from './map/StudyDetail';
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
  const [displayPoints, setDisplayPoints] = useState<MapPoint[]>([]);
  
  // Processar pontos recebidos
  useEffect(() => {
    console.log(`Map: Recebidos ${points.length} pontos`);
    
    // Filtrar pontos válidos
    const validPoints = points.filter(point => 
      point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2 &&
      !isNaN(point.coordinates[0]) && 
      !isNaN(point.coordinates[1])
    );
    
    console.log(`Map: ${validPoints.length} pontos válidos para exibir`);
    
    // Atualizar pontos para exibição
    setDisplayPoints(validPoints);
  }, [points]);
  
  // Handler para seleção de ponto no mapa
  const handleSelectPoint = (point: MapPoint) => {
    // Se onSelectPoint foi fornecido, usar
    if (onSelectPoint) {
      onSelectPoint(point);
      return;
    }
    
    // Verificar se o ponto já está selecionado
    const alreadySelected = selectedStudies.some(study => study.id === point.id);
    
    if (!alreadySelected) {
      console.log(`Selecionado: ${point.title}`);
      setSelectedStudies(prev => [...prev, point]);
    }
  };
  
  // Handler para remover estudo da lista
  const handleRemoveStudy = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="border border-forest-100 rounded-lg overflow-hidden shadow-md">
        <MapContainer 
          points={displayPoints} 
          onSelectPoint={handleSelectPoint}
          centerOnAmapa={centerOnAmapa}
        />
      </div>
      
      {/* Mostrar detalhes apenas se não foi fornecido um handler externo */}
      {!onSelectPoint && selectedStudies.length > 0 && (
        <StudyDetail 
          selectedStudies={selectedStudies}
          onRemoveStudy={handleRemoveStudy}
        />
      )}
    </div>
  );
};

export default Map;
