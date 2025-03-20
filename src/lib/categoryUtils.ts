
import { MonitoringItem } from "@/hooks/useMonitoring";

/**
 * Gera dados para o gráfico de categorias a partir dos itens de monitoramento
 */
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
