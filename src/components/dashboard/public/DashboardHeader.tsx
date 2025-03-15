
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info, FileBarChart } from "lucide-react";
import { ResearchStudy } from "@/types/research";

interface DashboardHeaderProps {
  studies: ResearchStudy[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ studies }) => {
  return (
    <Card className="border-forest-100 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <div className="flex items-center gap-2">
          <FileBarChart size={24} className="text-forest-600" />
          <CardTitle className="text-forest-700 font-poppins text-xl">Monitoramento</CardTitle>
        </div>
        <CardDescription className="text-forest-600">
          Sistema de Monitoramento do Programa de Pós-graduação e Desenvolvimento da Amazônia sustentável
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <p className="text-forest-700 mb-2">
              Visualização de dados públicos e pesquisas da nossa região amazônica
            </p>
            <div className="stats flex flex-wrap gap-4 font-poppins">
              <div className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-forest-700">{studies.length || 27}</div>
                <div className="text-sm text-forest-600">Estudos Cadastrados</div>
              </div>
              <div className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-forest-700">4</div>
                <div className="text-sm text-forest-600">Categorias</div>
              </div>
              <div className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-forest-700">16</div>
                <div className="text-sm text-forest-600">Municípios</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-forest-50/50 p-4 rounded-lg">
            <Info size={24} className="text-forest-600" />
            <div className="text-sm text-forest-700">
              <p className="font-medium">Dados atualizados diariamente</p>
              <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
