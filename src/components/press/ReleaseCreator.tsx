
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  FileText,
  Newspaper,
  Plus,
  Edit,
  Save,
  Send,
  Tag,
  Users,
  CheckCircle
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";

// Types
interface ReleaseItem {
  id: string;
  title: string;
  content: string;
  type: 'release' | 'news';
  date: string;
  status: 'draft' | 'sent' | 'published';
  media: Array<{type: string, url: string}>;
  categories?: string[];
}

interface JournalistContact {
  id: string;
  name: string;
  email: string;
  organization: string;
  category: string;
}

// Dummy data
const dummyContacts: JournalistContact[] = [
  { id: "1", name: "Carlos Silva", email: "carlos@jornaldoamapa.com.br", organization: "Jornal do Amapá", category: "Educação" },
  { id: "2", name: "Mariana Costa", email: "mariana@portal.com.br", organization: "Portal de Notícias", category: "Educação" },
  { id: "3", name: "Rafael Mendes", email: "rafael@gazeta.com.br", organization: "A Gazeta", category: "Ciência" },
  { id: "4", name: "Ana Luiza", email: "ana@radiofm.com.br", organization: "Rádio FM", category: "Ciência" },
  { id: "5", name: "Felipe Góes", email: "felipe@tvamapa.com.br", organization: "TV Amapá", category: "Meio Ambiente" },
  { id: "6", name: "Patrícia Lima", email: "patricia@g1amapa.com.br", organization: "G1 Amapá", category: "Meio Ambiente" },
  { id: "7", name: "Ricardo Almeida", email: "ricardo@folha.com.br", organization: "Folha Regional", category: "Eventos" },
  { id: "8", name: "Juliana Santos", email: "juliana@diarioweb.com.br", organization: "Diário Web", category: "Geral" }
];

const ReleaseCreator: React.FC = () => {
  const { toast } = useToast();
  const [contentType, setContentType] = useState<'release' | 'news'>('release');
  const [items, setItems] = useState<ReleaseItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ReleaseItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Funções
  const handleSave = (title: string, content: string, media: {type: string, url: string}[]) => {
    if (currentItem) {
      // Editar existente
      const updatedItems = items.map(item => 
        item.id === currentItem.id 
          ? { 
              ...item, 
              title, 
              content, 
              media,
              date: new Date().toISOString() 
            } 
          : item
      );
      setItems(updatedItems);
      toast({
        title: "Conteúdo atualizado",
        description: `O ${contentType === 'release' ? 'release' : 'reportagem'} foi atualizado com sucesso.`,
      });
    } else {
      // Criar novo
      const newItem: ReleaseItem = {
        id: Date.now().toString(),
        title,
        content,
        type: contentType,
        date: new Date().toISOString(),
        status: 'draft',
        media
      };
      setItems([newItem, ...items]);
      toast({
        title: "Conteúdo criado",
        description: `O ${contentType === 'release' ? 'release' : 'reportagem'} foi criado com sucesso.`,
      });
    }
    setIsCreating(false);
    setCurrentItem(null);
  };

  const handleSend = () => {
    if (!currentItem) return;
    
    if (selectedCategories.length === 0) {
      toast({
        title: "Selecione categorias",
        description: "Selecione pelo menos uma categoria para enviar.",
        variant: "destructive"
      });
      return;
    }

    // Filtrar jornalistas por categorias selecionadas
    const relevantContacts = dummyContacts.filter(
      contact => selectedCategories.includes(contact.category)
    );

    // Atualizar status
    const updatedItems = items.map(item => 
      item.id === currentItem.id 
        ? { 
            ...item, 
            status: 'sent',
            categories: selectedCategories
          } 
        : item
    );
    
    setItems(updatedItems);
    setIsSending(false);
    setSelectedCategories([]);
    
    toast({
      title: "Conteúdo enviado",
      description: `O ${currentItem.type === 'release' ? 'release' : 'reportagem'} foi enviado para ${relevantContacts.length} contatos.`,
    });
  };

  // Criar lista de categorias únicas a partir dos contatos
  const categories = Array.from(new Set(dummyContacts.map(contact => contact.category)));

  // Renderizar a lista de itens
  const renderItemsList = () => {
    if (items.filter(item => item.type === contentType).length === 0) {
      return (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          {contentType === 'release' ? <FileText className="mx-auto mb-4 text-muted-foreground" size={48} /> : <Newspaper className="mx-auto mb-4 text-muted-foreground" size={48} />}
          <h3 className="text-lg font-medium text-muted-foreground">Nenhum {contentType === 'release' ? 'release' : 'reportagem'} criado</h3>
          <Button 
            variant="link" 
            onClick={() => {
              setCurrentItem(null);
              setIsCreating(true);
            }}
          >
            Criar novo
          </Button>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {items
            .filter(item => item.type === contentType)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(item => (
              <Card key={item.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${item.status === 'draft' ? 'bg-muted' : item.status === 'sent' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      {item.status === 'draft' && (
                        <span className="text-sm text-muted-foreground">Rascunho</span>
                      )}
                      {item.status === 'sent' && (
                        <span className="text-sm text-blue-600">Enviado</span>
                      )}
                      {item.status === 'published' && (
                        <span className="text-sm text-green-600">Publicado</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setCurrentItem(item);
                          setIsCreating(true);
                        }}
                      >
                        <Edit size={16} className="mr-1" /> Editar
                      </Button>
                      
                      {item.status === 'draft' && (
                        <Button 
                          size="sm"
                          onClick={() => {
                            setCurrentItem(item);
                            setIsSending(true);
                          }}
                        >
                          <Send size={16} className="mr-1" /> Enviar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Tabs 
          value={contentType} 
          onValueChange={(value) => setContentType(value as 'release' | 'news')}
          className="w-[300px]"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="release" className="flex items-center gap-1">
              <FileText size={16} /> Releases
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-1">
              <Newspaper size={16} /> Reportagens
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          onClick={() => {
            setCurrentItem(null);
            setIsCreating(true);
          }}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Criar {contentType === 'release' ? 'Release' : 'Reportagem'}
        </Button>
      </div>
      
      {isCreating ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {currentItem 
                ? `Editar ${contentType === 'release' ? 'Release' : 'Reportagem'}`
                : `Novo ${contentType === 'release' ? 'Release' : 'Reportagem'}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor 
              initialTitle={currentItem?.title || ''}
              initialContent={currentItem?.content || ''}
              onSave={handleSave}
              type={contentType}
            />
            <div className="flex justify-start mt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreating(false);
                  setCurrentItem(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        renderItemsList()
      )}
      
      {/* Dialog para envio de releases/reportagens */}
      <Dialog open={isSending} onOpenChange={setIsSending}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar para Contatos</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Tag size={16} /> Selecione as categorias
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedCategories.includes(category)) {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    } else {
                      setSelectedCategories([...selectedCategories, category]);
                    }
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="border rounded-md overflow-hidden mt-4">
              <div className="bg-muted p-2 px-3 text-sm font-medium flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Users size={16} /> Jornalistas selecionados
                </span>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {selectedCategories.length > 0 
                    ? dummyContacts.filter(contact => selectedCategories.includes(contact.category)).length 
                    : 0}
                </span>
              </div>
              
              <ScrollArea className="h-[200px]">
                <div className="p-2">
                  {selectedCategories.length > 0 ? (
                    dummyContacts
                      .filter(contact => selectedCategories.includes(contact.category))
                      .map(contact => (
                        <div key={contact.id} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-xs text-muted-foreground">{contact.organization}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{contact.email}</div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Selecione uma categoria para ver os contatos
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSending(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSend}
              disabled={selectedCategories.length === 0}
              className="flex items-center gap-1"
            >
              <Send size={16} /> Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReleaseCreator;
