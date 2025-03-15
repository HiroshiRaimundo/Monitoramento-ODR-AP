
import React, { useState } from 'react';
import MapContainer from './map/MapContainer';
import StudyDetail from './map/StudyDetail';
import { MapPoint } from '@/types/map';
import SearchPanel from './map/SearchPanel';

interface MapProps {
  points?: MapPoint[];
  centerOnAmapa?: boolean;
}

const Map: React.FC<MapProps> = ({ points = [], centerOnAmapa = false }) => {
  const [selectedStudies, setSelectedStudies] = useState<MapPoint[]>([]);

  const handleSelectPoint = (point: MapPoint) => {
    // Se o ponto já estiver selecionado, não adicione novamente
    if (!selectedStudies.find(study => study.id === point.id)) {
      setSelectedStudies(prev => [...prev, point]);
    }
  };

  const removeStudyFromList = (studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-forest-100 rounded-lg overflow-hidden shadow-md">
        <MapContainer 
          points={points} 
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
