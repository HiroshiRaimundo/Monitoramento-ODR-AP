
import amapaLocations from "./amapaLocations";

// Função de geocodificação - em uma aplicação real, usaria uma API de geocodificação
export const geocodeLocation = (location: string): [number, number] => {
  const normalizedLocation = location.trim().toLowerCase();
  console.log("Geocodificando localização:", normalizedLocation);
  
  // Verifica se a localização está nas cidades do Amapá
  for (const [city, coords] of Object.entries(amapaLocations)) {
    if (normalizedLocation.includes(city.toLowerCase())) {
      console.log(`Localização encontrada: ${city}. Coordenadas:`, coords);
      return coords;
    }
  }
  
  // Gerar um deslocamento aleatório para evitar sobreposição de alfinetes
  // Usando um raio maior para separar melhor os pontos
  const baseCoords = amapaLocations["Centro do Amapá"];
  const randomOffsetLng = (Math.random() - 0.5) * 0.1; // Offset maior em longitude
  const randomOffsetLat = (Math.random() - 0.5) * 0.1; // Offset maior em latitude
  
  const resultCoords: [number, number] = [
    baseCoords[0] + randomOffsetLng,
    baseCoords[1] + randomOffsetLat
  ];
  
  console.log("Localização não encontrada, usando coordenadas com deslocamento aleatório:", resultCoords);
  return resultCoords;
};
