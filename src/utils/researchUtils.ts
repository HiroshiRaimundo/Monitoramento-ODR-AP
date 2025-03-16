
import { toast } from "@/hooks/use-toast";
import { geocodeLocation } from "@/utils/geocoder";

// Coordenadas atualizadas de diferentes municípios do Amapá
export const amapaCoordinates: Record<string, [number, number]> = {
  "macapá": [-51.0669, 0.0356],
  "santana": [-51.1729, -0.0583],
  "laranjal do jari": [-52.5153, -0.8044],
  "oiapoque": [-51.8333, 3.8333],
  "porto grande": [-51.4086, 0.7128],
  "mazagão": [-51.2891, -0.1156],
  "vitória do jari": [-52.4247, -1.1275],
  "tartarugalzinho": [-51.1492, 1.5064],
  "amapá": [-51.0667, 2.0500],
  "calçoene": [-50.9500, 2.5000],
  "pedra branca do amapari": [-51.9472, 0.7772],
  "serra do navio": [-52.0042, 0.9014],
  "cutias": [-50.8028, 0.9719],
  "ferreira gomes": [-51.1797, 0.8564],
  "itaubal": [-50.6917, 0.6025],
  "pracuúba": [-50.7892, 1.7417]
};

// Coordenadas corrigidas para o centro do Amapá
export const defaultCoordinates: [number, number] = [-52.0215415, 1.4441146];

// Get coordinates for a location
export const getCoordinatesForLocation = async (location: string): Promise<[number, number]> => {
  try {
    const coordinates = await geocodeLocation(location);
    // Certificando que retornamos as coordenadas no formato [longitude, latitude] para o Mapbox
    return coordinates || defaultCoordinates;
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
