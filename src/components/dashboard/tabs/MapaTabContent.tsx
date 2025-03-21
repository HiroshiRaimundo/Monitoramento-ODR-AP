
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import ResearchForm from "@/components/ResearchForm";
import { ResearchStudy, ResearchStudyFormData } from "@/types/research";
import { toast } from "@/hooks/use-toast";
import ResearchList from "@/components/ResearchList";

interface MapaTabContentProps {
  isAuthenticated: boolean;
  studies: ResearchStudy[];
  handleStudySubmit: (data: Omit<ResearchStudy, "id" | "coordinates">) => void;
  handleDeleteStudy?: (id: string) => void;
  handleEditStudy?: (id: string, data: ResearchStudyFormData) => void;
}

const MapaTabContent: React.FC<MapaTabContentProps> = ({ 
  isAuthenticated,
  studies,
  handleStudySubmit,
  handleDeleteStudy,
  handleEditStudy
}) => {
  if (!isAuthenticated) return null;
  
  // Estado local para rastrear estudos
  const [localStudies, setLocalStudies] = useState<ResearchStudy[]>(studies);
  // Estado para controlar edição
  const [editingStudy, setEditingStudy] = useState<ResearchStudy | null>(null);
  
  const studyForm = useForm<ResearchStudyFormData>({
    defaultValues: {
      type: "artigo" // Valor padrão para o campo type
    }
  });
  
  // Atualiza o estado local quando os estudos originais mudam
  useEffect(() => {
    console.log("MapaTabContent: Atualizando estudos locais", studies.length);
    setLocalStudies(studies);
  }, [studies]);
  
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
  
  // Manipulador de envio do formulário com notificação de sucesso
  const handleFormSubmit = async (data: ResearchStudyFormData) => {
    try {
      if (editingStudy && handleEditStudy) {
        // Atualizar estudo existente
        await handleEditStudy(editingStudy.id, data);
        setEditingStudy(null); // Sair do modo de edição
        
        toast({
          title: "Estudo atualizado com sucesso",
          description: "As alterações foram salvas e estão disponíveis no mapa."
        });
      } else {
        // Adicionar novo estudo
        await handleStudySubmit(data);
        
        toast({
          title: "Estudo registrado com sucesso",
          description: "O estudo foi adicionado e está disponível no mapa da aba pública."
        });
      }
      
      // Resetar o formulário
      studyForm.reset({
        type: "artigo" // Manter o valor padrão
      });
    } catch (error) {
      console.error("Erro ao processar estudo:", error);
      
      toast({
        title: editingStudy ? "Erro ao atualizar estudo" : "Erro ao registrar estudo",
        description: "Verifique os dados e tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  // Manipulador para excluir estudos
  const handleDelete = async (id: string) => {
    if (handleDeleteStudy) {
      try {
        await handleDeleteStudy(id);
        toast({
          title: "Estudo removido com sucesso",
          description: "O estudo foi removido do sistema."
        });
      } catch (error) {
        console.error("Erro ao excluir estudo:", error);
        toast({
          title: "Erro ao remover estudo",
          description: "Ocorreu um problema ao tentar remover o estudo.",
          variant: "destructive"
        });
      }
    }
  };
  
  // Manipulador para editar estudos
  const handleEdit = (study: ResearchStudy) => {
    setEditingStudy(study);
    
    // Rolar para o formulário para edição
    setTimeout(() => {
      const formElement = document.getElementById("research-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  
  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingStudy(null);
    studyForm.reset({
      type: "artigo" // Voltar para o valor padrão
    });
  };
  
  return (
    <TabsContent value="registroEstudos" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card className="border-forest-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-forest-600" />
                <CardTitle className="text-forest-700">
                  {editingStudy ? "Editar Estudo" : "Registro de Estudos"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div id="research-form" className="bg-white rounded-lg p-4 border border-forest-100">
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
            </CardContent>
          </Card>
        </div>
        
        <div>
          <ResearchList 
            studies={localStudies} 
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default MapaTabContent;
