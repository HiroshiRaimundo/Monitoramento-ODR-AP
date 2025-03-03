
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
  
  // Ordenar por número de monitoramentos (decrescente) e limitar a 5
  return Object.keys(responsibles)
    .sort((a, b) => responsibles[b].count - responsibles[a].count)
    .slice(0, 5)
    .map(responsible => ({
      responsible,
      monitoramentos: responsibles[responsible].count,
      institution: responsibles[responsible].institution
    }));
};

export const getRadarData = (monitoringItems: MonitoringItem[]) => {
  const sourceTypes = ['governo', 'indicadores', 'legislacao', 'api', 'mídia'];
  
  return sourceTypes.map(type => {
    const count = monitoringItems.filter(item => item.category.toLowerCase().includes(type)).length;
    return {
      subject: type.charAt(0).toUpperCase() + type.slice(1),
      A: count,
      fullMark: Math.max(10, monitoringItems.length)
    };
  });
};

// Função para gerar paletas de cores amazônicas
export const generateAmazonGradient = (index: number) => {
  const gradients = [
    'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',  // Verde floresta para verde médio
    'linear-gradient(135deg, #006400 0%, #228B22 100%)',  // Verde escuro para verde floresta
    'linear-gradient(135deg, #556B2F 0%, #6B8E23 100%)',  // Verde oliva escuro para verde oliva
    'linear-gradient(135deg, #8FBC8F 0%, #98FB98 100%)',  // Verde mar escuro para verde menta claro
    'linear-gradient(135deg, #32CD32 0%, #7CFC00 100%)'   // Verde lima para verde gramado
  ];
  
  return gradients[index % gradients.length];
};

// Função para criar KPIs com dados do monitoramento
export const generateKPIs = (monitoringItems: MonitoringItem[]) => {
  return [
    {
      title: 'Total de Monitoramentos',
      value: monitoringItems.length,
      change: '+5%',
      positive: true
    },
    {
      title: 'Fontes Governamentais',
      value: monitoringItems.filter(item => 
        item.category.toLowerCase().includes('governo')).length,
      change: '+2%',
      positive: true
    },
    {
      title: 'Frequência Diária',
      value: monitoringItems.filter(item => 
        item.frequency.toLowerCase().includes('diário') || 
        item.frequency.toLowerCase().includes('diario')).length,
      change: '+8%',
      positive: true
    },
    {
      title: 'APIs Conectadas',
      value: monitoringItems.filter(item => item.api_url).length,
      change: '-3%',
      positive: false
    }
  ];
};
