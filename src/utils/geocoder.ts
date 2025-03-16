
import amapaLocations from "./amapaLocations";

// Função simulada de geocodificação - em uma aplicação real, usaria uma API de geocodificação
export const geocodeLocation = (location: string): [number, number] => {
  const normalizedLocation = location.trim().toLowerCase();
  console.log("Geocodificando localização:", normalizedLocation);
  
  // Verifica se a localização está nas cidades do Amapá
  for (const [city, coords] of Object.entries(amapaLocations)) {
    if (normalizedLocation.includes(city.toLowerCase())) {
      console.log(`Localização encontrada: ${city}. Coordenadas:`, coords);
      // Garantir que as coordenadas estejam no formato correto [longitude, latitude]
      return coords as [number, number];
    }
  }
  
  // Se não encontrar, retorna coordenadas de Macapá com posição ligeiramente deslocada
  // para evitar sobreposição com outros pontos
  const randomOffset = (Math.random() - 0.5) * 0.01; // Pequeno deslocamento aleatório para separar os pontos
  console.log("Localização não encontrada, usando Macapá com deslocamento como fallback");
  return [amapaLocations["Macapá"][0] + randomOffset, amapaLocations["Macapá"][1] + randomOffset];
};
