
import amapaLocations from "./amapaLocations";

// Função simulada de geocodificação - em uma aplicação real, usaria uma API de geocodificação
export const geocodeLocation = (location: string): [number, number] => {
  const normalizedLocation = location.trim().toLowerCase();
  console.log("Geocodificando localização:", normalizedLocation);
  
  // Verifica se a localização está nas cidades do Amapá
  for (const [city, coords] of Object.entries(amapaLocations)) {
    if (normalizedLocation.includes(city.toLowerCase())) {
      console.log(`Localização encontrada: ${city}. Coordenadas:`, coords);
      // Garante que as coordenadas estejam no formato [longitude, latitude] para o Mapbox
      return coords as [number, number];
    }
  }
  
  // Se não encontrar, retorna coordenadas de Macapá como fallback
  console.log("Localização não encontrada, usando Macapá como fallback");
  return amapaLocations["Macapá"];
};

