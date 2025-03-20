
import { MonitoringItem } from "@/hooks/useMonitoring";

/**
 * Gera dados para o gráfico radar a partir dos itens de monitoramento
 */
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
