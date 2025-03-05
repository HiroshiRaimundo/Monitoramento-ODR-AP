
import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { PlusCircle, Newspaper } from "lucide-react";

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  media: Array<{type: string, url: string}>;
}

const NewsEditor: React.FC = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<News | null>(null);

  const handleSaveNews = (title: string, content: string, media: {type: string, url: string}[]) => {
    if (currentNews) {
      // Editar notícia existente
      const updatedNewsItems = newsItems.map(news => 
        news.id === currentNews.id 
          ? { ...news, title, content, media } 
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
  };

  const handleDeleteNews = (id: string) => {
    setNewsItems(newsItems.filter(news => news.id !== id));
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
                  <h3 className="text-lg font-medium text-forest-700">{news.title}</h3>
                  <p className="text-sm text-forest-600 mt-1">
                    {new Date(news.date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  
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
                  
                  <div className="mt-2 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditNews(news)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteNews(news.id)}
                    >
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
            onSave={handleSaveNews}
            type="news"
          />
        </div>
      )}
    </div>
  );
};

export default NewsEditor;
