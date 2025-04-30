
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContentFormProps {
  content: string;
  setContent: (content: string) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ content, setContent }) => {
  return (
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
  );
};

export default ContentForm;
