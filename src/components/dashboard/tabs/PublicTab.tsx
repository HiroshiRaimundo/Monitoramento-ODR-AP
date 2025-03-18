
import React from "react";
import { PublicTabProps } from "../types";
import PublicDashboard from "@/components/dashboard/PublicDashboard";

const PublicTab: React.FC<PublicTabProps> = ({ 
  timeRange, 
  setTimeRange, 
  isAuthenticated,
  studies 
}) => {
  // Import simulated data from mockData
  const { simulatedMonthlyData } = require("../mockData");

  return (
    <PublicDashboard 
      data={simulatedMonthlyData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      isAuthenticated={isAuthenticated}
      studies={studies}
    />
  );
};

export default PublicTab;
