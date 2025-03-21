
import React from "react";
import { useForm } from "react-hook-form";
import ResearchForm from "@/components/ResearchForm";
import { ResearchStudyFormData } from "@/types/research";
import { toast } from "@/hooks/use-toast";

interface ResearchFormSectionProps {
  isAuthenticated: boolean;
  onStudySubmit?: (data: ResearchStudyFormData) => void;
}

const ResearchFormSection: React.FC<ResearchFormSectionProps> = ({ 
  isAuthenticated, 
  onStudySubmit 
}) => {
  const studyForm = useForm<ResearchStudyFormData>({
    defaultValues: {
      type: "artigo" // Valor padrão para o campo type
    }
  });

  // Manipulador de envio do formulário com feedback para o usuário
  const handleFormSubmit = async (data: ResearchStudyFormData) => {
    try {
      // Chamar o callback de envio do formulário se existir
      if (onStudySubmit) {
        await onStudySubmit(data);
        
        // Notificar o usuário sobre o sucesso
        toast({
          title: "Estudo registrado com sucesso",
          description: "O estudo foi adicionado e já está disponível no mapa público.",
        });
        
        // Resetar o formulário após o envio bem-sucedido
        studyForm.reset({
          type: "artigo" // Manter o valor padrão
        });
      }
    } catch (error) {
      console.error("Erro ao registrar estudo:", error);
      
      // Notificar o usuário sobre o erro
      toast({
        title: "Erro ao registrar estudo",
        description: "Ocorreu um problema ao adicionar o estudo. Tente novamente.",
        variant: "destructive"
      });
    }
  };

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
        onSubmit={handleFormSubmit} 
      />
    </div>
  );
};

export default ResearchFormSection;
