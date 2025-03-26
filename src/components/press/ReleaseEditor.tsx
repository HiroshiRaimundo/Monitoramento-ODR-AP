
import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Send, Save, Edit, Trash, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Release {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  status: "draft" | "sent" | "published";
  media: Array<{type: string, url: string}>;
}

// Dados simulados para jornalistas
interface Journalist {
  id: string;
  name: string;
  email: string;
  category: string;
  media: string;
}

const mockJournalists: Journalist[] = [
  { id: "1", name: "Carlos Silva", email: "carlos@jornaleco.com.br", category: "Economia", media: "Jornal Econômico" },
  { id: "2", name: "Ana Melo", email: "ana@noticiasambiental.com", category: "Meio Ambiente", media: "Notícias Ambientais" },
  { id: "3", name: "Roberto Santos", email: "roberto@globomedia.com.br", category: "Política", media: "Globo Media" },
  { id: "4", name: "Luiza Costa", email: "luiza@jornaldaamazonia.com", category: "Meio Ambiente", media: "Jornal da Amazônia" },
  { id: "5", name: "Fernanda Lima", email: "fernanda@politicahoje.com", category: "Política", media: "Política Hoje" },
  { id: "6", name: "Paulo Mendes", email: "paulo@economianews.com.br", category: "Economia", media: "Economia News" },
];

const ReleaseEditor: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [availableJournalists, setAvailableJournalists] = useState<Journalist[]>([]);
  const [selectedJournalists, setSelectedJournalists] = useState<string[]>([]);
  const [customEmail, setCustomEmail] = useState("");
  const [category, setCategory] = useState("");

  const handleSaveRelease = (title: string, content: string, media: {type: string, url: string}[], category: string) => {
    if (currentRelease) {
      // Editar release existente
      const updatedReleases = releases.map(release => 
        release.id === currentRelease.id 
          ? { ...release, title, content, media, category } 
          : release
      );
      setReleases(updatedReleases);
    } else {
      // Criar novo release
      const newRelease: Release = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString(),
        category,
        status: "draft",
        media
      };
      setReleases([newRelease, ...releases]);
    }
    setIsEditing(false);
    setCurrentRelease(null);
  };

  const handleEditRelease = (release: Release) => {
    setCurrentRelease(release);
    setIsEditing(true);
    setCategory(release.category);
  };

  const handleDeleteRelease = (id: string) => {
    setReleases(releases.filter(release => release.id !== id));
  };

  const handleOpenSendDialog = (release: Release) => {
    setCurrentRelease(release);
    // Filtra jornalistas com base na categoria do release
    const filteredJournalists = mockJournalists.filter(
      journalist => journalist.category === release.category
    );
    setAvailableJournalists(filteredJournalists);
    setSelectedJournalists([]);
    setShowSendDialog(true);
  };

  const handleSendRelease = () => {
    if (currentRelease) {
      // Atualiza o status do release para "sent"
      const updatedReleases = releases.map(release => 
        release.id === currentRelease.id 
          ? { ...release, status: "sent" as const } 
          : release
      );
      setReleases(updatedReleases);
      
      // Aqui seria implementada a lógica de envio de e-mails
      console.log("Enviando release para:", selectedJournalists);
      if (customEmail) {
        console.log("E também para:", customEmail);
      }
      
      setShowSendDialog(false);
      setCurrentRelease(null);
    }
  };

  const toggleJournalist = (journalistId: string) => {
    if (selectedJournalists.includes(journalistId)) {
      setSelectedJournalists(selectedJournalists.filter(id => id !== journalistId));
    } else {
      setSelectedJournalists([...selectedJournalists, journalistId]);
    }
  };

  const selectAllJournalists = () => {
    if (selectedJournalists.length === availableJournalists.length) {
      setSelectedJournalists([]);
    } else {
      setSelectedJournalists(availableJournalists.map(j => j.id));
    }
  };

  return (
    <div className="space-y-4 text-left">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-forest-700">Releases</h2>
            <Button 
              onClick={() => {
                setCurrentRelease(null);
                setCategory("");
                setIsEditing(true);
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Novo Release
            </Button>
          </div>

          {releases.length === 0 ? (
            <div className="text-center py-8 text-forest-600 bg-forest-50/50 rounded-lg">
              <FileText size={48} className="mx-auto mb-2 text-forest-400" />
              <p>Nenhum release cadastrado</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setCurrentRelease(null);
                  setCategory("");
                  setIsEditing(true);
                }}
              >
                Clique aqui para criar o primeiro
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {releases.map(release => (
                <div key={release.id} className="border border-forest-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-forest-700">{release.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-forest-600">
                          {new Date(release.date).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-sm bg-forest-100 px-2 py-0.5 rounded text-forest-700">
                          {release.category}
                        </span>
                        {release.status === "draft" && (
                          <span className="text-sm bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                            Rascunho
                          </span>
                        )}
                        {release.status === "sent" && (
                          <span className="text-sm bg-blue-100 px-2 py-0.5 rounded text-blue-700">
                            Enviado
                          </span>
                        )}
                        {release.status === "published" && (
                          <span className="text-sm bg-green-100 px-2 py-0.5 rounded text-green-700">
                            Publicado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {release.media.length > 0 && (
                    <div className="flex mt-2 overflow-x-auto gap-2 py-2">
                      {release.media.map((item, index) => (
                        item.type === 'image' ? (
                          <img 
                            key={index} 
                            src={item.url} 
                            alt="Mídia" 
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div key={index} className="flex items-center justify-center w-16 h-16 bg-forest-50 rounded-md">
                            <FileText size={24} className="text-forest-600" />
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditRelease(release)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Editar
                    </Button>
                    
                    {release.status === "draft" && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleOpenSendDialog(release)}
                        className="flex items-center gap-1"
                      >
                        <Send size={14} />
                        Enviar
                      </Button>
                    )}
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteRelease(release.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash size={14} />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-forest-700">
              {currentRelease ? 'Editar Release' : 'Novo Release'}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setCurrentRelease(null);
              }}
            >
              Cancelar
            </Button>
          </div>
          
          <RichTextEditor 
            initialTitle={currentRelease?.title || ''}
            initialContent={currentRelease?.content || ''}
            initialCategory={category}
            onCategoryChange={setCategory}
            onSave={(title, content, media) => handleSaveRelease(title, content, media, category)}
            type="release"
          />
        </div>
      )}

      {/* Diálogo de envio */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enviar Release: {currentRelease?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Jornalistas da categoria {currentRelease?.category}</h3>
              <Button variant="outline" size="sm" onClick={selectAllJournalists}>
                {selectedJournalists.length === availableJournalists.length 
                  ? "Desmarcar Todos" 
                  : "Selecionar Todos"}
              </Button>
            </div>
            
            <div className="max-h-60 overflow-y-auto border rounded-md p-2">
              {availableJournalists.length > 0 ? (
                availableJournalists.map(journalist => (
                  <div key={journalist.id} className="flex items-start space-x-2 py-2 border-b last:border-0">
                    <Checkbox 
                      id={`journalist-${journalist.id}`}
                      checked={selectedJournalists.includes(journalist.id)} 
                      onCheckedChange={() => toggleJournalist(journalist.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor={`journalist-${journalist.id}`} className="font-medium">
                        {journalist.name}
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        {journalist.email} - {journalist.media}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-sm text-muted-foreground">
                  Nenhum jornalista cadastrado nesta categoria.
                </p>
              )}
            </div>
            
            <div className="mt-4">
              <Label htmlFor="custom-email">Adicionar outros e-mails (separados por vírgula)</Label>
              <Input 
                id="custom-email"
                placeholder="ex: email1@exemplo.com, email2@exemplo.com" 
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendDialog(false)}>Cancelar</Button>
            <Button 
              onClick={handleSendRelease}
              disabled={selectedJournalists.length === 0 && !customEmail}
              className="flex items-center gap-2"
            >
              <Send size={16} />
              Confirmar Envio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReleaseEditor;
