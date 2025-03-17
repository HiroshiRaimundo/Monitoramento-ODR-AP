
import amapaLocations from "./amapaLocations";

// Função de geocodificação - em uma aplicação real, usaria uma API de geocodificação
export const geocodeLocation = (location: string): [number, number] => {
  if (!location || typeof location !== 'string') {
    console.warn("Localização inválida para geocodificação:", location);
    return amapaLocations["Centro do Amapá"]; // Retorna o centro do Amapá como fallback
  }
  
  const normalizedLocation = location.trim().toLowerCase();
  console.log("Geocodificando localização:", normalizedLocation);
  
  // Verificação de cache para evitar múltiplas geocodificações da mesma localização
  const cachedLocations: Record<string, [number, number]> = {};
  
  if (cachedLocations[normalizedLocation]) {
    console.log("Usando localização em cache:", normalizedLocation);
    return cachedLocations[normalizedLocation];
  }
  
  // Verifica se a localização está nas cidades do Amapá
  for (const [city, coords] of Object.entries(amapaLocations)) {
    if (normalizedLocation.includes(city.toLowerCase())) {
      console.log(`Localização encontrada: ${city}. Coordenadas:`, coords);
      
      // Adiciona um pequeno desvio aleatório para evitar sobreposição exata
      const smallOffsetLng = (Math.random() - 0.5) * 0.01;
      const smallOffsetLat = (Math.random() - 0.5) * 0.01;
      
      const offsetCoords: [number, number] = [
        coords[0] + smallOffsetLng,
        coords[1] + smallOffsetLat
      ];
      
      // Guardar no cache
      cachedLocations[normalizedLocation] = offsetCoords;
      return offsetCoords;
    }
  }
  
  // Gerar um deslocamento aleatório para evitar sobreposição de alfinetes
  // Usando um raio maior para separar melhor os pontos
  const baseCoords = amapaLocations["Centro do Amapá"];
  const randomOffsetLng = (Math.random() - 0.5) * 0.2; // Offset maior em longitude
  const randomOffsetLat = (Math.random() - 0.5) * 0.2; // Offset maior em latitude
  
  const resultCoords: [number, number] = [
    baseCoords[0] + randomOffsetLng,
    baseCoords[1] + randomOffsetLat
  ];
  
  console.log("Localização não encontrada, usando coordenadas com deslocamento aleatório:", resultCoords);
  
  // Guardar no cache
  cachedLocations[normalizedLocation] = resultCoords;
  return resultCoords;
};
