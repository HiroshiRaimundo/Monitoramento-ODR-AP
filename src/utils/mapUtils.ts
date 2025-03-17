
import { MapPoint } from '@/types/map';

/**
 * Agrupa pontos por proximidade geográfica para evitar sobreposição
 */
export const groupPointsByLocation = (points: MapPoint[]): {[key: string]: MapPoint[]} => {
  if (!points || !Array.isArray(points) || points.length === 0) {
    console.log("Nenhum ponto para agrupar");
    return {};
  }
  
  const groups: {[key: string]: MapPoint[]} = {};
  const precision = 0.01; // Precisão de agrupamento
  
  // Filtrar pontos com coordenadas válidas
  const validPoints = points.filter(point => {
    const isValid = point && 
      point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2 &&
      !isNaN(point.coordinates[0]) && 
      !isNaN(point.coordinates[1]);
    
    if (!isValid) {
      console.warn("Ponto com coordenadas inválidas descartado:", point);
    } else {
      console.log("Ponto válido para agrupamento:", point.title, point.coordinates);
    }
    
    return isValid;
  });
  
  console.log(`groupPointsByLocation: Processando ${validPoints.length} pontos válidos de ${points.length} total`);
  
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
      console.log(`Ponto "${point.title}" adicionado ao grupo ${locationKey}`);
    }
  });
  
  // Log dos grupos criados para diagnóstico
  console.log(`Criados ${Object.keys(groups).length} grupos de localização`);
  Object.entries(groups).forEach(([key, group]) => {
    console.log(`Grupo ${key}: ${group.length} pontos`);
  });
  
  return groups;
};

/**
 * Garante que as coordenadas do ponto estão no formato correto para o mapa
 */
export const formatMapboxCoordinates = (point: MapPoint): MapPoint => {
  if (!point || !point.coordinates) {
    console.warn("Ponto inválido formatado com coordenadas padrão:", point);
    return {
      ...point,
      coordinates: [-52.0215415, 1.4441146] // Centro do Amapá
    };
  }
  
  if (!Array.isArray(point.coordinates) || 
      point.coordinates.length !== 2 || 
      isNaN(point.coordinates[0]) || 
      isNaN(point.coordinates[1])) {
    console.warn("Coordenadas inválidas formatadas:", point.coordinates);
    return {
      ...point,
      coordinates: [-52.0215415, 1.4441146] // Centro do Amapá
    };
  }
  
  console.log(`Coordenadas formatadas para "${point.title}":`, point.coordinates);
  return point;
};
