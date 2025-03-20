
import { MonitoringItem } from "@/hooks/useMonitoring";

// Lista de pesquisadores simulados com suas respectivas instituições
export const simulatedResearchers = [
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

/**
 * Gera dados para o gráfico de responsáveis a partir dos itens de monitoramento
 */
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
