
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import ResearchFormSection from "./map/ResearchFormSection";
import MapDisplaySection from "./map/MapDisplaySection";

interface MapViewProps {
  studies: ResearchStudy[];
  isAuthenticated?: boolean;
  onStudySubmit?: (data: ResearchStudyFormData) => void;
  showRegistrationForm?: boolean;
  title?: string;
  description?: string;
  centerOnAmapa?: boolean;
  onStudiesUpdate?: (studies: ResearchStudy[]) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  studies, 
  isAuthenticated = false,
  onStudySubmit,
  showRegistrationForm = true,
  title = "Registro de Estudos",
  description = "Cadastre novos estudos para serem exibidos no mapa.",
  centerOnAmapa = true,
  onStudiesUpdate
}) => {
  // Log para depuração
  React.useEffect(() => {
    console.log("MapView: Estudos recebidos:", studies.length);
    
    // Notificar componente pai sobre estudos atualizados
    if (onStudiesUpdate) {
      onStudiesUpdate(studies);
    }
  }, [studies, onStudiesUpdate]);

  // Renderiza o conteúdo baseado no modo de exibição
  const renderContent = () => {
    // Se showRegistrationForm é false, mostrar apenas o mapa
    if (!showRegistrationForm) {
      return (
        <MapDisplaySection 
          studies={studies}
          centerOnAmapa={centerOnAmapa}
        />
      );
    }

    // Mostrar o formulário de registro 
    return (
      <div className="space-y-6">
        <ResearchFormSection 
          isAuthenticated={isAuthenticated}
          onStudySubmit={onStudySubmit}
        />
      </div>
    );
  };

  return (
    <Card className="border-forest-100 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-forest-600" />
          <CardTitle className="text-forest-700">{title}</CardTitle>
        </div>
        <CardDescription className="text-forest-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default MapView;
