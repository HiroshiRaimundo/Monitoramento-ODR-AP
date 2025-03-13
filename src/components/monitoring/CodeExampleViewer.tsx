import React from "react";
import { Button } from "@/components/ui/button";
// Removendo as importações problemáticas
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeExample } from "./code-examples";

interface CodeExampleViewerProps {
  examples: Record<string, CodeExample>;
  activeExample: string;
  onExampleChange: (example: string) => void;
}

const CodeExampleViewer: React.FC<CodeExampleViewerProps> = ({ 
  examples, 
  activeExample, 
  onExampleChange 
}) => {
  const currentExample = examples[activeExample];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(examples).map(([key, example]) => (
          <Button 
            key={key}
            variant={activeExample === key ? "default" : "outline"}
            onClick={() => onExampleChange(key)}
          >
            {example.title}
          </Button>
        ))}
      </div>
      
      <div>
        <h3 className="text-lg font-medium">{currentExample.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{currentExample.description}</p>
        <p className="text-xs font-mono text-muted-foreground mb-3">{currentExample.path}</p>
        
        <div className="bg-muted rounded-md overflow-hidden p-4">
          <pre className="text-sm overflow-auto" style={{ maxHeight: '400px' }}>
            <code>
              {currentExample.code.trim()}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeExampleViewer;
