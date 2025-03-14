
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import PublicDashboard from "../PublicDashboard";
import { ResearchStudy } from "@/types/research";

interface PublicoTabContentProps {
  data: {
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  isAuthenticated: boolean;
  studies: ResearchStudy[];
  mapData: ResearchStudy[];
}

const PublicoTabContent: React.FC<PublicoTabContentProps> = ({ 
  data,
  timeRange,
  setTimeRange,
  isAuthenticated,
  studies,
  mapData
}) => {
  return (
    <TabsContent value="publico">
      <PublicDashboard 
        data={data}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isAuthenticated={isAuthenticated}
        studies={studies}
        mapData={mapData}
      />
    </TabsContent>
  );
};

export default PublicoTabContent;
