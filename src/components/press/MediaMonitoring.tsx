
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  FileSearch,
  Globe,
  Check,
  X,
  Search,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertCircle
} from "lucide-react";

interface MonitoredItem {
  id: string;
  title: string;
  originalType: 'release' | 'news';
  url: string;
  publishedDate?: string;
  lastChecked: string;
  status: 'found' | 'not_found' | 'pending';
  source?: string;
}

const MediaMonitoring: React.FC = () => {
  const { toast } = useToast();
  const [monitoredItems, setMonitoredItems] = useState<MonitoredItem[]>([
    {
      id: "1",
      title: "UNIFAP lança programa de pesquisa na Amazônia",
      originalType: 'release',
      url: "https://portal.amapa.gov.br/noticias/unifap-programa-pesquisa",
      publishedDate: "2023-11-16T08:45:00Z",
      lastChecked: "2023-11-20T10:30:00Z",
      status: 'found',
      source: "Portal do Governo do Amapá"
    },
    {
      id: "2",
      title: "Pesquisadores descobrem nova espécie na região do Oiapoque",
      originalType: 'news',
      url: "https://jornaldoamapa.com.br/nova-especie-oiapoque",
      publishedDate: "2023-12-02T14:20:00Z",
      lastChecked: "2023-12-05T09:15:00Z",
      status: 'found',
      source: "Jornal do Amapá"
    },
    {
      id: "3",
      title: "PPGDAPP promove evento internacional sobre desenvolvimento sustentável",
      originalType: 'release',
      url: "https://agazeta.net/evento-desenvolvimento",
      lastChecked: "2024-01-10T11:25:00Z",
      status: 'not_found'
    },
    {
      id: "4",
      title: "Novo laboratório de pesquisa ambiental é inaugurado no campus",
      originalType: 'release',
      url: "",
      lastChecked: "2024-02-15T16:40:00Z",
      status: 'pending'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [monitoringItemId, setMonitoringItemId] = useState<string | null>(null);
  
  // Filter monitored items
  const filteredItems = monitoredItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.source && item.source.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Refresh monitored items status
  const refreshStatus = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demonstration, we'll randomly update a few items
      const updatedItems = monitoredItems.map(item => {
        if (item.status === 'pending' && Math.random() > 0.5) {
          return {
            ...item,
            status: 'found' as const,
            publishedDate: new Date().toISOString(),
            lastChecked: new Date().toISOString(),
            source: "Portal de Notícias da Amazônia"
          };
        }
        return {
          ...item,
          lastChecked: new Date().toISOString()
        };
      });
      
      setMonitoredItems(updatedItems);
      setIsRefreshing(false);
      
      toast({
        title: "Monitoramento atualizado",
        description: "O status de todas as publicações foi atualizado."
      });
    }, 2000);
  };
  
  // Add new URL to monitor
  const addUrlToMonitor = (id: string) => {
    if (!newUrl) {
      toast({
        title: "URL vazia",
        description: "Por favor, informe uma URL válida para monitorar.",
        variant: "destructive"
      });
      return;
    }
    
    // Update item with new URL
    const updatedItems = monitoredItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          url: newUrl,
          status: 'pending' as const,
          lastChecked: new Date().toISOString()
        };
      }
      return item;
    });
    
    setMonitoredItems(updatedItems);
    setNewUrl('');
    setMonitoringItemId(null);
    
    toast({
      title: "URL adicionada",
      description: "A URL foi adicionada para monitoramento."
    });
  };
  
  // Render status badge
  const renderStatusBadge = (status: MonitoredItem['status']) => {
    switch (status) {
      case 'found':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
            <Check size={12} /> Publicado
          </Badge>
        );
      case 'not_found':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
            <X size={12} /> Não encontrado
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock size={12} /> Pendente
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar publicações..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="stats flex gap-4">
            <div className="stat flex items-center gap-1 bg-green-50 p-2 rounded text-sm">
              <Check size={16} className="text-green-600" />
              <span>{monitoredItems.filter(i => i.status === 'found').length} Publicados</span>
            </div>
            <div className="stat flex items-center gap-1 bg-yellow-50 p-2 rounded text-sm">
              <Clock size={16} className="text-yellow-600" />
              <span>{monitoredItems.filter(i => i.status === 'pending').length} Pendentes</span>
            </div>
            <div className="stat flex items-center gap-1 bg-red-50 p-2 rounded text-sm">
              <X size={16} className="text-red-600" />
              <span>{monitoredItems.filter(i => i.status === 'not_found').length} Não encontrados</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={refreshStatus}
          disabled={isRefreshing}
          className="ml-4"
        >
          <RefreshCw size={16} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Monitoramento de Publicações</CardTitle>
          <CardDescription>
            Acompanhe se os releases enviados foram publicados em veículos de mídia
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>Última Verificação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? filteredItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.originalType === 'release' ? 'Release' : 'Reportagem'}
                  </TableCell>
                  <TableCell>{renderStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    {item.source || '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(item.lastChecked).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    {item.status === 'found' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => window.open(item.url, '_blank')}
                      >
                        <ExternalLink size={14} /> Ver
                      </Button>
                    ) : item.status === 'not_found' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          setMonitoringItemId(item.id);
                          setNewUrl('');
                        }}
                      >
                        <Globe size={14} /> Adicionar URL
                      </Button>
                    ) : item.url ? (
                      <div className="flex items-center text-yellow-600 text-sm">
                        <AlertCircle size={14} className="mr-1" /> Verificando...
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          setMonitoringItemId(item.id);
                          setNewUrl('');
                        }}
                      >
                        <Globe size={14} /> Adicionar URL
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhuma publicação encontrada.
                  </TableCell>
                </TableRow>
              )}
              
              {monitoringItemId && (
                <TableRow className="bg-muted/20">
                  <TableCell colSpan={6}>
                    <div className="flex items-center gap-2 p-2">
                      <Input
                        placeholder="Informe a URL da publicação"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        size="sm"
                        onClick={() => addUrlToMonitor(monitoringItemId)}
                      >
                        Adicionar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setMonitoringItemId(null)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaMonitoring;
