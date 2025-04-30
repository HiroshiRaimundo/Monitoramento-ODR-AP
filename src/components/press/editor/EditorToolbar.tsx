
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, Italic, Link, Image, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight
} from "lucide-react";

interface EditorToolbarProps {
  formatText: (format: string) => void;
  onShowMediaInput: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ formatText, onShowMediaInput }) => {
  return (
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
        onClick={onShowMediaInput}
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
  );
};

export default EditorToolbar;
