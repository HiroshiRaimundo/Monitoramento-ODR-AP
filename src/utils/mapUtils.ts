
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
  
  // Precisão para agrupar pontos (reduzir para agrupar pontos mais próximos)
  const precision = 0.0001; // Aproximadamente 10 metros
  
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
  return groups;
};

export const formatMapboxCoordinates = (point: MapPoint): MapPoint => {
  return {
    ...point,
    // Garantir que as coordenadas já estão no formato correto para o Mapbox [longitude, latitude]
    // Não alteramos aqui, pois já estamos formatando corretamente nos serviços
    coordinates: point.coordinates
  };
};
