
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReportsTab: React.FC = () => {
  return (
    <Card className="eco-card border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800">Relatórios Automatizados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border border-green-200 rounded-lg p-6 space-y-4 bg-gradient-to-r from-green-50 to-green-100/70">
          <h3 className="text-lg font-medium text-green-800">Configure Relatórios Periódicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-green-100">
              <h4 className="font-medium text-green-800">Diários</h4>
              <p className="text-sm text-green-600 mt-1">
                Atualizações críticas enviadas todos os dias
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700 hover:bg-green-50">Configurar</Button>
            </div>
            <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-green-100">
              <h4 className="font-medium text-green-800">Semanais</h4>
              <p className="text-sm text-green-600 mt-1">
                Resumos e análises enviados toda semana
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700 hover:bg-green-50">Configurar</Button>
            </div>
            <div className="bg-white/90 p-4 rounded-lg shadow-sm border border-green-100">
              <h4 className="font-medium text-green-800">Mensais</h4>
              <p className="text-sm text-green-600 mt-1">
                Relatórios completos e tendências
              </p>
              <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700 hover:bg-green-50">Configurar</Button>
            </div>
          </div>
        </div>
        <div className="border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">Relatórios Agendados</h4>
          <div className="text-sm">
            <p className="text-green-600">
              Nenhum relatório agendado. Configure um relatório para começar a receber insights automaticamente.
            </p>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Criar Novo Relatório</Button>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;
