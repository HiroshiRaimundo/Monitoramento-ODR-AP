
import React, { useState, useEffect } from "react";
import { ResearchStudy } from "@/types/research";
import DashboardControls from "./DashboardControls";
import DashboardHeader from "./public/DashboardHeader";
import ChartsSection from "./public/ChartsSection";
import MapSection from "./public/MapSection";
import InterpretationGuide from "./public/InterpretationGuide";
import { filterStudiesByTimeRange } from "./public/utils/dataUtils";

interface PublicDashboardProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  timeRange: string;
  setTimeRange: (value: string) => void;
  isAuthenticated: boolean;
  studies: ResearchStudy[];
  mapData?: ResearchStudy[]; // Dados para o mapa
}

const PublicDashboard: React.FC<PublicDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  isAuthenticated,
  studies,
  mapData = studies // Por padrão, usa os mesmos estudos
}) => {
  const [filteredMapData, setFilteredMapData] = useState<ResearchStudy[]>(mapData);

  useEffect(() => {
    const filtered = filterStudiesByTimeRange(mapData, timeRange);
    console.log("PublicDashboard: Filtrando dados do mapa", mapData.length, "->", filtered.length);
    setFilteredMapData(filtered);
  }, [timeRange, mapData]);

  return (
    <div className="grid gap-6 font-poppins">
      <DashboardHeader studies={studies} />

      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={() => {}}
        isAuthenticated={false}
        totalItems={studies.length}
        isPublic={true}
      />

      <ChartsSection data={data} studies={studies} />
      
      <MapSection filteredMapData={filteredMapData} />

      <InterpretationGuide />
    </div>
  );
};

export default PublicDashboard;
