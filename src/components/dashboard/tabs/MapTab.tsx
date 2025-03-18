
import React from "react";
import { MapTabProps } from "../types";
import MapView from "@/components/MapView";

const MapTab: React.FC<MapTabProps> = ({ 
  studies, 
  isAuthenticated,
  studyForm,
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
