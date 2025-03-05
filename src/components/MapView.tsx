
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Map from "@/components/Map";
import SearchPanel from "@/components/map/SearchPanel";
import { ResearchStudy } from "@/types/research";
import { Globe } from "lucide-react";

interface MapViewProps {
  studies: ResearchStudy[];
}

const MapView: React.FC<MapViewProps> = ({ studies }) => {
  const [searchResults, setSearchResults] = useState<ResearchStudy[]>([]);

  return (
    <Card className="border-forest-100 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <div className="flex items-center gap-2">
          <Globe size={20} className="text-forest-600" />
          <CardTitle className="text-forest-700">Visualização Geográfica</CardTitle>
        </div>
        <CardDescription className="text-forest-600">
          Mapa do Amapá com localização dos estudos registrados. 
          Clique nos marcadores para ver mais detalhes.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-4/5 rounded-lg overflow-hidden shadow-md border border-forest-100">
            <Map points={studies} />
          </div>
          <div className="w-full lg:w-1/5 bg-forest-50/50 rounded-lg p-4 border border-forest-100">
            <SearchPanel 
              studies={studies} 
              onSearchResults={setSearchResults} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
