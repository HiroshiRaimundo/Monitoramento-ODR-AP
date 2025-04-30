
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Send, Trash, Newspaper } from "lucide-react";

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  status: "draft" | "sent" | "published";
  media: Array<{type: string, url: string}>;
}

interface NewsItemProps {
  news: News;
  handleEditNews: (news: News) => void;
  handleOpenSendDialog: (news: News) => void;
  handleDeleteNews: (id: string) => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ 
  news, 
  handleEditNews, 
  handleOpenSendDialog, 
  handleDeleteNews 
}) => {
  return (
    <div className="border border-forest-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
  );
};

export default NewsItem;
