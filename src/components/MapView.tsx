
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Map from "@/components/Map";
import SearchPanel from "@/components/map/SearchPanel";
import ResearchForm from "@/components/ResearchForm";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { Globe } from "lucide-react";
import { useForm } from "react-hook-form";

interface MapViewProps {
  studies: ResearchStudy[];
  isAuthenticated?: boolean;
  onStudySubmit?: (data: ResearchStudyFormData) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  studies, 
  isAuthenticated = false,
  onStudySubmit 
}) => {
  const [searchResults, setSearchResults] = useState<ResearchStudy[]>([]);
  const studyForm = useForm<ResearchStudyFormData>({
    defaultValues: {
      type: "artigo" // Valor padrão para o campo type
    }
  });

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

        {/* Formulário de registro de estudos - apenas para usuários autenticados */}
        {isAuthenticated && onStudySubmit && (
          <div className="mt-8 border-t border-forest-100 pt-6">
            <ResearchForm 
              form={studyForm} 
              onSubmit={onStudySubmit} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapView;
