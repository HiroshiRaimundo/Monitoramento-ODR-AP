
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";

export interface BaseTabProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MonitoringTabProps extends BaseTabProps {
  monitoringItems: MonitoringItem[];
  monitoringForm: any;
  handleAddMonitoring: (data: Omit<MonitoringItem, "id">) => void;
  handleDeleteMonitoring: (id: string) => void;
  uniqueResponsibles?: string[];
  responsibleFilter?: string;
  setResponsibleFilter?: (responsible: string) => void;
}

export interface AnalysisTabProps extends BaseTabProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  monitoringItems: MonitoringItem[];
}

export interface MapTabProps extends BaseTabProps {
  studies: ResearchStudy[];
  studyForm: any;
  handleStudySubmit: (data: ResearchStudyFormData) => void;
}

export interface PublicTabProps extends BaseTabProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  studies: ResearchStudy[];
}

export interface PressOfficeTabProps extends BaseTabProps {}

export interface TabContentProps {
  isAuthenticated: boolean;
  timeRange: string;
  setTimeRange: (value: string) => void;
  handleExport: () => void;
  monitoringItems: MonitoringItem[];
  studies: ResearchStudy[];
  monitoringForm: any;
  studyForm: any;
  handleAddMonitoring: (data: Omit<MonitoringItem, "id">) => void;
  handleDeleteMonitoring: (id: string) => void;
  handleStudySubmit: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy: (id: string) => void;
  isLoading: boolean;
  uniqueResponsibles?: string[];
  responsibleFilter?: string;
  setResponsibleFilter?: (responsible: string) => void;
}
