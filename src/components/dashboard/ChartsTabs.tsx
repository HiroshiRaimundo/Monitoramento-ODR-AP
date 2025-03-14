import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  ArrowUp,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  PackageCheck,
  ShoppingCart,
  ServerCrash,
  ServerOff,
  LucideIcon,
} from "lucide-react";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { mapToStatusEnum } from "@/lib/chartUtils";

interface SystemUpdatesProps {
  data: Array<{
    name: string;
    updates: number;
  }>;
}

interface StatusProps {
  status: "error" | "success" | "warning" | "pending";
}

interface AlertProps {
  title: string;
  description: string;
  date: string;
  type: string;
  site: string;
  status: "error" | "success" | "warning" | "pending";
}

interface ReportProps {
  title: string;
  description: string;
  date: string;
  type: string;
  site: string;
}

interface CardProps {
  title: string;
  value: string;
  percentageChange: number;
  positive: boolean;
  icon: LucideIcon;
}

const statusColors = {
  error: "bg-red-100 text-red-500",
  success: "bg-green-100 text-green-500",
  warning: "bg-yellow-100 text-yellow-500",
  pending: "bg-gray-100 text-gray-500",
};

const RecentAlert: React.FC<AlertProps> = ({ title, description, date, type, site, status }) => {
  const statusColor = statusColors[status] || statusColors.pending;
  const statusIcon =
    status === "error" ? AlertTriangle :
    status === "success" ? CheckCircle :
    status === "warning" ? Clock : PackageCheck;

  return (
    <li className="py-2 border-b border-gray-200 last:border-none">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
          <div className="mt-1 flex items-center space-x-2">
            <Badge className={`text-xs ${statusColor}`}>{status}</Badge>
            <span className="text-gray-500 text-xs">{date}</span>
          </div>
        </div>
        <statusIcon className="h-5 w-5 text-gray-500" />
      </div>
    </li>
  );
};

const RecentReport: React.FC<ReportProps> = ({ title, description, date, type, site }) => {
  return (
    <li className="py-2 border-b border-gray-200 last:border-none">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
          <div className="mt-1 flex items-center space-x-2">
            <span className="text-gray-500 text-xs">{date}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

const SystemUpdatesChart: React.FC<SystemUpdatesProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins">Atualizações do Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {data.map((item) => (
            <li key={item.name} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{item.name}</span>
              <div className="flex items-center">
                <span className="text-xs font-bold text-gray-700 mr-2">{item.updates}</span>
                <Sparklines data={[5, 10, 5, 20, 8, 15, 10]} limit={7} width={60} height={24} margin={5}>
                  <SparklinesLine color="#4338ca" />
                </Sparklines>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const OverviewCard: React.FC<CardProps> = ({ title, value, percentageChange, positive, icon: Icon }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500 flex items-center">
          {positive ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span>{percentageChange}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface ChartsTabsProps {
  systemUpdatesData: Array<{ name: string; updates: number }>;
  recentAlerts: Array<{
    title: string;
    description: string;
    date: string;
    type: string;
    site: string;
    status: string;
  }>;
  recentReports: Array<{
    title: string;
    description: string;
    date: string;
    type: string;
    site: string;
  }>;
}

const ChartsTabs: React.FC<ChartsTabsProps> = ({ systemUpdatesData, recentAlerts, recentReports }) => {
  const recentUpdates = [
    {
      id: "update-1",
      title: "Atualização do Monitoramento de Dados IBGE",
      description: "Atualização automática de dados socioeconômicos do IBGE",
      date: "2023-05-15",
      type: "api",
      site: "IBGE",
      status: mapToStatusEnum("success")
    },
    {
      id: "update-2",
      title: "Correção de Bugs no Módulo de Análise Preditiva",
      description: "Implementação de hotfix para evitar falsos positivos",
      date: "2023-05-10",
      type: "code",
      site: "Sistema Interno",
      status: mapToStatusEnum("error")
    },
    {
      id: "update-3",
      title: "Implementação de Novo Algoritmo de Detecção de Anomalias",
      description: "Novo algoritmo para identificar padrões incomuns nos dados",
      date: "2023-05-05",
      type: "algorithm",
      site: "Servidor de Análise",
      status: mapToStatusEnum("warning")
    },
    {
      id: "update-4",
      title: "Migração para Servidores Mais Robustos",
      description: "Transferência de dados para servidores com maior capacidade de processamento",
      date: "2023-04-28",
      type: "infrastructure",
      site: "Data Center",
      status: mapToStatusEnum("pending")
    }
  ];

  const otherUpdates = [
    {
      id: "recent-1",
      title: "Monitoramento API Transparência",
      description: "Coleta automática completada",
      date: "2023-06-01",
      type: "api",
      site: "Transparência Gov",
      status: mapToStatusEnum("success")
    },
    {
      id: "recent-2",
      title: "Relatório de Desmatamento",
      description: "Dados de satélite processados",
      date: "2023-05-28",
      type: "relatório",
      site: "INPE",
      status: mapToStatusEnum("success")
    },
    {
      id: "recent-3",
      title: "Alerta de Qualidade da Água",
      description: "Níveis de poluentes acima do normal",
      date: "2023-05-25",
      type: "alerta",
      site: "ANA",
      status: mapToStatusEnum("error")
    },
    {
      id: "recent-4",
      title: "Atualização da Legislação Ambiental",
      description: "Novas leis e decretos publicados",
      date: "2023-05-20",
      type: "legislação",
      site: "Diário Oficial",
      status: mapToStatusEnum("warning")
    }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Visitas ao Site"
          value="2,456"
          percentageChange={12.5}
          positive={true}
          icon={TrendingUp}
        />
        <OverviewCard
          title="Novos Usuários"
          value="345"
          percentageChange={8.7}
          positive={true}
          icon={ShoppingCart}
        />
        <OverviewCard
          title="Alertas Ativos"
          value="12"
          percentageChange={-3.2}
          positive={false}
          icon={ServerCrash}
        />
        <OverviewCard
          title="Servidores Offline"
          value="2"
          percentageChange={0}
          positive={false}
          icon={ServerOff}
        />
      </div>

      <SystemUpdatesChart data={systemUpdatesData} />

      <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <CardTitle className="text-forest-700 font-poppins">Alertas Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ul>
            {recentAlerts.map((alert) => (
              <RecentAlert key={alert.title} {...alert} />
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <CardTitle className="text-forest-700 font-poppins">Relatórios Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ul>
            {recentReports.map((report) => (
              <RecentReport key={report.title} {...report} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsTabs;
