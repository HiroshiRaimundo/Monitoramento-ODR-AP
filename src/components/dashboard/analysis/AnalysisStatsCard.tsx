
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { AnalysisStatsCardProps } from "../types/dashboardTypes";

const AnalysisStatsCard: React.FC<AnalysisStatsCardProps> = ({ analysisStats }) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-forest-600" />
          <span>Análises Ativas por Monitoramento</span>
        </CardTitle>
        <CardDescription>Resumo dos tipos de análise configurados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-forest-600">{analysisStats.contentAnalysis}</div>
            <div className="text-sm text-forest-700">Análise de Conteúdo</div>
          </div>
          <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-forest-600">{analysisStats.sentimentAnalysis}</div>
            <div className="text-sm text-forest-700">Análise de Sentimento</div>
          </div>
          <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-forest-600">{analysisStats.crossAnalysis}</div>
            <div className="text-sm text-forest-700">Análise Cruzada</div>
          </div>
          <div className="bg-forest-50 p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-forest-600">{analysisStats.nlpAnalysis}</div>
            <div className="text-sm text-forest-700">Processamento de Linguagem Natural</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisStatsCard;
