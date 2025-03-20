
import { MonitoringItem } from "@/hooks/useMonitoring";

// Interface for RecentUpdate
export interface RecentUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  site: string;
  status: "error" | "success" | "warning" | "pending";
}

// Definition of the props interface for InternalDashboard
export interface InternalDashboardProps {
  data: {
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  isAuthenticated: boolean;
  monitoringItems: MonitoringItem[];
  systemUpdatesData: { name: string; updates: number; }[];
  recentAlerts?: RecentUpdate[];
  recentReports?: RecentUpdate[];
}

export interface FilterPanelProps {
  selectedMonitoring: string;
  setSelectedMonitoring: (value: string) => void;
  monitoringItems: MonitoringItem[];
  exportSelectedMonitoring: () => void;
}
