
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Youtube } from "lucide-react";

interface MediaInputProps {
  mediaType: 'image' | 'video';
  currentUrl: string;
  setMediaType: (type: 'image' | 'video') => void;
  setCurrentUrl: (url: string) => void;
  handleAddMedia: () => void;
  setShowMediaInput: (show: boolean) => void;
}

const MediaInput: React.FC<MediaInputProps> = ({
  mediaType,
  currentUrl,
  setMediaType,
  setCurrentUrl,
  handleAddMedia,
  setShowMediaInput
}) => {
  return (
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
  );
};

export default MediaInput;
