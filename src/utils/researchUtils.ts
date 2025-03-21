
import { toast } from "@/hooks/use-toast";
import { geocodeLocation } from "@/utils/geocoder";

// Coordenadas aproximadas de diferentes municípios do Amapá
export const amapaCoordinates: Record<string, [number, number]> = {
  "macapá": [0.0356, -51.0705],
  "santana": [-0.0583, -51.1811],
  "laranjal do jari": [-0.8044, -52.4550],
  "oiapoque": [3.8417, -51.8331],
  "mazagão": [-0.1153, -51.2894],
  "porto grande": [0.7128, -51.4136],
  "tartarugalzinho": [1.5067, -50.9083],
  "pedra branca do amapari": [0.7767, -51.9503],
  "vitória do jari": [-0.9381, -52.4239],
  "calçoene": [2.5042, -50.9511],
  "amapá": [2.0525, -50.7961],
  "ferreira gomes": [0.8569, -51.1794],
  "cutias": [0.9708, -50.8008],
  "itaubal": [0.6022, -50.6992],
  "pracuúba": [1.7400, -50.7892],
  "serra do navio": [0.9014, -52.0036]
};

// Coordenadas padrão para o centro do Amapá
export const defaultCoordinates: [number, number] = [0.9028, -51.6536];

// Get coordinates for a location
export const getCoordinatesForLocation = async (location: string): Promise<[number, number]> => {
  try {
    const coordinates = await geocodeLocation(location);
    return coordinates as [number, number];
  } catch (geoError) {
    console.log('Erro na geocodificação:', geoError);
    // Busca no dicionário de coordenadas do Amapá (ignorando maiúsculas/minúsculas)
    const locationLower = location.toLowerCase().trim();
    const foundCoordinates = Object.entries(amapaCoordinates).find(
      ([location]) => locationLower.includes(location)
    )?.[1] || defaultCoordinates;
    
    console.log(`Usando coordenadas alternativas para ${location}:`, foundCoordinates);
    return foundCoordinates;
  }
};

// Handle API errors
export const handleApiError = (error: any, message: string) => {
  console.error(message, error);
  toast({
    title: "Erro",
    description: message,
    variant: "destructive"
  });
};
