
import amapaLocations from "./amapaLocations";

// Cache para coordenadas já pesquisadas
const coordinateCache: Record<string, [number, number]> = {};

/**
 * Geocodifica uma localização para coordenadas [longitude, latitude]
 * Simplificada para maior estabilidade e performance
 */
export const geocodeLocation = (location: string): [number, number] => {
  // Validação básica
  if (!location || typeof location !== 'string') {
    console.log("Localização inválida:", location);
    return amapaLocations["Centro do Amapá"];
  }
  
  const normalizedLocation = location.trim().toLowerCase();
  console.log(`Geocodificando localização: "${normalizedLocation}"`);
  
  // Verificar cache primeiro
  if (coordinateCache[normalizedLocation]) {
    console.log("Usando coordenadas em cache para:", normalizedLocation, coordinateCache[normalizedLocation]);
    return coordinateCache[normalizedLocation];
  }
  
  // Buscar nas localizações conhecidas do Amapá
  for (const [city, coords] of Object.entries(amapaLocations)) {
    if (normalizedLocation.includes(city.toLowerCase())) {
      // Adicionar pequeno offset para evitar sobreposições exatas
      const jitter = 0.01; // Reduzido para minimizar dispersão
      const offsetLng = (Math.random() - 0.5) * jitter;
      const offsetLat = (Math.random() - 0.5) * jitter;
      
      const result: [number, number] = [
        coords[0] + offsetLng,
        coords[1] + offsetLat
      ];
      
      // Armazenar no cache
      coordinateCache[normalizedLocation] = result;
      console.log(`Coordenadas encontradas para ${location}:`, result);
      return result;
    }
  }
  
  // Usar coordenadas do centro do Amapá com offset aleatório 
  // como fallback para localizações desconhecidas
  const baseCoords = amapaLocations["Centro do Amapá"];
  const offsetLng = (Math.random() - 0.5) * 0.1;
  const offsetLat = (Math.random() - 0.5) * 0.1;
  
  const result: [number, number] = [
    baseCoords[0] + offsetLng,
    baseCoords[1] + offsetLat
  ];
  
  // Armazenar no cache
  coordinateCache[normalizedLocation] = result;
  console.log(`Coordenadas geradas para ${location}:`, result);
  return result;
};
