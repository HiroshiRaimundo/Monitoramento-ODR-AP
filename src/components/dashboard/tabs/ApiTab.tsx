
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ApiTab: React.FC = () => {
  const apiExample = `// Exemplo de endpoint para dados de monitoramento
GET /api/v1/monitoring/items

// Exemplo de resposta
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Monitoramento DETER",
      "category": "governo",
      "frequency": "diário",
      "url": "https://terrabrasilis.dpi.inpe.br/",
      "responsible": "Carlos Pereira",
      "institution": "INPE"
    },
    ...
  ],
  "meta": {
    "total": 124,
    "page": 1,
    "limit": 10
  }
}`;

  return (
    <Card className="eco-card border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800">API para Personalização</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="font-mono bg-green-50 p-4 rounded-lg text-sm overflow-auto max-h-64">
          <pre className="text-green-800">{apiExample}</pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800">Documentação da API</h4>
            <p className="text-sm text-green-600 mt-2">
              Acesse a documentação completa com exemplos de uso para todos os endpoints disponíveis.
            </p>
            <Button variant="link" className="px-0 mt-2 text-green-700 hover:text-green-800">Ver Documentação</Button>
          </div>
          <div className="border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800">Chaves de API</h4>
            <p className="text-sm text-green-600 mt-2">
              Gere e gerencie chaves de API para integrar com seus aplicativos.
            </p>
            <Button variant="link" className="px-0 mt-2 text-green-700 hover:text-green-800">Gerenciar Chaves</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiTab;
