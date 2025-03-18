
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import SystemUpdatesChart from "../SystemUpdatesChart";
import CategoryChart from "../CategoryChart";
import FrequencyChart from "../FrequencyChart";
import RecentMonitorings from "../RecentMonitorings";
import RecentUpdates, { RecentUpdate } from "../RecentUpdates";
import { MonitoringItem } from "@/hooks/useMonitoring";

interface OverviewTabContentProps {
  systemUpdatesData: { name: string; updates: number }[];
  categoryData?: { name: string; value: number }[];
  frequencyData?: { frequency: string; quantidade: number }[];
  monitoringItems: MonitoringItem[];
  recentAlerts: RecentUpdate[];
}

const OverviewTabContent: React.FC<OverviewTabContentProps> = ({
  systemUpdatesData,
  categoryData,
  frequencyData,
  monitoringItems,
  recentAlerts,
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

      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Categorias</CardTitle>
          <CardDescription>Monitoramentos agrupados por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-60">
            <CategoryChart data={categoryData || []} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Frequência</CardTitle>
          <CardDescription>Monitoramentos agrupados por frequência de atualização</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-60">
            <FrequencyChart data={frequencyData || []} />
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monitoramentos Recentes</CardTitle>
          <CardDescription>Últimos monitoramentos adicionados</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentMonitorings monitorings={monitoringItems} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atualizações Recentes</CardTitle>
          <CardDescription>Últimas alterações detectadas nos monitoramentos</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentUpdates updates={recentAlerts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTabContent;
