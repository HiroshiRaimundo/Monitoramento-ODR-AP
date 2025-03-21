
import React from "react";
import MapView from "@/components/MapView";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";

interface MapTabProps {
  studies: ResearchStudy[];
  isAuthenticated: boolean;
  handleStudySubmit?: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleEditStudy?: (id: string, data: ResearchStudyFormData) => void;
  handleDeleteStudy?: (id: string) => void;
}

const MapTab: React.FC<MapTabProps> = ({
  studies,
  isAuthenticated,
  handleStudySubmit,
  handleEditStudy,
  handleDeleteStudy
}) => {
  return (
    <div className="space-y-6">
      <MapView 
        studies={studies} 
        isAuthenticated={isAuthenticated}
        onStudySubmit={isAuthenticated ? handleStudySubmit : undefined}
      />
    </div>
  );
};

export default MapTab;
