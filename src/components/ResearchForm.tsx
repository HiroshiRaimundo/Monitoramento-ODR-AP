
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ResearchStudyFormData } from "@/types/research";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResearchFormProps {
  onSubmit: (data: ResearchStudyFormData) => void;
  form: UseFormReturn<ResearchStudyFormData>;
  submitLabel?: string;
  isEdit?: boolean;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ 
  onSubmit, 
  form,
  submitLabel = "Adicionar Estudo",
  isEdit = false
}) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;
  
  // Handler para atualizar o campo de tipo no select
  const handleTypeChange = (value: string) => {
    setValue('type', value as ResearchStudyFormData['type']);
  };
  
  // Valor atual do select
  const currentType = watch('type');
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          placeholder="Título do estudo"
          {...register('title', { required: "Título é obrigatório" })}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author">Autor *</Label>
        <Input
          id="author"
          placeholder="Nome do autor principal"
          {...register('author', { required: "Autor é obrigatório" })}
          className={errors.author ? "border-red-500" : ""}
        />
        {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coAuthors">Co-autores</Label>
        <Input
          id="coAuthors"
          placeholder="Nomes dos co-autores (separados por vírgula)"
          {...register('coAuthors')}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Tipo de Estudo *</Label>
        <Select 
          onValueChange={handleTypeChange} 
          value={currentType}
          required
        >
          <SelectTrigger className={errors.type ? "border-red-500" : ""}>
            <SelectValue placeholder="Selecione o tipo de estudo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="artigo">Artigo Científico</SelectItem>
            <SelectItem value="dissertacao">Dissertação</SelectItem>
            <SelectItem value="tese">Tese</SelectItem>
            <SelectItem value="livros">Livro</SelectItem>
            <SelectItem value="ebooks">E-book</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localização *</Label>
        <Input
          id="location"
          placeholder="Localização do estudo (ex: Macapá, AP)"
          {...register('location', { required: "Localização é obrigatória" })}
          className={errors.location ? "border-red-500" : ""}
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="repositoryUrl">URL do Repositório</Label>
        <Input
          id="repositoryUrl"
          placeholder="URL para o repositório ou documento completo"
          {...register('repositoryUrl')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Resumo</Label>
        <Textarea
          id="summary"
          placeholder="Breve resumo do estudo"
          {...register('summary')}
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full bg-forest-600 hover:bg-forest-700">
        {submitLabel}
      </Button>
    </form>
  );
};

export default ResearchForm;
