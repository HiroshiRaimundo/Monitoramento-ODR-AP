
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Newspaper, ExternalLink, Calendar, PlusCircle, Search, Radio, Edit, Trash, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MediaItem {
  id: string;
  title: string;
  source: string;
  url: string;
  date: string;
  summary: string;
  type: "positive" | "neutral" | "negative";
  category: string;
  relatedRelease?: string;
}

const mediaSources = [
  "Jornal da Amazônia",
  "Globo Media",
  "Notícias Ambientais",
  "Economia News",
  "Folha de São Paulo",
  "O Estado de São Paulo",
  "Portal G1",
  "UOL",
  "CNN Brasil",
  "BBC Brasil"
];

const categories = [
  "Meio Ambiente",
  "Economia",
  "Política",
  "Social",
  "Internacional",
  "Ciência",
  "Tecnologia",
  "Educação"
];

// Dados simulados
const initialMediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Pesquisa revela novos mecanismos de regeneração da Amazônia",
    source: "Jornal da Amazônia",
    url: "https://www.jornaldaamazonia.com/noticia/123",
    date: "2024-06-02",
    summary: "Estudo da PPGDAS mostra que áreas desmatadas podem se regenerar mais rápido com novas técnicas.",
    type: "positive",
    category: "Meio Ambiente",
    relatedRelease: "Nova pesquisa sobre biodiversidade na Amazônia"
  },
  {
    id: "2",
    title: "Economistas destacam impacto dos estudos sobre desenvolvimento sustentável",
    source: "Economia News",
    url: "https://www.economianews.com.br/artigo/456",
    date: "2024-05-28",
    summary: "Pesquisadores apontam que o desenvolvimento sustentável pode gerar aumento de 5% no PIB regional.",
    type: "positive",
    category: "Economia",
    relatedRelease: "Impactos econômicos do desenvolvimento sustentável"
  },
  {
    id: "3",
    title: "Críticas à metodologia de pesquisa sobre governança na Amazônia",
    source: "Portal G1",
    url: "https://g1.globo.com/amazonia/noticia/789",
    date: "2024-05-20",
    summary: "Especialistas questionam abordagem utilizada em estudo recente sobre governança sustentável.",
    type: "negative",
    category: "Política"
  },
  {
    id: "4",
    title: "Comunidades tradicionais são destaque em reportagem internacional",
    source: "BBC Brasil",
    url: "https://www.bbc.com/portuguese/brasil-012345",
    date: "2024-05-15",
    summary: "Reportagem destaca o papel das comunidades tradicionais na preservação da floresta amazônica.",
    type: "positive",
    category: "Social",
    relatedRelease: "Comunidades tradicionais e sustentabilidade"
  }
];

const MediaMonitoring: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MediaItem | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Campos do formulário
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [type, setType] = useState<"positive" | "neutral" | "negative">("neutral");
  const [category, setCategory] = useState("");
  const [relatedRelease, setRelatedRelease] = useState("");
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const resetForm = () => {
    setTitle("");
    setSource("");
    setUrl("");
    setDate(new Date().toISOString().split('T')[0]);
    setSummary("");
    setType("neutral");
    setCategory("");
    setRelatedRelease("");
    setCurrentItem(null);
  };

  const openNewItemDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditItemDialog = (item: MediaItem) => {
    setCurrentItem(item);
    setTitle(item.title);
    setSource(item.source);
    setUrl(item.url);
    setDate(item.date);
    setSummary(item.summary);
    setType(item.type);
    setCategory(item.category);
    setRelatedRelease(item.relatedRelease || "");
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!title || !source || !url || !date || !summary || !category) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (currentItem) {
      // Editar item existente
      const updatedItems = mediaItems.map(item => 
        item.id === currentItem.id
          ? { 
              ...item, 
              title, 
              source, 
              url, 
              date, 
              summary, 
              type, 
              category, 
              relatedRelease: relatedRelease || undefined 
            }
          : item
      );
      setMediaItems(updatedItems);
    } else {
      // Adicionar novo item
      const newItem: MediaItem = {
        id: Date.now().toString(),
        title,
        source,
        url,
        date,
        summary,
        type,
        category,
        relatedRelease: relatedRelease || undefined
      };
      setMediaItems([newItem, ...mediaItems]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este item de clipping?")) {
      setMediaItems(mediaItems.filter(item => item.id !== id));
    }
  };

  const openViewDialog = (item: MediaItem) => {
    setCurrentItem(item);
    setViewDialogOpen(true);
  };

  // Filtragem
  const filteredItems = mediaItems.filter(item => {
    return (
      (activeTab === "all" || 
       (activeTab === "positive" && item.type === "positive") ||
       (activeTab === "neutral" && item.type === "neutral") ||
       (activeTab === "negative" && item.type === "negative")) &&
      (searchTerm === "" || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterSource === "" || item.source === filterSource) &&
      (filterCategory === "" || item.category === filterCategory)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-forest-700">Monitoramento de Mídia (Clipping)</h2>
        <Button 
          onClick={openNewItemDialog}
          className="flex items-center gap-2"
        >
          <PlusCircle size={16} />
          Novo Clipping
        </Button>
      </div>

      {/* Cards estatísticos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Menções Positivas</p>
                <h3 className="text-2xl font-bold text-green-700">{mediaItems.filter(i => i.type === "positive").length}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Newspaper size={24} className="text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Menções Neutras</p>
                <h3 className="text-2xl font-bold text-gray-700">{mediaItems.filter(i => i.type === "neutral").length}</h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Newspaper size={24} className="text-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Menções Negativas</p>
                <h3 className="text-2xl font-bold text-red-700">{mediaItems.filter(i => i.type === "negative").length}</h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Newspaper size={24} className="text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Todos
              </TabsTrigger>
              <TabsTrigger value="positive" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Positivos
              </TabsTrigger>
              <TabsTrigger value="neutral" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                Neutros
              </TabsTrigger>
              <TabsTrigger value="negative" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Negativos
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Buscar por título ou conteúdo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as fontes</SelectItem>
                {mediaSources.map((source) => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as categorias</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{item.title}</span>
                          {item.relatedRelease && (
                            <span className="text-xs text-forest-600 mt-1">
                              Relacionado ao release: {item.relatedRelease}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-forest-600" />
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-forest-50 rounded-full text-xs font-medium text-forest-700">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        {item.type === "positive" && (
                          <span className="px-2 py-1 bg-green-100 rounded-full text-xs font-medium text-green-700">
                            Positivo
                          </span>
                        )}
                        {item.type === "neutral" && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                            Neutro
                          </span>
                        )}
                        {item.type === "negative" && (
                          <span className="px-2 py-1 bg-red-100 rounded-full text-xs font-medium text-red-700">
                            Negativo
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openViewDialog(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye size={14} />
                            <span className="sr-only">Visualizar</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditItemDialog(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit size={14} />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash size={14} />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum item de clipping encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo para adicionar/editar item */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentItem ? "Editar Item de Clipping" : "Novo Item de Clipping"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título da Matéria</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Título da notícia ou reportagem" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="source">Fonte</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger id="source">
                  <SelectValue placeholder="Selecione a fonte" />
                </SelectTrigger>
                <SelectContent>
                  {mediaSources.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input 
                id="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                placeholder="https://exemplo.com/noticia" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Data de Publicação</Label>
              <Input 
                id="date" 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="summary">Resumo</Label>
              <textarea 
                id="summary" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
                placeholder="Resumo ou pontos principais da matéria" 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Menção</Label>
              <Select value={type} onValueChange={(value: "positive" | "neutral" | "negative") => setType(value)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positiva</SelectItem>
                  <SelectItem value="neutral">Neutra</SelectItem>
                  <SelectItem value="negative">Negativa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="relatedRelease">Relacionado ao Release (opcional)</Label>
              <Input 
                id="relatedRelease" 
                value={relatedRelease} 
                onChange={(e) => setRelatedRelease(e.target.value)} 
                placeholder="Título do release relacionado" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveItem}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para visualizar item */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {currentItem?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-forest-50 rounded-full text-xs font-medium text-forest-700">
                {currentItem?.category}
              </span>
              
              {currentItem?.type === "positive" && (
                <span className="px-2 py-1 bg-green-100 rounded-full text-xs font-medium text-green-700">
                  Menção Positiva
                </span>
              )}
              {currentItem?.type === "neutral" && (
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  Menção Neutra
                </span>
              )}
              {currentItem?.type === "negative" && (
                <span className="px-2 py-1 bg-red-100 rounded-full text-xs font-medium text-red-700">
                  Menção Negativa
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Radio size={14} />
              <span>{currentItem?.source}</span>
              <span>•</span>
              <Calendar size={14} />
              <span>{currentItem && new Date(currentItem.date).toLocaleDateString('pt-BR')}</span>
            </div>
            
            <div className="pt-2 pb-4">
              <p className="text-sm">{currentItem?.summary}</p>
            </div>
            
            {currentItem?.relatedRelease && (
              <div className="bg-forest-50 p-3 rounded-md">
                <p className="text-sm font-medium">Release relacionado:</p>
                <p className="text-sm text-forest-700">{currentItem.relatedRelease}</p>
              </div>
            )}
            
            <div className="pt-2">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <a href={currentItem?.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} />
                  Acessar matéria original
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaMonitoring;
