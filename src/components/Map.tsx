
import React, { useState } from 'react';
import MapContainer from './map/MapContainer';
import StudyDetail from './map/StudyDetail';
import { MapPoint } from '@/types/map';

interface MapProps {
  points?: MapPoint[];
}

const Map: React.FC<MapProps> = ({ points = [] }) => {
  const [selectedStudies, setSelectedStudies] = useState<MapPoint[]>([]);

  const handleSelectPoint = (point: MapPoint) => {
    if (!selectedStudies.find(study => study.id === point.id)) {
      setSelectedStudies(prev => [...prev, point]);
    }
  };

  const removeStudyFromList = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };

  // Making sure all points have valid coordinates
  const validPoints = points.filter(point => 
    point.coordinates && 
    Array.isArray(point.coordinates) && 
    point.coordinates.length === 2 &&
    typeof point.coordinates[0] === 'number' && 
    typeof point.coordinates[1] === 'number'
  );

  if (validPoints.length !== points.length) {
    console.warn(`Filtered out ${points.length - validPoints.length} invalid map points`);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mapa com altura fixa para melhor visualização */}
      <MapContainer 
        points={validPoints} 
        onSelectPoint={handleSelectPoint} 
      />
      
      {/* Lista de estudos selecionados */}
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
