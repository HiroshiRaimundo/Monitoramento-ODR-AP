
import { MapPoint } from '@/types/map';

export const groupPointsByLocation = (points: MapPoint[]) => {
  if (!points.length) {
    console.log("mapUtils: Nenhum ponto para agrupar");
    return {};
  }
  
  console.log("mapUtils: Agrupando", points.length, "pontos");
  
  // Log para verificar o formato dos pontos
  points.forEach((point, index) => {
    if (index < 3) { // Limitar a 3 pontos para não sobrecarregar o console
      console.log(`Ponto ${index}:`, point.id, point.title, point.coordinates);
    }
  });
  
  const groups: {[key: string]: MapPoint[]} = {};
  
  // Precisão para agrupar pontos (aumentado para ter menos agrupamentos e mais alfinetes visíveis)
  const precision = 0.001; // Aproximadamente 100 metros - aumentado para espalhar mais os pontos
  
  points.forEach(point => {
    if (point.coordinates && Array.isArray(point.coordinates) && point.coordinates.length === 2) {
      // Verificar se as coordenadas são números válidos
      if (isNaN(point.coordinates[0]) || isNaN(point.coordinates[1])) {
        console.warn("Coordenadas inválidas para o ponto:", point.id, point.title);
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
      groups[locationKey].push(point);
    } else {
      console.warn("Ponto sem coordenadas válidas:", point.id, point.title);
    }
  });
  
  console.log("Grupos de localização:", Object.keys(groups).length);
  
  // Log detalhado dos grupos formados
  Object.entries(groups).forEach(([key, group]) => {
    console.log(`Grupo ${key}: ${group.length} pontos`);
  });
  
  return groups;
};

export const formatMapboxCoordinates = (point: MapPoint): MapPoint => {
  // Verificar se as coordenadas existem e são válidas
  if (!point.coordinates || !Array.isArray(point.coordinates) || point.coordinates.length !== 2) {
    console.warn("formatMapboxCoordinates: Coordenadas inválidas para o ponto:", point.id, point.title);
    // Usar coordenadas padrão para Macapá como fallback
    return {
      ...point,
      coordinates: [-51.0669, 0.0356] // Coordenadas de Macapá como fallback
    };
  }
  
  // Verificar se as coordenadas são números
  if (isNaN(point.coordinates[0]) || isNaN(point.coordinates[1])) {
    console.warn("formatMapboxCoordinates: Coordenadas não numéricas para o ponto:", point.id, point.title);
    return {
      ...point,
      coordinates: [-51.0669, 0.0356] // Coordenadas de Macapá como fallback
    };
  }

  // Garantir o formato [longitude, latitude] para o Mapbox
  return {
    ...point,
    coordinates: point.coordinates
  };
};
