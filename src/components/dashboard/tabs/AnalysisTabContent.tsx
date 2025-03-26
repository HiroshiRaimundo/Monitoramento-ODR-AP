
import React from "react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { AnalysisStats } from "../types/dashboardTypes";
import AnalysisStatsCard from "../analysis/AnalysisStatsCard";
import MonitoringListCard from "../analysis/MonitoringListCard";

interface AnalysisTabContentProps {
  monitoringItems: MonitoringItem[];
  analysisStats: AnalysisStats;
}

const AnalysisTabContent: React.FC<AnalysisTabContentProps> = ({
  monitoringItems,
  analysisStats
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Analysis Statistics Card */}
      <AnalysisStatsCard analysisStats={analysisStats} />
      
      {/* Monitoring List Card */}
      <div className="col-span-1">
        <MonitoringListCard monitoringItems={monitoringItems} />
      </div>
    </div>
  );
};

export default AnalysisTabContent;
