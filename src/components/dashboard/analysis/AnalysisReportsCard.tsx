
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisReportsCardProps } from "../types/dashboardTypes";

const AnalysisReportsCard: React.FC<AnalysisReportsCardProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios de Análise</CardTitle>
        <CardDescription>Relatórios gerados a partir dos monitoramentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border border-forest-100 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Relatório Mensal - Maio/2024</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Disponível</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Resumo completo dos dados coletados em todos os monitoramentos durante o mês.
            </p>
            <div className="flex justify-end">
              <button className="text-xs px-3 py-1 bg-forest-600 text-white rounded">
                Download
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-forest-100 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Análise Comparativa - Q1 2024</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Disponível</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Comparação dos dados do primeiro trimestre de 2024 com períodos anteriores.
            </p>
            <div className="flex justify-end">
              <button className="text-xs px-3 py-1 bg-forest-600 text-white rounded">
                Download
              </button>
            </div>
          </div>
          
          <div className="p-4 border border-dashed border-forest-200 rounded-lg space-y-2 bg-forest-50/50">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-muted-foreground">Relatório Semestral</h3>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Em preparação</span>
            </div>
            <p className="text-sm text-muted-foreground">
              O relatório semestral será gerado automaticamente em 30/06/2024.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisReportsCard;
