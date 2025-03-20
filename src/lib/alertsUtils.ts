
import { mapToStatusEnum } from "./chartUtils";
import { RecentUpdate } from "@/components/dashboard/types/dashboardTypes";

// Simula dados de alertas recentes
export const getRecentAlerts = (): RecentUpdate[] => {
  const alertTypes = ['content', 'sentiment', 'data', 'legislation', 'api'];
  const sites = ['Portal da Transparência', 'Diário Oficial', 'IBGE', 'Gov.br', 'Datasus'];
  const statusOptions = ['error', 'success', 'warning', 'pending'];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: `alert-${i + 1}`,
    title: `Alerta em ${sites[Math.floor(Math.random() * sites.length)]}`,
    description: `Mudança detectada na ${alertTypes[Math.floor(Math.random() * alertTypes.length)]}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR'),
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    site: sites[Math.floor(Math.random() * sites.length)],
    status: mapToStatusEnum(statusOptions[Math.floor(Math.random() * statusOptions.length)])
  }));
};

// Simula relatórios de análises recentes
export const getRecentReports = (): RecentUpdate[] => {
  const reports = [
    { id: "1", title: "Análise de Conteúdo - Portal da Transparência", description: "Relatório de acompanhamento mensal", date: "10/05/2024", site: "Portal da Transparência", status: "completed", type: "content" },
    { id: "2", title: "Análise de Sentimento - Redes Sociais", description: "Percepção pública sobre nova legislação", date: "08/05/2024", site: "Twitter, Facebook", status: "completed", type: "sentiment" },
    { id: "3", title: "Análise Cruzada - Indicadores IBGE", description: "Correlação entre indicadores socioeconômicos", date: "05/05/2024", site: "IBGE, DataSUS", status: "completed", type: "cross" },
    { id: "4", title: "Processamento NLP - Diário Oficial", description: "Extração de entidades e classificação", date: "01/05/2024", site: "Diário Oficial", status: "completed", type: "nlp" },
    { id: "5", title: "Análise de Tendências - Dados Ambientais", description: "Padrões de desmatamento no último trimestre", date: "28/04/2024", site: "INPE, IBAMA", status: "completed", type: "trend" }
  ];
  
  return reports.map(report => ({
    ...report,
    status: mapToStatusEnum(report.status)
  }));
};
