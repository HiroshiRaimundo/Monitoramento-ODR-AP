
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "@/components/Map";
import SearchPanel from "@/components/map/SearchPanel";
import ResearchForm from "@/components/ResearchForm";
import ResearchList from "@/components/ResearchList";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { Globe, MapPin, BookOpen, ListChecks } from "lucide-react";
import { useForm } from "react-hook-form";
import { MapPoint } from "@/types/map";

interface MapViewProps {
  studies: ResearchStudy[];
  isAuthenticated?: boolean;
  onStudySubmit?: (data: ResearchStudyFormData) => void;
  onStudyDelete?: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  studies, 
  isAuthenticated = false,
  onStudySubmit,
  onStudyDelete
}) => {
  const [searchResults, setSearchResults] = useState<ResearchStudy[]>([]);
  const studyForm = useForm<ResearchStudyFormData>({
    defaultValues: {
      type: "artigo" // Valor padrão para o campo type
    }
  });

  // Convert ResearchStudy[] to MapPoint[] to satisfy the Map component's type requirements
  const mapPoints: MapPoint[] = studies.map(study => ({
    id: study.id,
    title: study.title,
    author: study.author,
    location: study.location,
    coordinates: study.coordinates,
    repositoryUrl: study.repositoryUrl,
    summary: study.summary,
    type: study.type
  }));

  // Renderização do conteúdo do mapa
  const renderMapContent = () => (
    <div className="flex flex-col gap-4">
      {/* Mapa em tela cheia */}
      <div className="w-full rounded-lg overflow-hidden shadow-md border border-forest-100">
        <Map points={mapPoints} />
      </div>
      
      {/* Componente de busca abaixo do mapa */}
      <div className="w-full bg-forest-50/50 rounded-lg p-4 border border-forest-100">
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
              
              <TabsTrigger value="manage" className="flex items-center gap-1 data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                <ListChecks size={16} />
                <span>Gerenciar Estudos</span>
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
            
            <TabsContent value="manage" className="mt-0">
              <div className="bg-white rounded-lg p-4 border border-forest-100">
                <ResearchList 
                  studies={studies}
                  onDelete={onStudyDelete || (() => {})}
                  isLoading={false}
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
