
import amapaLocations from "./amapaLocations";

// Função simulada de geocodificação - em uma aplicação real, usaria uma API de geocodificação
export const geocodeLocation = (location: string): [number, number] | null => {
  const normalizedLocation = location.trim().toLowerCase();
  
  // Verifica se a localização está nas cidades do Amapá
  for (const [city, coords] of Object.entries(amapaLocations)) {
    if (normalizedLocation.includes(city.toLowerCase())) {
      return coords as [number, number];
    }
  }
  
  // Se não encontrar, retorna coordenadas de Macapá como fallback
  return amapaLocations["Macapá"];
};
