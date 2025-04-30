
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Youtube } from "lucide-react";

interface MediaGalleryProps {
  media: Array<{ type: string; url: string }>;
  setMedia: React.Dispatch<React.SetStateAction<Array<{ type: string; url: string }>>>;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media, setMedia }) => {
  if (media.length === 0) return null;
  
  return (
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
  );
};

export default MediaGallery;
