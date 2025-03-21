
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import InternalDashboard from "../InternalDashboard";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { RecentUpdate } from "../ChartsTabs";

interface AnaliseTabContentProps {
  isAuthenticated: boolean;
  data: {
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  monitoringItems: MonitoringItem[];
}

const AnaliseTabContent: React.FC<AnaliseTabContentProps> = ({
  isAuthenticated,
  data,
  timeRange,
  setTimeRange,
  handleExport,
  monitoringItems
}) => {
  // Se não estiver autenticado, não mostrar o conteúdo
  if (!isAuthenticated) return null;

  // Gerar dados simulados para gráficos e estatísticas
  const systemUpdatesData = [
    { name: "Janeiro", updates: 65 },
    { name: "Fevereiro", updates: 48 },
    { name: "Março", updates: 73 },
    { name: "Abril", updates: 82 },
    { name: "Maio", updates: 54 }
  ];

  // Alertas recentes simulados
  const recentAlerts: RecentUpdate[] = [
    { id: "1", title: "Falha na API Diário Oficial", description: "Não foi possível acessar a fonte de dados", date: "2024-05-10", type: "monitor", site: "diario-oficial-ap.com", status: "error" },
    { id: "2", title: "Atualização necessária", description: "Monitoramento IBGE requer atualização", date: "2024-05-09", type: "update", site: "ibge.gov.br", status: "warning" },
    { id: "3", title: "Portal Transparência atualizado", description: "Novos dados disponíveis", date: "2024-05-08", type: "spider", site: "transparencia.ap.gov.br", status: "success" }
  ];

  // Relatórios recentes simulados
  const recentReports: RecentUpdate[] = [
    { id: "4", title: "Relatório mensal completo", description: "Análise de todos os monitoramentos", date: "2024-05-01", site: "interno", status: "success", type: "report" },
    { id: "5", title: "Análise de tendências", description: "Compilação de dados históricos", date: "2024-04-28", site: "interno", status: "success", type: "analysis" },
    { id: "6", title: "Relatório semanal pendente", description: "Aguardando dados de 3 fontes", date: "2024-05-11", site: "interno", status: "pending", type: "report" }
  ];

  return (
    <TabsContent value="analise">
      <InternalDashboard 
        data={data}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
        monitoringItems={monitoringItems}
        systemUpdatesData={systemUpdatesData}
        recentAlerts={recentAlerts}
        recentReports={recentReports}
      />
    </TabsContent>
  );
};

export default AnaliseTabContent;
