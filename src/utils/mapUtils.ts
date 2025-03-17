
import { MapPoint } from '@/types/map';

/**
 * Agrupa pontos por proximidade geográfica para evitar sobreposição
 */
export const groupPointsByLocation = (points: MapPoint[]): {[key: string]: MapPoint[]} => {
  if (!points || !Array.isArray(points) || points.length === 0) {
    return {};
  }
  
  const groups: {[key: string]: MapPoint[]} = {};
  const precision = 0.01; // Precisão de agrupamento (aumentada para separar melhor)
  
  // Filtrar pontos com coordenadas válidas
  const validPoints = points.filter(point => 
    point && 
    point.coordinates && 
    Array.isArray(point.coordinates) && 
    point.coordinates.length === 2 &&
    !isNaN(point.coordinates[0]) && 
    !isNaN(point.coordinates[1])
  );
  
  validPoints.forEach(point => {
    // Arredondar coordenadas para agrupar pontos próximos
    const lng = Math.round(point.coordinates[0] / precision) * precision;
    const lat = Math.round(point.coordinates[1] / precision) * precision;
    
    const locationKey = `${lng.toFixed(4)},${lat.toFixed(4)}`;
    
    if (!groups[locationKey]) {
      groups[locationKey] = [];
    }
    
    // Evitar duplicatas
    const isDuplicate = groups[locationKey].some(p => p.id === point.id);
    if (!isDuplicate) {
      groups[locationKey].push(point);
    }
  });
  
  return groups;
};

/**
 * Garante que as coordenadas do ponto estão no formato correto para o mapa
 */
export const formatMapboxCoordinates = (point: MapPoint): MapPoint => {
  if (!point || !point.coordinates) {
    console.warn("Ponto inválido:", point);
    return {
      ...point,
      coordinates: [-52.0215415, 1.4441146] // Centro do Amapá
    };
  }
  
  if (!Array.isArray(point.coordinates) || 
      point.coordinates.length !== 2 || 
      isNaN(point.coordinates[0]) || 
      isNaN(point.coordinates[1])) {
    console.warn("Coordenadas inválidas:", point.coordinates);
    return {
      ...point,
      coordinates: [-52.0215415, 1.4441146] // Centro do Amapá
    };
  }
  
  return point;
};
