
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Filter } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import SystemUpdatesChart from "../SystemUpdatesChart";
import RecentUpdates from "../RecentUpdates";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RecentUpdate } from "../types/dashboardTypes";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [updateFilter, setUpdateFilter] = useState<string>("all");
  
  // Filter updates based on selected type
  const filteredUpdates = updateFilter === "all" 
    ? displayReports 
    : displayReports.filter(update => update.type === updateFilter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardTitle>Atualizações Detectadas</CardTitle>
          <CardDescription>Histórico de mudanças detectadas pelos monitoramentos</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-96">
            <SystemUpdatesChart data={systemUpdatesData} />
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Increasing spacing between components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Últimas Atualizações</CardTitle>
                <CardDescription>Detalhes das últimas atualizações detectadas</CardDescription>
              </div>
              <Select 
                value={updateFilter} 
                onValueChange={setUpdateFilter}
              >
                <SelectTrigger className="w-[150px] h-8 text-xs">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="content">Conteúdo</SelectItem>
                  <SelectItem value="data">Dados</SelectItem>
                  <SelectItem value="alert">Alertas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <RecentUpdates updates={filteredUpdates} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <span>Alertas de Monitoramento</span>
            </CardTitle>
            <CardDescription>Notificações sobre alterações importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current">
              <TabsList className="mb-4">
                <TabsTrigger value="current">Atual</TabsTrigger>
                <TabsTrigger value="scheduled">Agendado</TabsTrigger>
                <TabsTrigger value="past">Histórico</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current">
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
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled">
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200">
                    <AlertTitle className="text-green-800">Monitoramento Agendado</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Próximo monitoramento do "Diário Oficial" agendado para 15/05/2024
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
              
              <TabsContent value="past">
                <div className="space-y-4">
                  <Alert className="bg-gray-50 border-gray-200">
                    <AlertTitle className="text-gray-800">Alerta Arquivado</AlertTitle>
                    <AlertDescription className="text-gray-700">
                      Alerta de mudança no "Portal da Transparência" (05/05/2024) - Arquivado
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-sm text-muted-foreground mt-4">
              Mostrando alertas dos últimos 7 dias.
              {monitoringItems.length === 0 && " Nenhum monitoramento configurado."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatesTabContent;
