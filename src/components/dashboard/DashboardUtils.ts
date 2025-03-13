
import { MonitoringItem } from "@/hooks/useMonitoring";

// Lista de pesquisadores simulados com suas respectivas instituições
const simulatedResearchers = [
  { name: "Marilia Gabriela Silva Lobato", institution: "UNIFAP", count: 17 },
  { name: "Patrícia Helena Turola Takamatsu", institution: "UNIFAP", count: 15 },
  { name: "Lylian Caroline Maciel", institution: "UNIFAP", count: 14 },
  { name: "André Rodrigues Guimarães", institution: "UNIFAP", count: 13 },
  { name: "Sidney da Silva Lobato", institution: "UNIFAP", count: 12 },
  { name: "Antônia Costa Andrade", institution: "UNIFAP", count: 11 },
  { name: "Hiroshi da Silva Koga", institution: "PPGDAPP", count: 10 },
  { name: "Keliane Bastos de Sousa", institution: "PPGDAPP", count: 9 },
  { name: "Elane de Lima Ferreira", institution: "PPGDAPP", count: 8 },
  { name: "Suzane Biapino dos Santos", institution: "PPGDAPP", count: 7 },
  { name: "Wemerson Costa dos Santos", institution: "PPGDAPP", count: 6 },
  { name: "Wender Carlos Nunes Maciel", institution: "PPGDAPP", count: 5 },
  { name: "Raylan Miranda Cortez", institution: "PPGDAPP", count: 4 },
  { name: "Emilly Patricia dos Santos Barbosa", institution: "PPGDAPP", count: 3 },
  { name: "Thayze Guedes Barreto", institution: "PPGDAPP", count: 2 },
  { name: "Jeancarlo Pontes Carvalho", institution: "PPGDAPP", count: 11 },
  { name: "Joao Paulo Silva Santos", institution: "PPGDAPP", count: 9 },
  { name: "Alice Agnes Weiser", institution: "PPGDAPP", count: 7 },
  { name: "Renan Mendonça Dantas", institution: "PPGDAPP", count: 5 },
  { name: "Ana Karolina Lima Pedrada", institution: "Pós-Doc", count: 18 },
  { name: "Irenildo Costa da Silva", institution: "Pós-Doc", count: 16 }
];

export const getCategoryData = (monitoringItems: MonitoringItem[]) => {
  // Se não houver monitoramentos, usar dados simulados
  if (!monitoringItems || monitoringItems.length === 0) {
    return [
      { name: "Governo", value: 12 },
      { name: "Indicadores", value: 8 },
      { name: "Legislação", value: 15 },
      { name: "API", value: 10 },
      { name: "Social", value: 7 }
    ];
  }

  const categories: { [key: string]: number } = {};
  
  monitoringItems.forEach(item => {
    if (categories[item.category]) {
      categories[item.category]++;
    } else {
      categories[item.category] = 1;
    }
  });
  
  return Object.keys(categories).map(category => ({
    name: category,
    value: categories[category]
  }));
};

export const getFrequencyData = (monitoringItems: MonitoringItem[]) => {
  // Se não houver monitoramentos, usar dados simulados
  if (!monitoringItems || monitoringItems.length === 0) {
    return [
      { frequency: "Diária", quantidade: 18 },
      { frequency: "Semanal", quantidade: 12 },
      { frequency: "Quinzenal", quantidade: 8 },
      { frequency: "Mensal", quantidade: 14 }
    ];
  }
  
  const frequencies: { [key: string]: number } = {};
  
  monitoringItems.forEach(item => {
    if (frequencies[item.frequency]) {
      frequencies[item.frequency]++;
    } else {
      frequencies[item.frequency] = 1;
    }
  });
  
  return Object.keys(frequencies).map(frequency => ({
    frequency,
    quantidade: frequencies[frequency]
  }));
};

export const getResponsibleData = (monitoringItems: MonitoringItem[]) => {
  // Se não houver monitoramentos ou poucos monitoramentos, usar dados simulados
  if (!monitoringItems || monitoringItems.length < 15) {
    return simulatedResearchers
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)
      .map(researcher => ({
        responsible: researcher.name,
        monitoramentos: researcher.count,
        institution: researcher.institution
      }));
  }
  
  const responsibles: { [key: string]: { count: number, institution: string } } = {};
  
  monitoringItems.forEach(item => {
    if (item.responsible) {
      const key = item.responsible;
      if (responsibles[key]) {
        responsibles[key].count++;
      } else {
        responsibles[key] = { 
          count: 1, 
          institution: item.institution || 'Não informada' 
        };
      }
    }
  });
  
  // Limitar a 15 responsáveis
  return Object.keys(responsibles)
    .map(responsible => ({
      responsible,
      monitoramentos: responsibles[responsible].count,
      institution: responsibles[responsible].institution
    }))
    .sort((a, b) => b.monitoramentos - a.monitoramentos)
    .slice(0, 15);
};

export const getRadarData = (monitoringItems: MonitoringItem[]) => {
  // Se não houver monitoramentos, usar dados simulados
  if (!monitoringItems || monitoringItems.length === 0) {
    return [
      { subject: "Governo", A: 120, fullMark: 150 },
      { subject: "Indicadores", A: 98, fullMark: 150 },
      { subject: "Legislação", A: 86, fullMark: 150 },
      { subject: "API", A: 99, fullMark: 150 },
      { subject: "Social", A: 85, fullMark: 150 }
    ];
  }
  
  const sourceTypes = ['governo', 'indicadores', 'legislacao', 'api', 'social'];
  
  return sourceTypes.map(type => {
    const count = monitoringItems.filter(item => item.category === type).length;
    return {
      subject: type.charAt(0).toUpperCase() + type.slice(1),
      A: count * 10, // Multiplica por 10 para tornar o valor mais visível no gráfico
      fullMark: Math.max(150, monitoringItems.length * 10)
    };
  });
};

// Simula monitoramentos com análises ativas por tipo
export const getAnalysisTypeStats = () => {
  return {
    contentAnalysis: 27,
    sentimentAnalysis: 18,
    crossAnalysis: 15,
    nlpAnalysis: 22,
    trendAnalysis: 19,
    classificationAnalysis: 14,
    eventDetection: 10,
    multiLayerAnalysis: 8,
    networkAnalysis: 12
  };
};

// Cores para os gráficos
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Função para gerar simulação de monitoramentos por pesquisador
export const getMonitoringsByResearcher = () => {
  return simulatedResearchers.map(researcher => ({
    name: researcher.name,
    institution: researcher.institution,
    monitorings: researcher.count,
    activeAlerts: Math.floor(Math.random() * 5),
    lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR')
  }));
};

// Simula dados de alertas recentes
export const getRecentAlerts = () => {
  const alertTypes = ['content', 'sentiment', 'data', 'legislation', 'api'];
  const sites = ['Portal da Transparência', 'Diário Oficial', 'IBGE', 'Gov.br', 'Datasus'];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: `alert-${i + 1}`,
    title: `Alerta em ${sites[Math.floor(Math.random() * sites.length)]}`,
    description: `Mudança detectada na ${alertTypes[Math.floor(Math.random() * alertTypes.length)]}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toLocaleDateString('pt-BR'),
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    site: sites[Math.floor(Math.random() * sites.length)],
    status: Math.random() > 0.3 ? 'new' : 'viewed'
  }));
};

// Simula relatórios de análises recentes
export const getRecentReports = () => {
  return [
    { id: "1", title: "Análise de Conteúdo - Portal da Transparência", description: "Relatório de acompanhamento mensal", date: "10/05/2024", site: "Portal da Transparência", status: "completed", type: "content" },
    { id: "2", title: "Análise de Sentimento - Redes Sociais", description: "Percepção pública sobre nova legislação", date: "08/05/2024", site: "Twitter, Facebook", status: "completed", type: "sentiment" },
    { id: "3", title: "Análise Cruzada - Indicadores IBGE", description: "Correlação entre indicadores socioeconômicos", date: "05/05/2024", site: "IBGE, DataSUS", status: "completed", type: "cross" },
    { id: "4", title: "Processamento NLP - Diário Oficial", description: "Extração de entidades e classificação", date: "01/05/2024", site: "Diário Oficial", status: "completed", type: "nlp" },
    { id: "5", title: "Análise de Tendências - Dados Ambientais", description: "Padrões de desmatamento no último trimestre", date: "28/04/2024", site: "INPE, IBAMA", status: "completed", type: "trend" }
  ];
};
