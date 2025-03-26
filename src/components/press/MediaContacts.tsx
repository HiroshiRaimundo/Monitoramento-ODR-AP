
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, UserPlus, Edit, Trash, Mail, Building, Tag } from "lucide-react";

interface Journalist {
  id: string;
  name: string;
  email: string;
  category: string;
  media: string;
  phone?: string;
}

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

const MediaContacts: React.FC = () => {
  const [journalists, setJournalists] = useState<Journalist[]>([
    { id: "1", name: "Carlos Silva", email: "carlos@jornaleco.com.br", category: "Economia", media: "Jornal Econômico", phone: "(11) 98765-4321" },
    { id: "2", name: "Ana Melo", email: "ana@noticiasambiental.com", category: "Meio Ambiente", media: "Notícias Ambientais", phone: "(21) 99876-5432" },
    { id: "3", name: "Roberto Santos", email: "roberto@globomedia.com.br", category: "Política", media: "Globo Media", phone: "(31) 97654-3210" },
    { id: "4", name: "Luiza Costa", email: "luiza@jornaldaamazonia.com", category: "Meio Ambiente", media: "Jornal da Amazônia", phone: "(92) 98765-0987" },
    { id: "5", name: "Fernanda Lima", email: "fernanda@politicahoje.com", category: "Política", media: "Política Hoje", phone: "(61) 99876-1234" },
    { id: "6", name: "Paulo Mendes", email: "paulo@economianews.com.br", category: "Economia", media: "Economia News", phone: "(11) 97654-5678" },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentJournalist, setCurrentJournalist] = useState<Journalist | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  
  // Formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState("");
  const [phone, setPhone] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setCategory("");
    setMedia("");
    setPhone("");
    setCurrentJournalist(null);
  };

  const openNewJournalistDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditJournalistDialog = (journalist: Journalist) => {
    setCurrentJournalist(journalist);
    setName(journalist.name);
    setEmail(journalist.email);
    setCategory(journalist.category);
    setMedia(journalist.media);
    setPhone(journalist.phone || "");
    setIsDialogOpen(true);
  };

  const handleSaveJournalist = () => {
    if (!name || !email || !category || !media) {
      // Validação básica
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (currentJournalist) {
      // Editar jornalista existente
      const updatedJournalists = journalists.map(j => 
        j.id === currentJournalist.id
          ? { ...j, name, email, category, media, phone }
          : j
      );
      setJournalists(updatedJournalists);
    } else {
      // Adicionar novo jornalista
      const newJournalist: Journalist = {
        id: Date.now().toString(),
        name,
        email,
        category,
        media,
        phone: phone || undefined
      };
      setJournalists([...journalists, newJournalist]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleDeleteJournalist = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      setJournalists(journalists.filter(j => j.id !== id));
    }
  };

  // Filtragem
  const filteredJournalists = journalists.filter(j => {
    return (
      (searchTerm === "" || 
        j.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.media.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "" || j.category === filterCategory)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-forest-700">Contatos de Mídia</h2>
        <Button 
          onClick={openNewJournalistDialog}
          className="flex items-center gap-2"
        >
          <UserPlus size={16} />
          Novo Contato
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Buscar por nome, e-mail ou veículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por categoria" />
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
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJournalists.length > 0 ? (
                  filteredJournalists.map((journalist) => (
                    <TableRow key={journalist.id}>
                      <TableCell className="font-medium">{journalist.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail size={14} className="text-forest-600" />
                          <a href={`mailto:${journalist.email}`} className="hover:underline text-forest-700">
                            {journalist.email}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Building size={14} className="text-forest-600" />
                          {journalist.media}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Tag size={14} className="text-forest-600" />
                          <span className="px-2 py-1 bg-forest-50 rounded-full text-xs font-medium text-forest-700">
                            {journalist.category}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{journalist.phone || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditJournalistDialog(journalist)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit size={14} />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteJournalist(journalist.id)}
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
                      Nenhum contato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo para adicionar/editar jornalista */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentJournalist ? "Editar Contato" : "Novo Contato"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Nome completo" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="email@exemplo.com" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
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
              <Label htmlFor="media">Veículo</Label>
              <Input 
                id="media" 
                value={media} 
                onChange={(e) => setMedia(e.target.value)} 
                placeholder="Nome do veículo de comunicação" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="(XX) XXXXX-XXXX" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveJournalist}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaContacts;
