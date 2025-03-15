
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

  return (
    <div className="flex flex-col gap-4">
      <MapContainer 
        points={points} 
        onSelectPoint={handleSelectPoint} 
      />
      
      <StudyDetail 
        selectedStudies={selectedStudies}
        onRemoveStudy={removeStudyFromList}
      />
    </div>
  );
};

export default Map;
