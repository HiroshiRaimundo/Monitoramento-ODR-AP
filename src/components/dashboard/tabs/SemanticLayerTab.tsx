
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SemanticLayerTab: React.FC = () => {
  return (
    <Card className="eco-card border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800">Camada Semântica</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-green-600">Defina dimensões e métricas personalizadas para simplificar análises.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800">Dimensões</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                <span className="text-green-700">categoria</span>
                <span className="text-green-500">texto</span>
              </li>
              <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                <span className="text-green-700">responsável</span>
                <span className="text-green-500">texto</span>
              </li>
              <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                <span className="text-green-700">instituição</span>
                <span className="text-green-500">texto</span>
              </li>
              <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                <span className="text-green-700">frequência</span>
                <span className="text-green-500">texto</span>
              </li>
            </ul>
          </div>
          <div className="border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800">Métricas</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                <span className="text-green-700">total_monitoramentos</span>
                <span className="text-green-500">COUNT(*)</span>
              </li>
              <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                <span className="text-green-700">monitoramentos_por_categoria</span>
                <span className="text-green-500">COUNT(*) GROUP BY</span>
              </li>
              <li className="p-2 hover:bg-green-50 rounded-md flex justify-between">
                <span className="text-green-700">taxa_atualização</span>
                <span className="text-green-500">CUSTOM</span>
              </li>
            </ul>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Adicionar Nova Definição</Button>
      </CardContent>
    </Card>
  );
};

export default SemanticLayerTab;
