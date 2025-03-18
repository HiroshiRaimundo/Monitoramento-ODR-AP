import { MonitoringItem } from "@/hooks/useMonitoring";
import { RecentUpdate } from "./InternalDashboard";

// Dados simulados para o dashboard
export const simulatedMonthlyData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i],
  estudos: Math.floor(Math.random() * 10) + 15,
  monitoramentos: Math.floor(Math.random() * 8) + 12,
  atualizacoes: Math.floor(Math.random() * 20) + 25
}));

// Simulação de monitoramentos com os pesquisadores solicitados
export const simulateMonitoringItems = (): MonitoringItem[] => {
  const researchers = [
    "Marilia Gabriela Silva Lobato", "Patrícia Helena Turola Takamatsu", "Lylian Caroline Maciel",
    "André Rodrigues Guimarães", "Sidney da Silva Lobato", "Antônia Costa Andrade",
    "Hiroshi da Silva Koga", "Keliane Bastos de Sousa", "Elane de Lima Ferreira",
    "Suzane Biapino dos Santos", "Wemerson Costa dos Santos", "Wender Carlos Nunes Maciel",
    "Raylan Miranda Cortez", "Emilly Patricia dos Santos Barbosa", "Thayze Guedes Barreto",
    "Jeancarlo Pontes Carvalho", "Joao Paulo Silva Santos", "Alice Agnes Weiser",
    "Renan Mendonça Dantas", "Ana Karolina Lima Pedrada", "Irenildo Costa da Silva"
  ];
  
  const institutions = ["UNIFAP", "PPGDAPP", "Pós-Doc", "UEAP", "UFRJ", "USP"];
  const categories = ["governo", "indicadores", "legislacao", "api", "social"];
  const frequencies = ["diária", "semanal", "quinzenal", "mensal"];
  const sites = [
    "Portal da Transparência", "Diário Oficial do Estado", "IBGE", "DataSUS",
    "Governo do Amapá", "INPE", "IBAMA", "MMA", "Gov.br", "TCU", "CGU"
  ];

  return Array.from({ length: 52 }, (_, i) => {
    const researcherIndex = Math.floor(Math.random() * researchers.length);
    const institutionIndex = Math.floor(Math.random() * institutions.length);
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const frequencyIndex = Math.floor(Math.random() * frequencies.length);
    const siteIndex = Math.floor(Math.random() * sites.length);
    
    return {
      id: `mon-${i+1}`,
      name: `Monitoramento ${sites[siteIndex]}`,
      url: `https://example.com/${sites[siteIndex].toLowerCase().replace(/\s+/g, '-')}`,
      api_url: Math.random() > 0.5 ? `https://api.example.com/${sites[siteIndex].toLowerCase().replace(/\s+/g, '-')}` : undefined,
      frequency: frequencies[frequencyIndex],
      category: categories[categoryIndex],
      keywords: `amazônia, sustentabilidade, ${categories[categoryIndex]}`,
      responsible: researchers[researcherIndex],
      institution: institutions[institutionIndex],
      created_at: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString()
    };
  });
};

// Generate simulated alerts and reports with status values from the allowed set
export const getRecentAlerts = () => {
  const sites = [
    "Portal da Transparência", "Diário Oficial do Estado", "IBGE", "DataSUS",
    "Governo do Amapá", "INPE", "IBAMA"
  ];
  const statuses = ["error", "warning", "success", "pending"];
  
  return Array.from({ length: 5 }, (_, i) => {
    const siteIndex = Math.floor(Math.random() * sites.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    
    return {
      id: `alert-${i+1}`,
      title: `Alerta de monitoramento`,
      description: `Alteração detectada no ${sites[siteIndex]}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      type: "alert",
      site: sites[siteIndex],
      status: statuses[statusIndex]
    };
  });
};

export const getRecentReports = () => {
  const sites = [
    "Portal da Transparência", "Diário Oficial do Estado", "IBGE", "DataSUS",
    "Governo do Amapá", "INPE", "IBAMA"
  ];
  const statuses = ["success", "pending"];
  
  return Array.from({ length: 5 }, (_, i) => {
    const siteIndex = Math.floor(Math.random() * sites.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    
    return {
      id: `report-${i+1}`,
      title: `Relatório de monitoramento`,
      description: `Relatório gerado para ${sites[siteIndex]}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)).toISOString(),
      type: "report",
      site: sites[siteIndex],
      status: statuses[statusIndex]
    };
  });
};
