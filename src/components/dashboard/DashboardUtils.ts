
// Este arquivo agora apenas re-exporta funções de arquivos mais específicos

import { getCategoryData } from "@/lib/categoryUtils";
import { getFrequencyData } from "@/lib/frequencyUtils";
import { getResponsibleData, getMonitoringsByResearcher, simulatedResearchers } from "@/lib/researcherUtils";
import { getRadarData, getAnalysisTypeStats } from "@/lib/analysisUtils";
import { COLORS } from "@/lib/chartConstants";
import { getRecentAlerts, getRecentReports } from "@/lib/alertsUtils";

// Re-exportar todas as funções para manter a compatibilidade
export { 
  getCategoryData,
  getFrequencyData,
  getResponsibleData, 
  getRadarData,
  getAnalysisTypeStats,
  getMonitoringsByResearcher,
  simulatedResearchers,
  COLORS,
  getRecentAlerts,
  getRecentReports
};
