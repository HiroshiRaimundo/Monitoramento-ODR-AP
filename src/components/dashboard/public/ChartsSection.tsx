
import React from "react";
import StudiesChart from "../StudiesChart";
import CategoryChart from "../CategoryChart";
import MonitoringLineChart from "../MonitoringLineChart";
import CollaborationChart from "../CollaborationChart";
import { ResearchStudy } from "@/types/research";
import { 
  processStudyCategories, 
  processMonitoringData, 
  processCollaborationData 
} from "./utils/dataUtils";

interface ChartsSectionProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  studies: ResearchStudy[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ data, studies }) => {
  const studyCategories = processStudyCategories(studies);
  const monitoringData = processMonitoringData(data);
  const collaborationData = processCollaborationData(studies);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StudiesChart data={data} />
      <CategoryChart data={studyCategories} title="Estudos por Categoria" />
      <MonitoringLineChart data={monitoringData} />
      <CollaborationChart 
        authors={collaborationData.authors} 
        institutions={collaborationData.institutions} 
      />
    </div>
  );
};

export default ChartsSection;
