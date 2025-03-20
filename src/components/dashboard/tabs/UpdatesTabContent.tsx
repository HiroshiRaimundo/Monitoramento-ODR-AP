
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import SystemUpdatesChart from "../SystemUpdatesChart";
import RecentUpdates from "../RecentUpdates";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RecentUpdate } from "../types/dashboardTypes";
import { MonitoringItem } from "@/hooks/useMonitoring";

interface UpdatesTabContentProps {
  systemUpdatesData: { name: string; updates: number }[];
  displayReports: RecentUpdate[];
  monitoringItems: MonitoringItem[];
}

const UpdatesTabContent: React.FC<UpdatesTabContentProps> = ({
  systemUpdatesData,
  displayReports,
  monitoringItems
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Atualizações Detectadas</CardTitle>
          <CardDescription>Histórico de mudanças detectadas pelos monitoramentos</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <SystemUpdatesChart data={systemUpdatesData} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Atualizações</CardTitle>
          <CardDescription>Detalhes das últimas atualizações detectadas</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentUpdates updates={displayReports} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span>Alertas de Monitoramento</span>
          </CardTitle>
          <CardDescription>Notificações sobre alterações importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTitle className="text-yellow-800">Mudança de Conteúdo Detectada</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Alteração significativa detectada em "Portal de Transparência" (10/05/2024)
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle className="text-blue-800">Nova Coleta Programada</AlertTitle>
              <AlertDescription className="text-blue-700">
                Próxima coleta do monitoramento "IBGE - Indicadores" programada para 12/05/2024
              </AlertDescription>
            </Alert>
            
            <div className="text-sm text-muted-foreground mt-4">
              Mostrando alertas dos últimos 7 dias.
              {monitoringItems.length === 0 && " Nenhum monitoramento configurado."}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatesTabContent;
