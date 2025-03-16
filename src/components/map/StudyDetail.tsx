
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';
import { MapPoint } from '@/types/map';

interface StudyDetailProps {
  selectedStudies: MapPoint[];
  onRemoveStudy: (studyId: string) => void;
}

const StudyDetail: React.FC<StudyDetailProps> = ({ 
  selectedStudies, 
  onRemoveStudy 
}) => {
  if (selectedStudies.length === 0) {
    return null;
  }

  return (
    <Card className="border-forest-100 shadow-md mt-4">
      <CardContent className="p-0">
        <ScrollArea className="h-[200px]">
          <div className="space-y-4 p-4">
            {selectedStudies.map(study => (
              <div key={study.id} className="relative bg-muted/30 p-4 rounded-lg border border-forest-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => onRemoveStudy(study.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                {/* Título em destaque */}
                <h3 className="font-semibold text-forest-700 mb-2 pr-8">{study.title}</h3>
                
                {/* Informações do estudo */}
                <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                  <p><span className="font-medium">Autor:</span> {study.author}</p>
                  <p><span className="font-medium">Local:</span> {study.location}</p>
                  {study.type && (
                    <p><span className="font-medium">Tipo:</span> {study.type}</p>
                  )}
                </div>
                
                {/* Resumo do estudo */}
                {study.summary && (
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Resumo:</p>
                    <p className="text-sm text-muted-foreground">{study.summary}</p>
                  </div>
                )}
                
                {/* Link para o repositório */}
                {study.repositoryUrl && (
                  <div className="mt-2 pt-2 border-t border-forest-100/50">
                    <a
                      href={study.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Ver repositório completo <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudyDetail;
