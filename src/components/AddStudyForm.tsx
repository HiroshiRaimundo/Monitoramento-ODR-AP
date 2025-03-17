
import { useState } from 'react';
import { geocodeLocation } from '../utils/geocoder';
import { MapPoint } from '../types/map';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface AddStudyFormProps {
  onAddStudy: (study: MapPoint) => void;
}

const AddStudyForm: React.FC<AddStudyFormProps> = ({ onAddStudy }) => {
  const municipalities = [
    "Amapá", "Calçoene", "Cutias", "Ferreira Gomes", "Itaubal",
    "Laranjal do Jari", "Macapá", "Mazagão", "Oiapoque",
    "Pedra Branca do Amapari", "Porto Grande", "Pracuúba",
    "Santana", "Serra do Navio", "Tartarugalzinho", "Vitória do Jari"
  ];

  const form = useForm({
    defaultValues: {
      title: '',
      author: '',
      location: municipalities[0],
      type: 'artigo' as 'artigo' | 'dissertacao' | 'tese' | 'livros' | 'ebooks' | 'outro',
      summary: '',
      repositoryUrl: ''
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      const coordinates = await geocodeLocation(data.location);
      
      console.log('Dados do formulário:', data);
      console.log('Coordenadas:', coordinates);

      if (coordinates) {
        const newStudy: MapPoint = {
          id: Date.now().toString(),
          title: data.title,
          author: data.author,
          type: data.type,
          coordinates,
          summary: data.summary,
          location: data.location,
          repositoryUrl: data.repositoryUrl
        };
        
        onAddStudy(newStudy);
        
        // Notificar usuário
        toast({
          title: "Estudo adicionado",
          description: "O estudo foi adicionado e aparecerá no mapa.",
        });
        
        form.reset({
          title: '',
          author: '',
          location: municipalities[0],
          type: 'artigo',
          summary: '',
          repositoryUrl: ''
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar estudo:", error);
      toast({
        title: "Erro ao adicionar estudo",
        description: "Ocorreu um problema ao tentar adicionar o estudo.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-forest-100 shadow-md mb-4">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 text-lg">Adicionar Novo Estudo</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do estudo" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um município" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {municipalities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="artigo">Artigo</SelectItem>
                        <SelectItem value="dissertacao">Dissertação</SelectItem>
                        <SelectItem value="tese">Tese</SelectItem>
                        <SelectItem value="livros">Livro</SelectItem>
                        <SelectItem value="ebooks">E-Book</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve resumo do estudo" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="repositoryUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Repositório</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Link para o repositório ou publicação" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-2">
              <Button type="submit" className="bg-forest-600 hover:bg-forest-700">
                Adicionar Estudo
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddStudyForm;
