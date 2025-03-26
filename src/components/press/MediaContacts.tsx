
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PlusCircle, 
  Save, 
  Trash2, 
  Edit, 
  Search,
  User,
  Building,
  AtSign,
  Phone,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MediaContact {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  website: string;
  mediaType: 'tv' | 'radio' | 'newspaper' | 'website' | 'blog' | 'other';
}

const MediaContacts: React.FC = () => {
  const [contacts, setContacts] = useState<MediaContact[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState<MediaContact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Estados para o formulário
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [mediaType, setMediaType] = useState<'tv' | 'radio' | 'newspaper' | 'website' | 'blog' | 'other'>('newspaper');

  const resetForm = () => {
    setName('');
    setOrganization('');
    setEmail('');
    setPhone('');
    setWebsite('');
    setMediaType('newspaper');
  };

  const handleEditContact = (contact: MediaContact) => {
    setCurrentContact(contact);
    setName(contact.name);
    setOrganization(contact.organization);
    setEmail(contact.email);
    setPhone(contact.phone);
    setWebsite(contact.website);
    setMediaType(contact.mediaType);
    setIsEditing(true);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleSaveContact = () => {
    if (!name || !organization || !email) {
      alert("Por favor, preencha os campos obrigatórios: Nome, Organização e Email");
      return;
    }

    if (currentContact) {
      // Editar contato existente
      const updatedContacts = contacts.map(contact => 
        contact.id === currentContact.id 
          ? { 
              ...contact, 
              name, 
              organization, 
              email, 
              phone, 
              website,
              mediaType
            } 
          : contact
      );
      setContacts(updatedContacts);
    } else {
      // Criar novo contato
      const newContact: MediaContact = {
        id: Date.now().toString(),
        name,
        organization,
        email,
        phone,
        website,
        mediaType
      };
      setContacts([...contacts, newContact]);
    }
    
    setIsEditing(false);
    setCurrentContact(null);
    resetForm();
  };

  // Filtragem de contatos
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || contact.mediaType === filterType;
    
    return matchesSearch && matchesType;
  });

  const getMediaTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'tv': 'TV',
      'radio': 'Rádio',
      'newspaper': 'Jornal',
      'website': 'Website',
      'blog': 'Blog',
      'other': 'Outro'
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-forest-700">Contatos de Mídia</h2>
        {!isEditing && (
          <Button 
            onClick={() => {
              setCurrentContact(null);
              resetForm();
              setIsEditing(true);
            }}
            className="flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Novo Contato
          </Button>
        )}
      </div>

      {isEditing ? (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Contato *</Label>
                <div className="flex">
                  <User size={16} className="mr-2 mt-2.5 text-forest-600" />
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Nome do jornalista ou contato"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organização *</Label>
                <div className="flex">
                  <Building size={16} className="mr-2 mt-2.5 text-forest-600" />
                  <Input 
                    id="organization" 
                    value={organization} 
                    onChange={(e) => setOrganization(e.target.value)} 
                    placeholder="Nome do veículo ou organização"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="flex">
                  <AtSign size={16} className="mr-2 mt-2.5 text-forest-600" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="flex">
                  <Phone size={16} className="mr-2 mt-2.5 text-forest-600" />
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="flex">
                  <Globe size={16} className="mr-2 mt-2.5 text-forest-600" />
                  <Input 
                    id="website" 
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)} 
                    placeholder="https://exemplo.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mediaType">Tipo de Mídia</Label>
                <Select
                  value={mediaType}
                  onValueChange={(value) => setMediaType(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de mídia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tv">TV</SelectItem>
                    <SelectItem value="radio">Rádio</SelectItem>
                    <SelectItem value="newspaper">Jornal</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setCurrentContact(null);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveContact} 
                className="flex items-center gap-2"
              >
                <Save size={16} />
                Salvar Contato
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filtros e Pesquisa */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-600" />
              <Input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar contatos..." 
                className="pl-10"
              />
            </div>
            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="tv">TV</SelectItem>
                <SelectItem value="radio">Rádio</SelectItem>
                <SelectItem value="newspaper">Jornal</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-8 text-forest-600 bg-forest-50/50 rounded-lg">
              <User size={48} className="mx-auto mb-2 text-forest-400" />
              <p>Nenhum contato cadastrado</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setCurrentContact(null);
                  resetForm();
                  setIsEditing(true);
                }}
              >
                Clique aqui para adicionar o primeiro contato
              </Button>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-forest-600 bg-forest-50/50 rounded-lg">
              <Search size={48} className="mx-auto mb-2 text-forest-400" />
              <p>Nenhum contato encontrado com os filtros atuais</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map(contact => (
                <Card key={contact.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-forest-700">{contact.name}</h3>
                        <p className="text-sm text-forest-600 flex items-center gap-1">
                          <Building size={14} />
                          {contact.organization}
                        </p>
                      </div>
                      <span className="bg-forest-100 text-forest-700 text-xs px-2 py-1 rounded-full">
                        {getMediaTypeLabel(contact.mediaType)}
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-1 text-sm">
                      <p className="flex items-center gap-2">
                        <AtSign size={14} className="text-forest-600" />
                        <a href={`mailto:${contact.email}`} className="text-forest-700 hover:underline">
                          {contact.email}
                        </a>
                      </p>
                      
                      {contact.phone && (
                        <p className="flex items-center gap-2">
                          <Phone size={14} className="text-forest-600" />
                          <a href={`tel:${contact.phone}`} className="text-forest-700 hover:underline">
                            {contact.phone}
                          </a>
                        </p>
                      )}
                      
                      {contact.website && (
                        <p className="flex items-center gap-2">
                          <Globe size={14} className="text-forest-600" />
                          <a 
                            href={contact.website.startsWith('http') ? contact.website : `https://${contact.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-forest-700 hover:underline truncate max-w-[180px]"
                          >
                            {contact.website}
                          </a>
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditContact(contact)}
                        className="h-8"
                      >
                        <Edit size={14} className="mr-1" />
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteContact(contact.id)}
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
          )}
        </>
      )}
    </div>
  );
};

export default MediaContacts;
