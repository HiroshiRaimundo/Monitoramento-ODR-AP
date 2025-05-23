
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ChartContainer } from "@/components/ui/chart";
import CategoryChart from "../CategoryChart";
import FrequencyChart from "../FrequencyChart";
import SystemUpdatesChart from "../SystemUpdatesChart";
import RecentMonitorings from "../RecentMonitorings";
import RecentUpdates from "../RecentUpdates";
import { RecentUpdate } from "../types/dashboardTypes";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface OverviewTabContentProps {
  monitoringItems: MonitoringItem[];
  categoryData?: { name: string; value: number }[];
  frequencyData?: { frequency: string; quantidade: number }[];
  systemUpdatesData: { name: string; updates: number }[];
  displayAlerts: RecentUpdate[];
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  monitoringItems,
  categoryData,
  frequencyData,
  systemUpdatesData,
  displayAlerts
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Atualizações do Sistema</CardTitle>
          <CardDescription>Monitoramento de atualizações ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <SystemUpdatesChart data={systemUpdatesData} />
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Aumentando o espaçamento na grid para evitar sobreposição */}
      <div className="grid grid-cols-1 gap-12 col-span-2 md:grid-cols-2 mt-28">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Distribuição por Categorias</CardTitle>
            <CardDescription>Monitoramentos agrupados por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-96">
              <CategoryChart data={categoryData || []} />
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Distribuição por Frequência</CardTitle>
            <CardDescription>Monitoramentos agrupados por frequência de atualização</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-96">
              <FrequencyChart data={frequencyData || []} />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Aumentando o espaçamento entre os blocos para evitar sobreposição */}
      <div className="grid grid-cols-1 gap-12 col-span-2 md:grid-cols-2 mt-28">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monitoramentos Recentes</CardTitle>
            <CardDescription>Últimos monitoramentos adicionados</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentMonitorings monitorings={monitoringItems} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Atualizações Recentes</CardTitle>
            <CardDescription>Últimas alterações detectadas nos monitoramentos</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUpdates updates={displayAlerts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTabContent;
