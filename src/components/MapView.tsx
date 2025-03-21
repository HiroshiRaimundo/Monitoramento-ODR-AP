
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import ResearchForm from "@/components/ResearchForm";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import Map from "@/components/Map";
import { toast } from "@/hooks/use-toast";
import ResearchList from "@/components/ResearchList";

interface MapViewProps {
  studies: ResearchStudy[];
  isAuthenticated?: boolean;
  onStudySubmit?: (data: ResearchStudyFormData) => void;
  onEditStudy?: (id: string, data: ResearchStudyFormData) => void;
  onDeleteStudy?: (id: string) => void;
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
  onEditStudy,
  onDeleteStudy,
  showRegistrationForm = true,
  title = "Registro de Estudos",
  description = "Cadastre novos estudos para serem exibidos no mapa.",
  centerOnAmapa = true,
  onStudiesUpdate
}) => {
  const [editingStudy, setEditingStudy] = useState<ResearchStudy | null>(null);
  const studyForm = useForm<ResearchStudyFormData>({
    defaultValues: {
      type: "artigo" // Valor padrão para o campo type
    }
  });
  
  // Log para depuração
  useEffect(() => {
    console.log("MapView: Estudos recebidos:", studies.length);
    
    // Notificar componente pai sobre estudos atualizados
    if (onStudiesUpdate) {
      onStudiesUpdate(studies);
    }
  }, [studies, onStudiesUpdate]);

  // Efeito para preencher o formulário quando está editando um estudo
  useEffect(() => {
    if (editingStudy) {
      studyForm.reset({
        title: editingStudy.title,
        author: editingStudy.author,
        coAuthors: editingStudy.coAuthors,
        summary: editingStudy.summary,
        repositoryUrl: editingStudy.repositoryUrl,
        location: editingStudy.location,
        type: editingStudy.type
      });
    }
  }, [editingStudy, studyForm]);

  // Manipulador de envio do formulário com feedback para o usuário
  const handleFormSubmit = async (data: ResearchStudyFormData) => {
    try {
      if (editingStudy && onEditStudy) {
        // Atualizar estudo existente
        await onEditStudy(editingStudy.id, data);
        setEditingStudy(null);
        
        toast({
          title: "Estudo atualizado com sucesso",
          description: "As alterações foram salvas e estão disponíveis no mapa.",
        });
      } else if (onStudySubmit) {
        // Adicionar novo estudo
        await onStudySubmit(data);
        
        toast({
          title: "Estudo registrado com sucesso",
          description: "O estudo foi adicionado e já está disponível no mapa público.",
        });
      }
      
      // Limpar o formulário após o envio bem-sucedido
      studyForm.reset({
        type: "artigo" // Manter o valor padrão
      });
    } catch (error) {
      console.error("Erro ao processar estudo:", error);
      
      // Notificar o usuário sobre o erro
      toast({
        title: editingStudy ? "Erro ao atualizar estudo" : "Erro ao registrar estudo",
        description: "Ocorreu um problema ao processar o estudo. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingStudy(null);
    studyForm.reset({
      type: "artigo" // Voltar para o valor padrão
    });
  };

  // Manipulador para editar estudos
  const handleEdit = (study: ResearchStudy) => {
    setEditingStudy(study);
  };

  // Preparar os pontos para o mapa
  const mapPoints = studies.map(study => ({
    id: study.id,
    title: study.title,
    author: study.author,
    coordinates: study.coordinates,
    location: study.location,
    repositoryUrl: study.repositoryUrl,
    type: study.type,
    summary: study.summary
  }));

  // Renderiza o conteúdo baseado no modo de exibição
  const renderContent = () => {
    // Se showRegistrationForm é false, mostrar apenas o mapa
    if (!showRegistrationForm) {
      return (
        <div className="space-y-4">
          <Map 
            points={mapPoints}
            centerOnAmapa={centerOnAmapa}
          />
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

    // Mostrar o formulário de registro e a lista de estudos
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 border border-forest-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-forest-700">
                {editingStudy ? `Editando: ${editingStudy.title}` : "Registrar Novo Estudo"}
              </h2>
              {editingStudy && (
                <button
                  onClick={handleCancelEdit}
                  className="text-sm text-forest-600 hover:text-forest-800 underline"
                >
                  Cancelar edição
                </button>
              )}
            </div>
            <ResearchForm 
              form={studyForm} 
              onSubmit={handleFormSubmit}
              submitLabel={editingStudy ? "Atualizar Estudo" : "Adicionar Estudo"}
            />
          </div>
        </div>
        <div>
          <ResearchList 
            studies={studies}
            onDelete={onDeleteStudy}
            onEdit={handleEdit}
          />
        </div>
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
