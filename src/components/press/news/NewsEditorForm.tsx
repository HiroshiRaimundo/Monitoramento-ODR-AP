
import React from "react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "../RichTextEditor";

interface NewsEditorFormProps {
  currentNews: {
    title?: string;
    content?: string;
    category?: string;
  } | null;
  category: string;
  setCategory: (category: string) => void;
  handleSaveNews: (title: string, content: string, media: {type: string, url: string}[], category: string) => void;
  cancelEdit: () => void;
}

const NewsEditorForm: React.FC<NewsEditorFormProps> = ({
  currentNews,
  category,
  setCategory,
  handleSaveNews,
  cancelEdit
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-forest-700">
          {currentNews ? 'Editar Reportagem' : 'Nova Reportagem'}
        </h2>
        <Button 
          variant="outline" 
          onClick={cancelEdit}
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
  );
};

export default NewsEditorForm;
