
// Função para determinar a cor de frequência baseada no valor
export const getFrequencyColor = (frequency: string) => {
  switch (frequency) {
    case "diario":
    case "diária":
      return "text-red-500 bg-red-50";
    case "semanal":
      return "text-orange-500 bg-orange-50";
    case "quinzenal":
      return "text-yellow-500 bg-yellow-50";
    case "mensal":
      return "text-forest-600 bg-forest-50";
    default:
      return "text-muted-foreground bg-gray-50";
  }
};

// Função para determinar a cor da borda baseada na categoria
export const getCategoryBorderColor = (category: string) => {
  switch (category) {
    case 'governo':
      return '#045424'; // Primary forest green
    case 'indicadores':
      return '#16744a'; // Lighter forest green
    case 'legislacao':
      return '#44906f'; // Even lighter forest green
    case 'api':
      return '#72ab93'; // Very light forest green
    default:
      return '#a1c7b7'; // Extremely light forest green
  }
};
