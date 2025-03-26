
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  Save,
  Trash2, 
  BarChart2, 
  ExternalLink, 
  Activity,
  Search,
  Calendar
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MediaSource {
  id: string;
  name: string;
  url: string;
  category: string;
  isMonitoring: boolean;
}

interface NewsClipping {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const MediaMonitoring: React.FC = () => {
  const [mediaSources, setMediaSources] = useState<MediaSource[]>([]);
  const [newsClippings, setNewsClippings] = useState<NewsClipping[]>([]);
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [isAddingClipping, setIsAddingClipping] = useState(false);
  const [filterSource, setFilterSource] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados do formulário para fontes
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceCategory, setSourceCategory] = useState('news');

  // Estados do formulário para clippings
  const [clippingTitle, setClippingTitle] = useState('');
  const [clippingUrl, setClippingUrl] = useState('');
  const [clippingDate, setClippingDate] = useState('');
  const [clippingSource, setClippingSource] = useState('');
  const [clippingSentiment, setClippingSentiment] = useState<'positive' | 'negative' | 'neutral'>('neutral');

  const resetSourceForm = () => {
    setSourceName('');
    setSourceUrl('');
    setSourceCategory('news');
  };

  const resetClippingForm = () => {
    setClippingTitle('');
    setClippingUrl('');
    setClippingDate(new Date().toISOString().split('T')[0]);
    setClippingSource('');
    setClippingSentiment('neutral');
  };

  const handleAddSource = () => {
    if (!sourceName || !sourceUrl) {
      alert("Por favor, preencha os campos Nome e URL");
      return;
    }

    const newSource: MediaSource = {
      id: Date.now().toString(),
      name: sourceName,
      url: sourceUrl,
      category: sourceCategory,
      isMonitoring: true
    };

    setMediaSources([...mediaSources, newSource]);
    resetSourceForm();
    setIsAddingSource(false);
  };

  const handleAddClipping = () => {
    if (!clippingTitle || !clippingUrl || !clippingSource) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const newClipping: NewsClipping = {
      id: Date.now().toString(),
      sourceId: clippingSource,
      title: clippingTitle,
      url: clippingUrl,
      date: clippingDate || new Date().toISOString(),
      sentiment: clippingSentiment
    };

    setNewsClippings([...newsClippings, newClipping]);
    resetClippingForm();
    setIsAddingClipping(false);
  };

  const handleToggleMonitoring = (id: string) => {
    setMediaSources(mediaSources.map(source => 
      source.id === id ? { ...source, isMonitoring: !source.isMonitoring } : source
    ));
  };

  const handleDeleteSource = (id: string) => {
    setMediaSources(mediaSources.filter(source => source.id !== id));
    // Também remover clippings associados
    setNewsClippings(newsClippings.filter(clipping => clipping.sourceId !== id));
  };

  const handleDeleteClipping = (id: string) => {
    setNewsClippings(newsClippings.filter(clipping => clipping.id !== id));
  };

  // Filtragem de clippings
  const filteredClippings = newsClippings.filter(clipping => {
    const matchesSearch = clipping.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = filterSource === 'all' || clipping.sourceId === filterSource;
    return matchesSearch && matchesSource;
  });

  // Estatísticas
  const positiveCount = newsClippings.filter(c => c.sentiment === 'positive').length;
  const neutralCount = newsClippings.filter(c => c.sentiment === 'neutral').length;
  const negativeCount = newsClippings.filter(c => c.sentiment === 'negative').length;
  const totalCount = newsClippings.length;

  const getSourceById = (id: string) => {
    return mediaSources.find(source => source.id === id);
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'news': 'Notícias',
      'blog': 'Blog',
      'tv': 'TV',
      'radio': 'Rádio',
      'social': 'Mídia Social',
      'magazine': 'Revista',
      'other': 'Outro'
    };
    return categories[category] || category;
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-forest-700">Clipping de Mídia</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsAddingSource(true)}
            className="flex items-center gap-2"
            disabled={isAddingSource || isAddingClipping}
          >
            <PlusCircle size={16} />
            Nova Fonte
          </Button>
          <Button 
            onClick={() => {
              if (mediaSources.length === 0) {
                alert("Adicione pelo menos uma fonte de mídia antes de adicionar clippings");
                return;
              }
              setIsAddingClipping(true);
              resetClippingForm();
            }}
            className="flex items-center gap-2"
            disabled={isAddingSource || isAddingClipping || mediaSources.length === 0}
          >
            <PlusCircle size={16} />
            Novo Clipping
          </Button>
        </div>
      </div>

      {/* Formulário para adicionar fonte */}
      {isAddingSource && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adicionar Nova Fonte de Mídia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sourceName">Nome da Fonte *</Label>
                <Input 
                  id="sourceName" 
                  value={sourceName} 
                  onChange={(e) => setSourceName(e.target.value)} 
                  placeholder="Nome do veículo ou site"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sourceUrl">URL *</Label>
                <Input 
                  id="sourceUrl" 
                  value={sourceUrl} 
                  onChange={(e) => setSourceUrl(e.target.value)} 
                  placeholder="https://exemplo.com"
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="sourceCategory">Categoria</Label>
                <Select
                  value={sourceCategory}
                  onValueChange={setSourceCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">Notícias</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="tv">TV</SelectItem>
                    <SelectItem value="radio">Rádio</SelectItem>
                    <SelectItem value="social">Mídia Social</SelectItem>
                    <SelectItem value="magazine">Revista</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingSource(false);
                  resetSourceForm();
                }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddSource} 
                className="flex items-center gap-2"
              >
                <Save size={16} />
                Salvar Fonte
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formulário para adicionar clipping */}
      {isAddingClipping && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adicionar Novo Clipping</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="clippingTitle">Título da Matéria *</Label>
                <Input 
                  id="clippingTitle" 
                  value={clippingTitle} 
                  onChange={(e) => setClippingTitle(e.target.value)} 
                  placeholder="Título da matéria ou reportagem"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clippingUrl">URL da Matéria *</Label>
                <Input 
                  id="clippingUrl" 
                  value={clippingUrl} 
                  onChange={(e) => setClippingUrl(e.target.value)} 
                  placeholder="https://exemplo.com/noticia"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clippingDate">Data de Publicação</Label>
                <Input 
                  id="clippingDate" 
                  type="date" 
                  value={clippingDate} 
                  onChange={(e) => setClippingDate(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clippingSource">Fonte *</Label>
                <Select
                  value={clippingSource}
                  onValueChange={setClippingSource}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediaSources.map(source => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clippingSentiment">Sentimento</Label>
                <Select
                  value={clippingSentiment}
                  onValueChange={(value) => setClippingSentiment(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sentimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positivo</SelectItem>
                    <SelectItem value="neutral">Neutro</SelectItem>
                    <SelectItem value="negative">Negativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingClipping(false);
                  resetClippingForm();
                }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddClipping} 
                className="flex items-center gap-2"
              >
                <Save size={16} />
                Salvar Clipping
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dashboard de estatísticas */}
      {!isAddingSource && !isAddingClipping && newsClippings.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-forest-50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-forest-100 p-2 rounded-full">
                <Activity size={20} className="text-forest-700" />
              </div>
              <div>
                <p className="text-sm text-forest-600">Total</p>
                <p className="text-xl font-semibold text-forest-700">{totalCount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Activity size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-600">Positivas</p>
                <p className="text-xl font-semibold text-green-700">{positiveCount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Activity size={20} className="text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Neutras</p>
                <p className="text-xl font-semibold text-gray-700">{neutralCount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Activity size={20} className="text-red-700" />
              </div>
              <div>
                <p className="text-sm text-red-600">Negativas</p>
                <p className="text-xl font-semibold text-red-700">{negativeCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lista de fontes */}
      {!isAddingSource && !isAddingClipping && mediaSources.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-forest-700 mb-3">Fontes Monitoradas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaSources.map(source => (
              <Card key={source.id} className={`overflow-hidden hover:shadow-md transition-shadow ${source.isMonitoring ? 'border-forest-200' : 'border-gray-200 opacity-60'}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-forest-700">{source.name}</h3>
                      <p className="text-sm text-forest-600 flex items-center gap-1 mt-1">
                        {getCategoryLabel(source.category)}
                      </p>
                    </div>
                    <Button 
                      variant={source.isMonitoring ? "default" : "outline"} 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleToggleMonitoring(source.id)}
                    >
                      {source.isMonitoring ? 'Monitorando' : 'Inativo'}
                    </Button>
                  </div>
                  
                  <div className="mt-3">
                    <a 
                      href={source.url.startsWith('http') ? source.url : `https://${source.url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-forest-600 hover:text-forest-800 flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      {source.url}
                    </a>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteSource(source.id)}
                      className="h-8"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Lista de clippings */}
      {!isAddingSource && !isAddingClipping && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-forest-700">Clippings</h3>
            
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-600" />
                <Input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..." 
                  className="pl-10 w-full"
                />
              </div>
              
              <Select
                value={filterSource}
                onValueChange={setFilterSource}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filtrar por fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as fontes</SelectItem>
                  {mediaSources.map(source => (
                    <SelectItem key={source.id} value={source.id}>{source.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {newsClippings.length === 0 ? (
            <div className="text-center py-8 text-forest-600 bg-forest-50/50 rounded-lg">
              <BarChart2 size={48} className="mx-auto mb-2 text-forest-400" />
              <p>Nenhum clipping cadastrado</p>
              <Button 
                variant="link" 
                onClick={() => {
                  if (mediaSources.length === 0) {
                    alert("Adicione pelo menos uma fonte de mídia antes de adicionar clippings");
                    setIsAddingSource(true);
                    return;
                  }
                  setIsAddingClipping(true);
                  resetClippingForm();
                }}
              >
                Clique aqui para adicionar o primeiro
              </Button>
            </div>
          ) : filteredClippings.length === 0 ? (
            <div className="text-center py-8 text-forest-600 bg-forest-50/50 rounded-lg">
              <Search size={48} className="mx-auto mb-2 text-forest-400" />
              <p>Nenhum clipping encontrado com os filtros atuais</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterSource('all');
                }}
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClippings.map(clipping => {
                const source = getSourceById(clipping.sourceId);
                return (
                  <Card key={clipping.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-forest-700">{clipping.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-forest-600">
                              {source?.name || 'Fonte desconhecida'}
                            </span>
                            <span className="text-xs text-forest-500 flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {new Date(clipping.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          clipping.sentiment === 'positive' ? 'bg-green-100 text-green-700' : 
                          clipping.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {clipping.sentiment === 'positive' ? 'Positivo' : 
                           clipping.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <a 
                          href={clipping.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-forest-600 hover:text-forest-800 flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          Acessar matéria
                        </a>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteClipping(clipping.id)}
                          className="h-8"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaMonitoring;
