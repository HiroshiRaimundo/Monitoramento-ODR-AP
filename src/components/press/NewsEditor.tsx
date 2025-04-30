
import React, { useState } from "react";
import { Journalist } from "./PressOfficeTab";
import NewsItemList from "./news/NewsItemList";
import NewsEditorForm from "./news/NewsEditorForm";
import SendNewsDialog from "./news/SendNewsDialog";
import { News } from "./news/types";

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

  const createNewNews = () => {
    setCurrentNews(null);
    setCategory("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentNews(null);
  };

  return (
    <div className="space-y-4 text-left">
      {!isEditing ? (
        <NewsItemList 
          newsItems={newsItems}
          handleEditNews={handleEditNews}
          handleOpenSendDialog={handleOpenSendDialog}
          handleDeleteNews={handleDeleteNews}
          createNewNews={createNewNews}
        />
      ) : (
        <NewsEditorForm
          currentNews={currentNews}
          category={category}
          setCategory={setCategory}
          handleSaveNews={handleSaveNews}
          cancelEdit={cancelEdit}
        />
      )}

      <SendNewsDialog 
        showSendDialog={showSendDialog}
        setShowSendDialog={setShowSendDialog}
        currentNews={currentNews}
        availableJournalists={availableJournalists}
        selectedJournalists={selectedJournalists}
        customEmail={customEmail}
        setCustomEmail={setCustomEmail}
        toggleJournalist={toggleJournalist}
        selectAllJournalists={selectAllJournalists}
        handleSendNews={handleSendNews}
      />
    </div>
  );
};

export default NewsEditor;
