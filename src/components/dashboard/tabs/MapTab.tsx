
import React from "react";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";

interface MapTabProps {
  studies: ResearchStudy[];
  isAuthenticated: boolean;
  handleStudySubmit?: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy?: (id: string) => void;
}

const MapTab: React.FC<MapTabProps> = ({
  studies,
  isAuthenticated,
  handleStudySubmit,
  handleDeleteStudy
}) => {
  return (
    <div className="space-y-6">
      <MapView 
        studies={studies} 
        isAuthenticated={isAuthenticated}
        onStudySubmit={isAuthenticated ? handleStudySubmit : undefined}
        onStudyDelete={isAuthenticated ? handleDeleteStudy : undefined}
      />
    </div>
  );
};

export default MapTab;
