
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const VisualEditorTab: React.FC = () => {
  return (
    <Card className="eco-card border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800">Editor Visual de Gráficos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-dashed border-green-300 p-8 flex flex-col items-center justify-center bg-green-50/50 text-center space-y-4">
          <BarChart3 className="h-12 w-12 text-green-500" />
          <h3 className="text-lg font-medium text-green-800">Crie gráficos sem código</h3>
          <p className="text-green-700 max-w-lg">
            Arraste e solte campos da camada semântica para criar gráficos interativos. Escolha entre mais de 20 tipos de visualizações diferentes.
          </p>
          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700">Criar novo gráfico</Button>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">Ver tutoriais</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:bg-green-50/40">
            <h4 className="font-medium text-green-800">Modelos Prontos</h4>
            <p className="text-sm text-green-600">Inicie com visualizações pré-configuradas</p>
          </div>
          <div className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:bg-green-50/40">
            <h4 className="font-medium text-green-800">Dashboards Recentes</h4>
            <p className="text-sm text-green-600">Continue de onde parou</p>
          </div>
          <div className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow hover:bg-green-50/40">
            <h4 className="font-medium text-green-800">Compartilhar</h4>
            <p className="text-sm text-green-600">Colabore com outros pesquisadores</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualEditorTab;
