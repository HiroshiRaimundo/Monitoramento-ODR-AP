
import React from "react";
import { Newspaper, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsItem from "./NewsItem";

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  status: "draft" | "sent" | "published";
  media: Array<{type: string, url: string}>;
}

interface NewsItemListProps {
  newsItems: News[];
  handleEditNews: (news: News) => void;
  handleOpenSendDialog: (news: News) => void;
  handleDeleteNews: (id: string) => void;
  createNewNews: () => void;
}

const NewsItemList: React.FC<NewsItemListProps> = ({ 
  newsItems, 
  handleEditNews, 
  handleOpenSendDialog, 
  handleDeleteNews,
  createNewNews
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-forest-700">Reportagens</h2>
        <Button 
          onClick={createNewNews}
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
            onClick={createNewNews}
          >
            Clique aqui para criar a primeira
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {newsItems.map(news => (
            <NewsItem 
              key={news.id}
              news={news}
              handleEditNews={handleEditNews}
              handleOpenSendDialog={handleOpenSendDialog}
              handleDeleteNews={handleDeleteNews}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsItemList;
