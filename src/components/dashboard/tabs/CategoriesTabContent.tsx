
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Activity, ServerCrash } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import CategoryChart from "../CategoryChart";
import SourceTypeChart from "../SourceTypeChart";
import ResearchersChart from "../ResearchersChart";
import { MonitoringItem } from "@/hooks/useMonitoring";

interface CategoriesTabContentProps {
  categoryData?: { name: string; value: number }[];
  radarData?: { subject: string; A: number; fullMark: number }[];
  responsibleData?: { responsible: string; monitoramentos: number; institution: string }[];
  monitoringItems: MonitoringItem[];
}

const CategoriesTabContent: React.FC<CategoriesTabContentProps> = ({
  categoryData,
  radarData,
  responsibleData,
  monitoringItems,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Categorias</CardTitle>
          <CardDescription>Monitoramentos agrupados por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <CategoryChart data={categoryData || []} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tipos de Fontes</CardTitle>
          <CardDescription>Distribuição por tipos de fontes monitoradas</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <SourceTypeChart data={radarData || []} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Por Responsável</CardTitle>
          <CardDescription>Monitoramentos agrupados por responsável</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <ResearchersChart data={responsibleData || []} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ServerCrash className="h-5 w-5 text-forest-600" />
            <span>Estado dos Monitoramentos</span>
          </CardTitle>
          <CardDescription>Status atual de todos os monitoramentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{monitoringItems.filter(item => item.category === "api").length}</div>
                <div className="text-sm text-green-700">Monitoramentos Ativos</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <div className="text-sm text-yellow-700">Requerem Atenção</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{monitoringItems.filter(item => item.frequency === "diario").length}</div>
                <div className="text-sm text-blue-700">Atualizações Diárias</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-sm text-red-700">Falhas Críticas</div>
              </div>
            </div>

            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Resumo de Estado
              </AlertTitle>
              <AlertDescription>
                {monitoringItems.length > 0 
                  ? "Todos os sistemas de monitoramento estão funcionando normalmente." 
                  : "Nenhum monitoramento configurado até o momento."}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesTabContent;
