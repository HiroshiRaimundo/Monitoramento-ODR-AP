
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResearchStudyFormData } from "@/types/research";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ResearchFormProps {
  form: UseFormReturn<ResearchStudyFormData>;
  onSubmit: (data: ResearchStudyFormData) => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ form, onSubmit }) => {
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [addedCategories, setAddedCategories] = useState<string[]>([]);

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      // Set the custom category value
      form.setValue("type", customCategory.trim());
      
      // Add to our list of custom categories if it's not already there
      if (!addedCategories.includes(customCategory.trim())) {
        setAddedCategories([...addedCategories, customCategory.trim()]);
      }
      
      // Close the dialog and reset the input
      setShowCustomCategory(false);
      setCustomCategory("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Estudo Acadêmico</CardTitle>
        <CardDescription>
          Adicione informações sobre artigos, dissertações e teses para visualização no mapa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">Título do Estudo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Análise dos impactos ambientais no Amapá" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Author field */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">Autor Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor principal" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Co-authors field */}
            <FormField
              control={form.control}
              name="coAuthors"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">Coautores</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome dos coautores (separados por vírgula)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separe os nomes dos coautores por vírgula
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Summary field */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">Resumo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve resumo do estudo (até 600 caracteres)" 
                      className="resize-none"
                      maxLength={600}
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Máximo de 600 caracteres
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Repository URL field */}
            <FormField
              control={form.control}
              name="repositoryUrl"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">Link do Repositório</FormLabel>
                  <FormControl>
                    <Input placeholder="https://repositorio.exemplo.com/estudo" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL onde o estudo completo pode ser acessado
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Type field with custom category dialog */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">Tipo de Estudo</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl className="flex-1">
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de estudo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="artigo">Artigo</SelectItem>
                            <SelectItem value="dissertacao">Dissertação</SelectItem>
                            <SelectItem value="tese">Tese</SelectItem>
                            <SelectItem value="livros">Livros</SelectItem>
                            <SelectItem value="ebooks">E-books</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                            {/* Custom categories */}
                            {addedCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <Dialog open={showCustomCategory} onOpenChange={setShowCustomCategory}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          type="button" 
                          title="Adicionar nova categoria"
                        >
                          <Plus size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col space-y-4 py-4">
                          <FormItem className="text-left">
                            <FormLabel>Nome da Categoria</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: Monografia" 
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                              />
                            </FormControl>
                          </FormItem>
                          <Button 
                            type="button" 
                            onClick={handleAddCustomCategory}
                            disabled={!customCategory.trim()}
                          >
                            Adicionar Categoria
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </FormItem>
              )}
            />

            {/* Location field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">Localização do Estudo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Ex: Macapá, Santana, Laranjal do Jari..." {...field} />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Digite o nome do município no Amapá onde o estudo foi realizado
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Adicionar ao Mapa</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResearchForm;
