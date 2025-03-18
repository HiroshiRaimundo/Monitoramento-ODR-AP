
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/Map";
import SearchPanel from "@/components/map/SearchPanel";
import ResearchForm from "@/components/ResearchForm";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { Globe, MapPin, BookOpen } from "lucide-react";
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

  // Renderização do conteúdo do mapa
  const renderMapContent = () => (
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
  );

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
        {isAuthenticated && onStudySubmit ? (
          // Versão com abas para usuários autenticados
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="w-full mb-4 bg-forest-50">
              <TabsTrigger value="map" className="flex items-center gap-1 data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                <MapPin size={16} />
                <span>Mapa</span>
              </TabsTrigger>
              
              <TabsTrigger value="register" className="flex items-center gap-1 data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                <BookOpen size={16} />
                <span>Registrar Estudo</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="mt-0">
              {renderMapContent()}
            </TabsContent>
            
            <TabsContent value="register" className="mt-0">
              <div className="bg-white rounded-lg p-4 border border-forest-100">
                <ResearchForm 
                  form={studyForm} 
                  onSubmit={onStudySubmit} 
                />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // Versão sem abas para usuários não autenticados
          renderMapContent()
        )}
      </CardContent>
    </Card>
  );
};

export default MapView;
