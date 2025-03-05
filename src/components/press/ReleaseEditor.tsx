
import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText } from "lucide-react";

interface Release {
  id: string;
  title: string;
  content: string;
  date: string;
  media: Array<{type: string, url: string}>;
}

const ReleaseEditor: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);

  const handleSaveRelease = (title: string, content: string, media: {type: string, url: string}[]) => {
    if (currentRelease) {
      // Editar release existente
      const updatedReleases = releases.map(release => 
        release.id === currentRelease.id 
          ? { ...release, title, content, media } 
          : release
      );
      setReleases(updatedReleases);
    } else {
      // Criar novo release
      const newRelease: Release = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString(),
        media
      };
      setReleases([newRelease, ...releases]);
    }
    setIsEditing(false);
    setCurrentRelease(null);
  };

  const handleEditRelease = (release: Release) => {
    setCurrentRelease(release);
    setIsEditing(true);
  };

  const handleDeleteRelease = (id: string) => {
    setReleases(releases.filter(release => release.id !== id));
  };

  return (
    <div className="space-y-4 text-left">
      {!isEditing ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-forest-700">Releases</h2>
            <Button 
              onClick={() => {
                setCurrentRelease(null);
                setIsEditing(true);
              }}
              className="flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Novo Release
            </Button>
          </div>

          {releases.length === 0 ? (
            <div className="text-center py-8 text-forest-600 bg-forest-50/50 rounded-lg">
              <FileText size={48} className="mx-auto mb-2 text-forest-400" />
              <p>Nenhum release cadastrado</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setCurrentRelease(null);
                  setIsEditing(true);
                }}
              >
                Clique aqui para criar o primeiro
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {releases.map(release => (
                <div key={release.id} className="border border-forest-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-forest-700">{release.title}</h3>
                  <p className="text-sm text-forest-600 mt-1">
                    {new Date(release.date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  
                  {release.media.length > 0 && (
                    <div className="flex mt-2 overflow-x-auto gap-2 py-2">
                      {release.media.map((item, index) => (
                        item.type === 'image' ? (
                          <img 
                            key={index} 
                            src={item.url} 
                            alt="Mídia" 
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div key={index} className="flex items-center justify-center w-16 h-16 bg-forest-50 rounded-md">
                            <FileText size={24} className="text-forest-600" />
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-2 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditRelease(release)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteRelease(release.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-forest-700">
              {currentRelease ? 'Editar Release' : 'Novo Release'}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setCurrentRelease(null);
              }}
            >
              Cancelar
            </Button>
          </div>
          
          <RichTextEditor 
            initialTitle={currentRelease?.title || ''}
            initialContent={currentRelease?.content || ''}
            onSave={handleSaveRelease}
            type="release"
          />
        </div>
      )}
    </div>
  );
};

export default ReleaseEditor;
