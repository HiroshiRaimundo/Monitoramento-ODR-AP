import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, BarChart, PieChart, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PressItem } from "./types/pressTypes";
import PublicationStatusChart from "./components/PublicationStatusChart";
import PublishedItemsList from "./components/PublishedItemsList";
import PressItemsTable from "./components/PressItemsTable";

// Mock data moved to a separate constant
const mockPressItems: PressItem[] = [
  {
    id: "1",
    title: "Nova pesquisa sobre biodiversidade na Amazônia",
    type: "release",
    category: "Meio Ambiente",
    status: "published",
    date: "2024-06-05",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu dolor nunc. Sed neque eros, interdum ut purus id, tincidunt pulvinar eros. Ut aliquam ante id ligula tempor posuere."
  },
  {
    id: "2",
    title: "Estudo aponta avanços na governança sustentável",
    type: "release",
    category: "Política",
    status: "sent",
    date: "2024-06-02",
    content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis est quam, tincidunt vel faucibus ut, porttitor vel erat."
  },
  {
    id: "3",
    title: "Impactos econômicos do desenvolvimento sustentável",
    type: "news",
    category: "Economia",
    status: "draft",
    date: "2024-05-28",
    content: "Fusce finibus urna vitae porttitor tincidunt. Mauris vitae nulla at nulla finibus condimentum. Phasellus consectetur feugiat ante, at blandit lorem pharetra vitae."
  },
  {
    id: "4",
    title: "Comunidades tradicionais e sustentabilidade",
    type: "news",
    category: "Social",
    status: "published",
    date: "2024-05-25",
    content: "Integer posuere ut tortor ac facilisis. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed tempor ex ut sem porttitor, id faucibus ipsum tempor."
  },
  {
    id: "5",
    title: "Parcerias internacionais para a Amazônia",
    type: "release",
    category: "Internacional",
    status: "sent",
    date: "2024-05-22",
    content: "Donec convallis ipsum non libero pulvinar, sed malesuada nisi sagittis. Donec dignissim congue magna, at scelerisque est accumsan quis."
  }
];

const PressDashboard: React.FC<{ onCreateRelease: () => void }> = ({ onCreateRelease }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [viewType, setViewType] = useState("table");
  const [selectedItem, setSelectedItem] = useState<PressItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewItem = (item: PressItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const filteredItems = mockPressItems.filter(item => {
    return (
      (searchTerm === "" || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === "todos" || item.status === selectedStatus) &&
      (selectedCategory === "todas" || item.category === selectedCategory)
    );
  });

  const totalReleases = mockPressItems.filter(item => item.type === "release").length;
  const publishedItems = mockPressItems.filter(item => item.status === "published").length;
  const pendingItems = mockPressItems.filter(item => item.status === "draft" || item.status === "sent").length;
  const uniqueCategories = Array.from(new Set(mockPressItems.map(item => item.category)));

  // Contagem de itens por status para o gráfico
  const statusCounts = {
    draft: mockPressItems.filter(item => item.status === "draft").length,
    sent: mockPressItems.filter(item => item.status === "sent").length,
    published: mockPressItems.filter(item => item.status === "published").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold text-forest-700">Dashboard da Assessoria</h2>
        <Button className="flex items-center gap-2" onClick={onCreateRelease}>
          <Plus size={16} />
          Novo Release
        </Button>
      </div>

      {/* View Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            <DialogDescription>
              {selectedItem?.type === "release" ? "Release" : "Reportagem"} • {selectedItem?.category} • 
              {selectedItem?.date ? new Date(selectedItem.date).toLocaleDateString('pt-BR') : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-gray-700">{selectedItem?.content}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <PublicationStatusChart items={mockPressItems} />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <PublishedItemsList items={mockPressItems} onViewItem={handleViewItem} />
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-forest-600">Total de Releases</p>
                <h3 className="text-2xl font-bold">{totalReleases}</h3>
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
                <h3 className="text-2xl font-bold">{publishedItems}</h3>
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
                <h3 className="text-2xl font-bold">{pendingItems}</h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="sent">Enviado</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categoria</SelectLabel>
                  <SelectItem value="todas">Todas</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Tabs defaultValue="table" className="w-full md:w-auto" value={viewType} onValueChange={setViewType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table" className="px-3">
                  <BarChart size={16} />
                </TabsTrigger>
                <TabsTrigger value="chart" className="px-3">
                  <PieChart size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Releases e Reportagens</CardTitle>
        </CardHeader>
        <CardContent>
          <TabsContent value="table" className="mt-0">
            <PressItemsTable items={filteredItems} onViewItem={handleViewItem} />
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
