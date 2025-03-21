
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
    <Card>
      <ScrollArea className="h-[200px]">
        <CardContent className="space-y-4 p-4">
          {selectedStudies.map(study => (
            <div key={study.id} className="relative bg-muted p-4 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => onRemoveStudy(study.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold mb-2">{study.title}</h3>
              <p className="text-sm mb-2">Autor: {study.author}</p>
              <p className="text-sm mb-2">Local: {study.location}</p>
              {study.type && (
                <p className="text-sm mb-2">Tipo: {study.type}</p>
              )}
              {study.summary && (
                <p className="text-sm text-muted-foreground mb-2">{study.summary}</p>
              )}
              {study.repositoryUrl && (
                <a
                  href={study.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  Ver repositório <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default StudyDetail;
