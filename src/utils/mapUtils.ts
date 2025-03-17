
import { MapPoint } from '@/types/map';

export const groupPointsByLocation = (points: MapPoint[]) => {
  if (!points.length) {
    console.log("mapUtils: Nenhum ponto para agrupar");
    return {};
  }
  
  console.log("mapUtils: Agrupando", points.length, "pontos");
  
  // Log para verificar o formato dos pontos
  points.forEach((point, index) => {
    if (index < 5) { // Log para os primeiros 5 pontos
      console.log(`Ponto ${index}:`, point.id, point.title, point.coordinates);
    }
  });
  
  const groups: {[key: string]: MapPoint[]} = {};
  
  // Precisão para agrupar pontos (diminuída para ter menos sobreposição)
  const precision = 0.005; // Aumentado para diminuir a chance de agrupamento
  
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
