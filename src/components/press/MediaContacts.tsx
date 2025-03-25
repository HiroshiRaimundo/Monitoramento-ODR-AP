
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  User,
  Mail,
  Building,
  Tag,
  Plus,
  Pencil,
  Trash2,
  Filter,
  Search
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization: string;
  category: string;
}

const MediaContacts: React.FC = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "1", name: "Carlos Silva", email: "carlos@jornaldoamapa.com.br", phone: "(96) 99123-4567", organization: "Jornal do Amapá", category: "Educação" },
    { id: "2", name: "Mariana Costa", email: "mariana@portal.com.br", phone: "(96) 98765-4321", organization: "Portal de Notícias", category: "Educação" },
    { id: "3", name: "Rafael Mendes", email: "rafael@gazeta.com.br", phone: "(96) 99876-5432", organization: "A Gazeta", category: "Ciência" },
    { id: "4", name: "Ana Luiza", email: "ana@radiofm.com.br", phone: "(96) 99887-7665", organization: "Rádio FM", category: "Ciência" },
    { id: "5", name: "Felipe Góes", email: "felipe@tvamapa.com.br", phone: "(96) 98877-6655", organization: "TV Amapá", category: "Meio Ambiente" },
    { id: "6", name: "Patrícia Lima", email: "patricia@g1amapa.com.br", phone: "(96) 99988-7766", organization: "G1 Amapá", category: "Meio Ambiente" },
    { id: "7", name: "Ricardo Almeida", email: "ricardo@folha.com.br", phone: "(96) 99999-8888", organization: "Folha Regional", category: "Eventos" },
    { id: "8", name: "Juliana Santos", email: "juliana@diarioweb.com.br", phone: "(96) 98888-9999", organization: "Diário Web", category: "Geral" }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: ''
  });
  
  // Available categories
  const categories = Array.from(new Set([...contacts.map(c => c.category), 'Educação', 'Ciência', 'Meio Ambiente', 'Eventos', 'Geral']));
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };
  
  // Open add/edit dialog
  const openAddDialog = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        organization: contact.organization,
        category: contact.category
      });
    } else {
      setEditingContact(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        category: ''
      });
    }
    setIsAddDialogOpen(true);
  };
  
  // Close dialog and reset form
  const closeDialog = () => {
    setIsAddDialogOpen(false);
    setEditingContact(null);
  };
  
  // Save contact
  const saveContact = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.organization || !formData.category) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    if (editingContact) {
      // Update existing contact
      setContacts(contacts.map(c => 
        c.id === editingContact.id 
          ? { ...c, ...formData, id: c.id } 
          : c
      ));
      toast({
        title: "Contato atualizado",
        description: `O contato ${formData.name} foi atualizado com sucesso.`
      });
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now().toString(),
        ...formData
      };
      setContacts([...contacts, newContact]);
      toast({
        title: "Contato adicionado",
        description: `O contato ${formData.name} foi adicionado com sucesso.`
      });
    }
    
    closeDialog();
  };
  
  // Delete contact
  const deleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast({
      title: "Contato removido",
      description: "O contato foi removido com sucesso."
    });
  };
  
  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? contact.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contatos..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas categorias</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={() => openAddDialog()}>
            <Plus size={16} className="mr-1" /> Novo Contato
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Organização</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length > 0 ? filteredContacts.map(contact => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.organization}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-forest-50">
                      {contact.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openAddDialog(contact)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteContact(contact.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum contato encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingContact ? 'Editar Contato' : 'Adicionar Contato'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                <User size={14} /> Nome *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail size={14} /> Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Mail size={14} /> Telefone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="organization" className="flex items-center gap-1">
                <Building size={14} /> Organização *
              </Label>
              <Input
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category" className="flex items-center gap-1">
                <Tag size={14} /> Categoria *
              </Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button onClick={saveContact}>
              {editingContact ? 'Atualizar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaContacts;
