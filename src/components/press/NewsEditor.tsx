import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { PlusCircle, Newspaper, Send, Save, Edit, Trash, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Journalist } from "./PressOfficeTab";
import { PRESS_CATEGORIES } from "./types/pressTypes";

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  status: "draft" | "sent" | "published";
  media: Array<{type: string, url: string}>;
}

interface NewsEditorProps {
  journalists: Journalist[];
}

const NewsEditor: React.FC<NewsEditorProps> = ({ journalists }) => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<News | null>(null);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [availableJournalists, setAvailableJournalists] = useState<Journalist[]>([]);
  const [selectedJournalists, setSelectedJournalists] = useState<string[]>([]);
  const [customEmail, setCustomEmail] = useState("");
  const [category, setCategory] = useState("");

  const handleSaveNews = (title: string, content: string, media: {type: string, url: string}[], category: string) => {
    if (currentNews) {
      // Editar notícia existente
      const updatedNewsItems = newsItems.map(news => 
        news.id === currentNews.id 
          ? { ...news, title, content, media, category } 
          : news
      );
      setNewsItems(updatedNewsItems);
    } else {
      // Criar nova notícia
      const newNews: News = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString(),
        category,
        status: "draft",
        media
      };
      setNewsItems([newNews, ...newsItems]);
    }
    setIsEditing(false);
    setCurrentNews(null);
  };

  const handleEditNews = (news: News) => {
    setCurrentNews(news);
    setIsEditing(true);
    setCategory(news.category);
  };

  const handleDeleteNews = (id: string) => {
    setNewsItems(newsItems.filter(news => news.id !== id));
  };

  const handleOpenSendDialog = (news: News) => {
    setCurrentNews(news);
    // Filtra jornalistas com base na categoria da notícia
    const filteredJournalists = journalists.filter(
      journalist => journalist.category === news.category
    );
    setAvailableJournalists(filteredJournalists);
    setSelectedJournalists([]);
    setShowSendDialog(true);
  };

  const handleSendNews = () => {
    if (currentNews) {
      // Atualiza o status da notícia para "sent"
      const updatedNewsItems = newsItems.map(news => 
        news.id === currentNews.id 
          ? { ...news, status: "sent" as const } 
          : news
      );
      setNewsItems(updatedNewsItems);
      
      // Aqui seria implementada a lógica de envio de e-mails
      console.log("Enviando reportagem para:", selectedJournalists);
      if (customEmail) {
        console.log("E também para:", customEmail);
      }
      
      setShowSendDialog(false);
      setCurrentNews(null);
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
            <h2 className="text-xl font-semibold text-forest-700">Reportagens</h2>
            <Button 
              onClick={() => {
                setCurrentNews(null);
                setCategory("");
                setIsEditing(true);
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Nova Reportagem
            </Button>
          </div>

          {newsItems.length === 0 ? (
            <div className="text-center py-8 text-forest-600 bg-forest-50/50 rounded-lg">
              <Newspaper size={48} className="mx-auto mb-2 text-forest-400" />
              <p>Nenhuma reportagem cadastrada</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setCurrentNews(null);
                  setCategory("");
                  setIsEditing(true);
                }}
              >
                Clique aqui para criar a primeira
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {newsItems.map(news => (
                <div key={news.id} className="border border-forest-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-forest-700">{news.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-forest-600">
                          {new Date(news.date).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-sm bg-forest-100 px-2 py-0.5 rounded text-forest-700">
                          {news.category}
                        </span>
                        {news.status === "draft" && (
                          <span className="text-sm bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                            Rascunho
                          </span>
                        )}
                        {news.status === "sent" && (
                          <span className="text-sm bg-blue-100 px-2 py-0.5 rounded text-blue-700">
                            Enviado
                          </span>
                        )}
                        {news.status === "published" && (
                          <span className="text-sm bg-green-100 px-2 py-0.5 rounded text-green-700">
                            Publicado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {news.media.length > 0 && (
                    <div className="flex mt-2 overflow-x-auto gap-2 py-2">
                      {news.media.map((item, index) => (
                        item.type === 'image' ? (
                          <img 
                            key={index} 
                            src={item.url} 
                            alt="Mídia" 
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div key={index} className="flex items-center justify-center w-16 h-16 bg-forest-50 rounded-md">
                            <Newspaper size={24} className="text-forest-600" />
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditNews(news)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Editar
                    </Button>
                    
                    {news.status === "draft" && (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleOpenSendDialog(news)}
                        className="flex items-center gap-1"
                      >
                        <Send size={14} />
                        Enviar
                      </Button>
                    )}
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteNews(news.id)}
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
              {currentNews ? 'Editar Reportagem' : 'Nova Reportagem'}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setCurrentNews(null);
              }}
            >
              Cancelar
            </Button>
          </div>
          
          <RichTextEditor 
            initialTitle={currentNews?.title || ''}
            initialContent={currentNews?.content || ''}
            initialCategory={category}
            onCategoryChange={setCategory}
            onSave={(title, content, media) => handleSaveNews(title, content, media, category)}
            type="news"
          />
        </div>
      )}

      {/* Diálogo de envio */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enviar Reportagem: {currentNews?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Jornalistas da categoria {currentNews?.category}</h3>
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
              onClick={handleSendNews}
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

export default NewsEditor;
