
import { MonitoringItem } from "@/hooks/useMonitoring";

export const getCategoryData = (monitoringItems: MonitoringItem[]) => {
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
  
  // Limitar a 5 responsáveis para não sobrecarregar o gráfico
  return Object.keys(responsibles)
    .slice(0, 5)
    .map(responsible => ({
      responsible,
      monitoramentos: responsibles[responsible].count,
      institution: responsibles[responsible].institution
    }));
};

export const getRadarData = (monitoringItems: MonitoringItem[]) => {
  const sourceTypes = ['governo', 'indicadores', 'legislacao', 'api'];
  
  return sourceTypes.map(type => {
    const count = monitoringItems.filter(item => item.category === type).length;
    return {
      subject: type,
      A: count,
      fullMark: Math.max(10, monitoringItems.length)
    };
  });
};

// Cores para os gráficos
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
