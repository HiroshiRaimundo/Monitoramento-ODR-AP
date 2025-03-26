
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Calendar, FileText, Search, Filter, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Tipos simulados para os releases/reportagens
interface PressItem {
  id: string;
  title: string;
  type: "release" | "news";
  category: string;
  status: "draft" | "sent" | "published";
  date: string;
}

// Dados simulados para demonstração
const mockPressItems: PressItem[] = [
  {
    id: "1",
    title: "Nova pesquisa sobre biodiversidade na Amazônia",
    type: "release",
    category: "Meio Ambiente",
    status: "published",
    date: "2024-06-05"
  },
  {
    id: "2",
    title: "Estudo aponta avanços na governança sustentável",
    type: "release",
    category: "Política",
    status: "sent",
    date: "2024-06-02"
  },
  {
    id: "3",
    title: "Impactos econômicos do desenvolvimento sustentável",
    type: "news",
    category: "Economia",
    status: "draft",
    date: "2024-05-28"
  },
  {
    id: "4",
    title: "Comunidades tradicionais e sustentabilidade",
    type: "news",
    category: "Social",
    status: "published",
    date: "2024-05-25"
  },
  {
    id: "5",
    title: "Parcerias internacionais para a Amazônia",
    type: "release",
    category: "Internacional",
    status: "sent",
    date: "2024-05-22"
  }
];

// Componente de tradução de status
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let color;
  let text;

  switch (status) {
    case "draft":
      color = "bg-gray-200 text-gray-800";
      text = "Rascunho";
      break;
    case "sent":
      color = "bg-blue-200 text-blue-800";
      text = "Enviado";
      break;
    case "published":
      color = "bg-green-200 text-green-800";
      text = "Publicado";
      break;
    default:
      color = "bg-gray-200 text-gray-800";
      text = status;
  }

  return (
    <span className={`${color} px-2 py-1 rounded-full text-xs font-medium`}>
      {text}
    </span>
  );
};

interface PressDashboardProps {
  onCreateRelease: () => void;
}

const PressDashboard: React.FC<PressDashboardProps> = ({ onCreateRelease }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewType, setViewType] = useState("table");

  // Filtragem dos dados
  const filteredItems = mockPressItems.filter(item => {
    return (
      (searchTerm === "" || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === null || item.status === selectedStatus) &&
      (selectedCategory === null || item.category === selectedCategory)
    );
  });

  // Contagem de itens por status para o gráfico
  const statusCounts = {
    draft: mockPressItems.filter(item => item.status === "draft").length,
    sent: mockPressItems.filter(item => item.status === "sent").length,
    published: mockPressItems.filter(item => item.status === "published").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold text-forest-700">Dashboard da Assessoria</h2>
        <Button 
          className="flex items-center gap-2" 
          onClick={onCreateRelease}
        >
          <Plus size={16} />
          Novo Release
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-forest-600">Total de Releases</p>
                <h3 className="text-2xl font-bold">{mockPressItems.filter(i => i.type === "release").length}</h3>
              </div>
              <div className="h-12 w-12 bg-forest-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-forest-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-forest-600">Publicados</p>
                <h3 className="text-2xl font-bold">{mockPressItems.filter(i => i.status === "published").length}</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-forest-600">Pendentes</p>
                <h3 className="text-2xl font-bold">{mockPressItems.filter(i => i.status === "draft" || i.status === "sent").length}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-2.5 top-2.5 text-gray-500" />
              <Input
                placeholder="Buscar por título..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="sent">Enviado</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
                  <SelectItem value="Política">Política</SelectItem>
                  <SelectItem value="Economia">Economia</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Internacional">Internacional</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Tabs defaultValue="table" className="w-full md:w-auto" value={viewType} onValueChange={setViewType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table" className="px-3">
                  <Table size={16} />
                </TabsTrigger>
                <TabsTrigger value="chart" className="px-3">
                  <BarChart size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo principal - Tabela ou Gráfico */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Releases e Reportagens</CardTitle>
        </CardHeader>
        <CardContent>
          <TabsContent value="table" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.type === "release" ? "Release" : "Reportagem"}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell>{new Date(item.date).toLocaleDateString('pt-BR')}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="chart" className="mt-0">
            <div className="h-80 flex items-center justify-center">
              <div className="w-full max-w-md">
                <h3 className="text-center mb-4">Distribuição por Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-5">
                      <div className="bg-gray-400 h-5 rounded-full" style={{ width: `${(statusCounts.draft / mockPressItems.length) * 100}%` }}></div>
                    </div>
                    <span className="ml-2 text-sm">Rascunho ({statusCounts.draft})</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-5">
                      <div className="bg-blue-400 h-5 rounded-full" style={{ width: `${(statusCounts.sent / mockPressItems.length) * 100}%` }}></div>
                    </div>
                    <span className="ml-2 text-sm">Enviado ({statusCounts.sent})</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-5">
                      <div className="bg-green-400 h-5 rounded-full" style={{ width: `${(statusCounts.published / mockPressItems.length) * 100}%` }}></div>
                    </div>
                    <span className="ml-2 text-sm">Publicado ({statusCounts.published})</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressDashboard;
