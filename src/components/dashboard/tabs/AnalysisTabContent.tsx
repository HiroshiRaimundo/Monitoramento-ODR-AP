
import React from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { AnalysisStats } from "../types/dashboardTypes";
import AnalysisStatsCard from "../analysis/AnalysisStatsCard";
import MonitoringListCard from "../analysis/MonitoringListCard";
import AnalysisToolsCard from "../analysis/AnalysisToolsCard";
import AnalysisReportsCard from "../analysis/AnalysisReportsCard";

interface AnalysisTabContentProps {
  monitoringItems: MonitoringItem[];
  analysisStats: AnalysisStats;
}

const AnalysisTabContent: React.FC<AnalysisTabContentProps> = ({
  monitoringItems,
  analysisStats
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Analysis Statistics Card */}
      <AnalysisStatsCard analysisStats={analysisStats} />
      
      {/* Monitoring List Card */}
      <div className="col-span-2">
        <MonitoringListCard monitoringItems={monitoringItems} />
      </div>

      {/* Analysis Tools Card */}
      <AnalysisToolsCard monitoringItems={monitoringItems} />

      {/* Analysis Reports Card */}
      <AnalysisReportsCard />
    </div>
  );
};

export default AnalysisTabContent;
