
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SqlEditorTab: React.FC = () => {
  const sqlQuery = `SELECT * FROM monitoring_items 
WHERE category = 'governo' 
ORDER BY created_at DESC 
LIMIT 10;`;

  return (
    <Card className="eco-card border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800">Editor SQL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="font-mono bg-green-50 p-4 rounded-lg text-sm overflow-auto max-h-64">
          <pre className="whitespace-pre-wrap text-green-800">{sqlQuery}</pre>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-green-600 hover:bg-green-700">Executar Consulta</Button>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Salvar Consulta</Button>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Explorar Esquema</Button>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Verificar Sintaxe</Button>
        </div>
        <div className="border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">Resultados:</h4>
          <p className="text-sm text-green-600">Execute uma consulta SQL para ver os resultados aqui.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SqlEditorTab;
