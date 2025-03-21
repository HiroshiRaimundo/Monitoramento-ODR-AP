
import React from "react";
import Map from "@/components/Map";
import { ResearchStudy } from "@/types/research";
import { MapPoint } from "@/types/map";

interface MapDisplaySectionProps {
  studies: ResearchStudy[];
  centerOnAmapa?: boolean;
}

const MapDisplaySection: React.FC<MapDisplaySectionProps> = ({ 
  studies, 
  centerOnAmapa = true 
}) => {
  // Preparar os pontos para o mapa
  const mapPoints = studies.map(study => ({
    id: study.id,
    title: study.title,
    author: study.author,
    coordinates: study.coordinates,
    location: study.location,
    repositoryUrl: study.repositoryUrl,
    type: study.type,
    summary: study.summary
  }));

  return (
    <div className="space-y-4">
      <Map 
        points={mapPoints}
        centerOnAmapa={centerOnAmapa}
      />
    </div>
  );
};

export default MapDisplaySection;
