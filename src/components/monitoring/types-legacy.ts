
export interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  responsible?: string;
  institution?: string;
  keywords?: string;
}

export interface MonitoringListProps {
  items: MonitoringItem[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
  uniqueResponsibles?: string[];
  responsibleFilter?: string;
  onFilterChange?: (responsible: string) => void;
}
