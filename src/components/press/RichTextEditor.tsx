import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bold, Italic, Link, Image, List, ListOrdered, FileText, 
  AlignLeft, AlignCenter, AlignRight, Save, Youtube 
} from "lucide-react";
import { PRESS_CATEGORIES } from "./types/pressTypes";

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
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  const [media, setMedia] = useState<Array<{type: string, url: string}>>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [showMediaInput, setShowMediaInput] = useState(false);

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
    switch (format) {
      case 'bold':
        setContent(content + '<strong>texto em negrito</strong>');
        break;
      case 'italic':
        setContent(content + '<em>texto em itálico</em>');
        break;
      case 'link':
        setContent(content + '<a href="URL">link</a>');
        break;
      default:
        break;
    }
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

      <div className="flex flex-wrap gap-2 p-2 bg-forest-50 rounded-md">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('bold')}
          title="Negrito"
        >
          <Bold size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('italic')}
          title="Itálico"
        >
          <Italic size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('link')}
          title="Inserir Link"
        >
          <Link size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowMediaInput(true)}
          title="Inserir Imagem"
        >
          <Image size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('list')}
          title="Lista com Marcadores"
        >
          <List size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('orderedList')}
          title="Lista Numerada"
        >
          <ListOrdered size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('alignLeft')}
          title="Alinhar à Esquerda"
        >
          <AlignLeft size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('alignCenter')}
          title="Centralizar"
        >
          <AlignCenter size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => formatText('alignRight')}
          title="Alinhar à Direita"
        >
          <AlignRight size={16} />
        </Button>
      </div>

      {showMediaInput && (
        <div className="space-y-2 p-3 border border-forest-100 rounded-md">
          <div className="flex gap-2 mb-2">
            <Button 
              variant={mediaType === 'image' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setMediaType('image')}
            >
              <Image size={14} className="mr-1" /> Imagem
            </Button>
            <Button 
              variant={mediaType === 'video' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setMediaType('video')}
            >
              <Youtube size={14} className="mr-1" /> Vídeo
            </Button>
          </div>
          <div className="flex gap-2">
            <Input 
              value={currentUrl} 
              onChange={(e) => setCurrentUrl(e.target.value)} 
              placeholder={mediaType === 'image' ? "URL da imagem" : "URL do vídeo (YouTube)"}
              className="flex-1"
            />
            <Button onClick={handleAddMedia}>Adicionar</Button>
            <Button variant="outline" onClick={() => setShowMediaInput(false)}>Cancelar</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea 
          id="content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Escreva o conteúdo aqui..."
          className="min-h-[300px] text-justify"
        />
      </div>

      {media.length > 0 && (
        <div className="space-y-2">
          <Label>Mídia Anexada</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {media.map((item, index) => (
              <div key={index} className="relative border rounded-md overflow-hidden">
                {item.type === 'image' ? (
                  <img src={item.url} alt="Mídia" className="w-full h-24 object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-24 bg-forest-50">
                    <Youtube size={32} className="text-forest-600" />
                  </div>
                )}
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-1 right-1 w-6 h-6 p-0"
                  onClick={() => setMedia(media.filter((_, i) => i !== index))}
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

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
