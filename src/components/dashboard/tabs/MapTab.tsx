
import React from "react";
import MapView from "@/components/MapView";
import { ResearchStudy } from "@/types/research";

interface MapTabProps {
  studies: ResearchStudy[];
  isAuthenticated: boolean;
  handleStudySubmit?: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
}

const MapTab: React.FC<MapTabProps> = ({
  studies,
  isAuthenticated,
  handleStudySubmit
}) => {
  return (
    <MapView 
      studies={studies} 
      isAuthenticated={isAuthenticated}
      onStudySubmit={isAuthenticated ? handleStudySubmit : undefined}
    />
  );
};

export default MapTab;
