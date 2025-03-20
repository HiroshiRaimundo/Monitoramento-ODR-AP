
import { MonitoringItem } from "@/hooks/useMonitoring";

/**
 * Gera dados para o gráfico de frequência a partir dos itens de monitoramento
 */
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
