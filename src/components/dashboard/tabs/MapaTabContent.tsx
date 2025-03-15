
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
}

const MapaTabContent: React.FC<MapaTabContentProps> = ({ 
  isAuthenticated,
  studies,
  handleStudySubmit,
  handleDeleteStudy
}) => {
  if (!isAuthenticated) return null;
  
  // Estado local para rastrear estudos
  const [localStudies, setLocalStudies] = useState<ResearchStudy[]>(studies);
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
  
  // Manipulador de envio do formulário com notificação de sucesso
  const handleFormSubmit = async (data: ResearchStudyFormData) => {
    try {
      await handleStudySubmit(data);
      
      // Exibir feedback positivo para o usuário
      toast({
        title: "Estudo registrado com sucesso",
        description: "O estudo foi adicionado e está disponível no mapa da aba pública.",
      });
      
      // Resetar o formulário
      studyForm.reset({
        type: "artigo" // Manter o valor padrão
      });
    } catch (error) {
      console.error("Erro ao registrar estudo:", error);
      
      // Notificar o usuário sobre o erro
      toast({
        title: "Erro ao registrar estudo",
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
        // Exibir feedback positivo para o usuário
        toast({
          title: "Estudo removido com sucesso",
          description: "O estudo foi removido do sistema.",
        });
      } catch (error) {
        console.error("Erro ao excluir estudo:", error);
        // Notificar o usuário sobre o erro
        toast({
          title: "Erro ao remover estudo",
          description: "Ocorreu um problema ao tentar remover o estudo.",
          variant: "destructive"
        });
      }
    }
  };
  
  return (
    <TabsContent value="registroEstudos" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card className="border-forest-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-forest-600" />
                <CardTitle className="text-forest-700">Registro de Estudos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-white rounded-lg p-4 border border-forest-100">
                <h2 className="text-xl font-medium text-forest-700 mb-4">Registrar Novo Estudo</h2>
                <ResearchForm 
                  form={studyForm} 
                  onSubmit={handleFormSubmit} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <ResearchList 
            studies={localStudies} 
            onDelete={handleDelete}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default MapaTabContent;
