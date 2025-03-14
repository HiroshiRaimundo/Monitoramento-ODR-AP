
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import ResearchForm from "@/components/ResearchForm";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import Map from "@/components/Map";

interface MapViewProps {
  studies: ResearchStudy[];
  isAuthenticated?: boolean;
  onStudySubmit?: (data: ResearchStudyFormData) => void;
  showRegistrationForm?: boolean;
  title?: string;
  description?: string;
}

const MapView: React.FC<MapViewProps> = ({ 
  studies, 
  isAuthenticated = false,
  onStudySubmit,
  showRegistrationForm = true,
  title = "Registro de Estudos",
  description = "Cadastre novos estudos para serem exibidos no mapa."
}) => {
  const studyForm = useForm<ResearchStudyFormData>({
    defaultValues: {
      type: "artigo" // Valor padrão para o campo type
    }
  });

  // Renderiza o conteúdo baseado no modo de exibição
  const renderContent = () => {
    // Se showRegistrationForm é false, mostrar apenas o mapa
    if (!showRegistrationForm) {
      return (
        <div className="space-y-4">
          <Map points={studies.map(study => ({
            id: study.id,
            title: study.title,
            author: study.author,
            coordinates: study.coordinates,
            location: study.location,
            repositoryUrl: study.repositoryUrl,
            type: study.type,
            summary: study.summary
          }))} />
        </div>
      );
    }

    // Se não estiver autenticado ou não tiver callback de submissão, 
    // exibir mensagem ao invés do formulário
    if (!isAuthenticated || !onStudySubmit) {
      return (
        <div className="bg-forest-50/50 p-6 rounded-lg text-center">
          <p className="text-forest-700 mb-4">
            Para registrar um novo estudo, é necessário estar autenticado.
          </p>
          <p className="text-sm text-forest-600">
            Faça login para acessar essa funcionalidade.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-4 border border-forest-100">
        <h2 className="text-xl font-medium text-forest-700 mb-4">Registrar Novo Estudo</h2>
        <ResearchForm 
          form={studyForm} 
          onSubmit={onStudySubmit} 
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
