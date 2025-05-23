import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, UserPlus, Edit, Trash, Mail, Building, Tag } from "lucide-react";
import { PRESS_CATEGORIES } from "./types/pressTypes";
import { Journalist } from "./PressOfficeTab";

interface MediaContactsProps {
  journalists: Journalist[];
  onJournalistsUpdate: (journalists: Journalist[]) => void;
}

const MediaContacts: React.FC<MediaContactsProps> = ({ journalists, onJournalistsUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentJournalist, setCurrentJournalist] = useState<Journalist | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

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
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (currentJournalist) {
      const updatedJournalists = journalists.map(j => 
        j.id === currentJournalist.id
          ? { ...j, name, email, category, media, phone }
          : j
      );
      onJournalistsUpdate(updatedJournalists);
    } else {
      const newJournalist: Journalist = {
        id: Date.now().toString(),
        name,
        email,
        category,
        media,
        phone: phone || undefined
      };
      onJournalistsUpdate([...journalists, newJournalist]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleDeleteJournalist = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      onJournalistsUpdate(journalists.filter(j => j.id !== id));
    }
  };

  const filteredJournalists = journalists.filter(j => {
    return (
      (searchTerm === "" || 
        j.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.media.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "" || filterCategory === "todas" || j.category === filterCategory)
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
            
            <Select 
              value={filterCategory} 
              onValueChange={setFilterCategory}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {PRESS_CATEGORIES.map((cat) => (
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
                  {PRESS_CATEGORIES.map((cat) => (
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
