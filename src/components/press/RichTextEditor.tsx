
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { PRESS_CATEGORIES } from "./types/pressTypes";
import EditorToolbar from "./editor/EditorToolbar";
import ContentForm from "./editor/ContentForm";
import MediaInput from "./editor/MediaInput";
import MediaGallery from "./editor/MediaGallery";
import { formatText as formatTextUtil } from "./editor/TextFormatUtils";

interface RichTextEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSave: (title: string, content: string, media: {type: string, url: string}[]) => void;
  type: 'release' | 'news';
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  initialTitle = '', 
  initialContent = '',
  initialCategory = '',
  onCategoryChange,
  onSave,
  type
}) => {
  // Form state
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  
  // Media state
  const [media, setMedia] = useState<Array<{type: string, url: string}>>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [showMediaInput, setShowMediaInput] = useState(false);

  // Handlers
  const handleAddMedia = () => {
    if (currentUrl) {
      setMedia([...media, { type: mediaType, url: currentUrl }]);
      setCurrentUrl('');
      setShowMediaInput(false);
    }
  };

  const handleSave = () => {
    onSave(title, content, media);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  const formatText = (format: string) => {
    setContent(formatTextUtil(format, content));
  };

  return (
    <div className="space-y-4 text-left">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder={type === 'release' ? "Título do Release" : "Título da Reportagem"}
          className="text-lg font-medium"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {PRESS_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <EditorToolbar 
        formatText={formatText}
        onShowMediaInput={() => setShowMediaInput(true)}
      />

      {showMediaInput && (
        <MediaInput
          mediaType={mediaType}
          currentUrl={currentUrl}
          setMediaType={setMediaType}
          setCurrentUrl={setCurrentUrl}
          handleAddMedia={handleAddMedia}
          setShowMediaInput={setShowMediaInput}
        />
      )}

      <ContentForm content={content} setContent={setContent} />

      <MediaGallery media={media} setMedia={setMedia} />

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          className="flex items-center gap-2"
          disabled={!title || !content || !category}
        >
          <Save size={16} />
          Salvar {type === 'release' ? 'Release' : 'Reportagem'}
        </Button>
      </div>
    </div>
  );
};

export default RichTextEditor;
