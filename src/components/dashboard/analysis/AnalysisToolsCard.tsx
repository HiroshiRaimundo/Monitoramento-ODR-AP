
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnalysisTools from "@/components/dashboard/AnalysisTools";
import { AnalysisToolsCardProps } from "../types/dashboardTypes";

const AnalysisToolsCard: React.FC<AnalysisToolsCardProps> = ({ monitoringItems }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ferramentas de Análise</CardTitle>
        <CardDescription>Ferramentas disponíveis para análise de dados</CardDescription>
      </CardHeader>
      <CardContent>
        <AnalysisTools monitoringItems={monitoringItems} />
      </CardContent>
    </Card>
  );
};

export default AnalysisToolsCard;
