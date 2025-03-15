
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

export interface RecentUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  site: string;
  status: "error" | "success" | "warning" | "pending";
}

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
  let StatusIcon = PackageCheck;
  
  if (status === "error") StatusIcon = AlertTriangle;
  else if (status === "success") StatusIcon = CheckCircle;
  else if (status === "warning") StatusIcon = Clock;

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
        <StatusIcon className="h-5 w-5 text-gray-500" />
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
  recentAlerts: RecentUpdate[];
  recentReports: RecentUpdate[];
  monitoringItems?: any[];
  categoryData?: any[];
  frequencyData?: any[];
  responsibleData?: any[];
  radarData?: any[];
  analysisStats?: any[];
}

const ChartsTabs: React.FC<ChartsTabsProps> = ({ 
  systemUpdatesData, 
  recentAlerts, 
  recentReports,
  // Added props for future use
  monitoringItems,
  categoryData,
  frequencyData,
  responsibleData,
  radarData,
  analysisStats
}) => {
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
              <RecentAlert 
                key={alert.id} 
                title={alert.title}
                description={alert.description}
                date={alert.date}
                type={alert.type}
                site={alert.site}
                status={alert.status}
              />
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
              <RecentReport 
                key={report.id}
                title={report.title}
                description={report.description}
                date={report.date}
                type={report.type}
                site={report.site}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsTabs;
