
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Newspaper, 
  Calendar, 
  User, 
  Mail, 
  CheckCircle, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ContentItem {
  id: string;
  title: string;
  date: string;
  type: 'release' | 'news';
  status: 'draft' | 'sent' | 'published';
  categories: string[];
  sentTo: number;
  publishedAt?: string[];
}

const PressDashboard: React.FC = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  
  // Dados simulados para demonstração
  const contentItems: ContentItem[] = [
    { 
      id: "1", 
      title: "UNIFAP lança programa de pesquisa na Amazônia", 
      date: "2023-11-15", 
      type: 'release', 
      status: 'published', 
      categories: ['Educação', 'Meio Ambiente'],
      sentTo: 12,
      publishedAt: ["Portal A Gazeta", "G1 Amapá"]
    },
    { 
      id: "2", 
      title: "Pesquisadores descobrem nova espécie na região do Oiapoque", 
      date: "2023-12-01", 
      type: 'news', 
      status: 'published', 
      categories: ['Ciência', 'Biodiversidade'],
      sentTo: 8,
      publishedAt: ["Jornal do Amapá", "CNN Brasil"]
    },
    { 
      id: "3", 
      title: "PPGDAPP promove evento internacional sobre desenvolvimento sustentável", 
      date: "2024-01-05", 
      type: 'release', 
      status: 'sent', 
      categories: ['Eventos', 'Sustentabilidade'],
      sentTo: 15
    },
    { 
      id: "4", 
      title: "Novo laboratório de pesquisa ambiental é inaugurado no campus", 
      date: "2024-02-10", 
      type: 'release', 
      status: 'draft', 
      categories: ['Infraestrutura', 'Pesquisa'],
      sentTo: 0
    }
  ];

  // Estatísticas baseadas nos dados
  const stats = {
    total: contentItems.length,
    published: contentItems.filter(item => item.status === 'published').length,
    sent: contentItems.filter(item => item.status === 'sent').length,
    draft: contentItems.filter(item => item.status === 'draft').length,
    releases: contentItems.filter(item => item.type === 'release').length,
    news: contentItems.filter(item => item.type === 'news').length
  };

  // Função para renderizar o status com ícone
  const renderStatus = (status: ContentItem['status']) => {
    switch (status) {
      case 'published':
        return (
          <Badge variant="success" className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle size={14} /> Publicado
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Mail size={14} /> Enviado
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle size={14} /> Rascunho
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total de Conteúdos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-forest-50">
                  <FileText size={14} className="mr-1" /> {stats.releases}
                </Badge>
                <Badge variant="outline" className="bg-forest-50">
                  <Newspaper size={14} className="mr-1" /> {stats.news}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Taxa de Publicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0}%
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <CheckCircle size={14} className="mr-1" /> {stats.published} publicados
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Aguardando Publicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.sent}</div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <Mail size={14} className="mr-1" /> Enviados
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Histórico de Conteúdos</h3>
        <div className="flex gap-2">
          <Tabs value={selectedPeriod} onValueChange={(v) => setSelectedPeriod(v as any)}>
            <TabsList>
              <TabsTrigger value="day" className="text-xs px-2 py-1">Hoje</TabsTrigger>
              <TabsTrigger value="week" className="text-xs px-2 py-1">Esta Semana</TabsTrigger>
              <TabsTrigger value="month" className="text-xs px-2 py-1">Este Mês</TabsTrigger>
              <TabsTrigger value="year" className="text-xs px-2 py-1">Este Ano</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Categorias</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.type === 'release' ? 
                      <Badge variant="outline" className="bg-forest-50">
                        <FileText size={14} className="mr-1" /> Release
                      </Badge> : 
                      <Badge variant="outline" className="bg-forest-50">
                        <Newspaper size={14} className="mr-1" /> Reportagem
                      </Badge>
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.categories.map((category, index) => (
                        <Badge key={index} variant="outline" className="bg-forest-50 text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{renderStatus(item.status)}</TableCell>
                  <TableCell>
                    {item.status === 'sent' || item.status === 'published' ? (
                      <div className="text-xs text-muted-foreground">
                        Enviado para {item.sentTo} contatos
                        {item.publishedAt && item.publishedAt.length > 0 && (
                          <div className="mt-1">
                            Publicado em: {item.publishedAt.join(", ")}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Ainda não enviado
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressDashboard;
