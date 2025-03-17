
import { MapPoint } from '@/types/map';

export const groupPointsByLocation = (points: MapPoint[]) => {
  if (!points || !Array.isArray(points) || !points.length) {
    console.log("mapUtils: Nenhum ponto para agrupar");
    return {};
  }
  
  console.log("mapUtils: Agrupando", points.length, "pontos");
  
  // Log detalhado para verificar o formato dos pontos
  points.forEach((point, index) => {
    if (index < 5 || index >= points.length - 2) { // Log para os primeiros 5 e últimos 2 pontos
      console.log(`Ponto ${index}:`, point.id, point.title, point.coordinates);
    }
  });
  
  const groups: {[key: string]: MapPoint[]} = {};
  
  // Precisão para agrupar pontos (diminuída para ter menos sobreposição)
  const precision = 0.008; // Ajustado para melhor visualização
  
  points.forEach(point => {
    if (!point || !point.coordinates) {
      console.warn("Ponto inválido ou sem coordenadas:", point?.id, point?.title);
      return;
    }
    
    if (!Array.isArray(point.coordinates) || point.coordinates.length !== 2) {
      console.warn("Formato de coordenadas inválido para o ponto:", point.id, point.title);
      return;
    }
    
    // Verificar se as coordenadas são números válidos
    if (isNaN(point.coordinates[0]) || isNaN(point.coordinates[1])) {
      console.warn("Coordenadas inválidas para o ponto:", point.id, point.title, point.coordinates);
      return;
    }
    
    // Arredondar coordenadas para agrupar pontos próximos
    // Garantir que estamos usando a convenção [longitude, latitude] do Mapbox
    const roundedLng = Math.round(point.coordinates[0] / precision) * precision;
    const roundedLat = Math.round(point.coordinates[1] / precision) * precision;
    
    const locationKey = `${roundedLng},${roundedLat}`;
    
    if (!groups[locationKey]) {
      groups[locationKey] = [];
    }
    
    // Verificar se o ponto já está no grupo para evitar duplicatas
    const isDuplicate = groups[locationKey].some(existingPoint => existingPoint.id === point.id);
    if (!isDuplicate) {
      groups[locationKey].push(point);
    }
  });
  
  console.log("Grupos de localização:", Object.keys(groups).length);
  
  // Log detalhado dos grupos formados
  Object.entries(groups).forEach(([key, group]) => {
    console.log(`Grupo ${key}: ${group.length} pontos`);
    if (group.length > 1) {
      console.log(`  Detalhes do grupo ${key}:`, group.map(p => p.id));
    }
  });
  
  return groups;
};

export const formatMapboxCoordinates = (point: MapPoint): MapPoint => {
  // Verificação completa das coordenadas
  if (!point) {
    console.error("formatMapboxCoordinates: Ponto é undefined ou null");
    return {
      id: "fallback-id",
      title: "Ponto inválido",
      author: "Desconhecido",
      location: "Localização desconhecida",
      coordinates: [-52.0215415, 1.4441146] // Coordenadas do Centro do Amapá como fallback
    };
  }
  
  if (!point.coordinates || !Array.isArray(point.coordinates) || point.coordinates.length !== 2) {
    console.warn("formatMapboxCoordinates: Coordenadas inválidas para o ponto:", point.id, point.title);
    // Usar coordenadas padrão para o Centro do Amapá como fallback
    return {
      ...point,
      coordinates: [-52.0215415, 1.4441146] // Coordenadas do Centro do Amapá como fallback
    };
  }
  
  // Verificar se as coordenadas são números
  if (isNaN(point.coordinates[0]) || isNaN(point.coordinates[1])) {
    console.warn("formatMapboxCoordinates: Coordenadas não numéricas para o ponto:", point.id, point.title);
    return {
      ...point,
      coordinates: [-52.0215415, 1.4441146] // Coordenadas do Centro do Amapá como fallback
    };
  }

  // Garantir o formato [longitude, latitude] para o Mapbox
  return {
    ...point,
    coordinates: point.coordinates
  };
};
