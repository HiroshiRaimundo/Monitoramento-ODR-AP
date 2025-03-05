
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import { ResearchStudy } from "@/types/research";
import DashboardControls from "./DashboardControls";
import { Info, FileBarChart } from "lucide-react";

interface PublicDashboardProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  timeRange: string;
  setTimeRange: (value: string) => void;
  isAuthenticated: boolean;
  studies: ResearchStudy[];
}

const PublicDashboard: React.FC<PublicDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  isAuthenticated,
  studies
}) => {
  // Definir categorias manualmente (já que ResearchStudy não tem propriedade category)
  const studyCategories = [
    { name: "Biodiversidade", value: 3 },
    { name: "Clima", value: 5 },
    { name: "Socioambiental", value: 7 },
    { name: "Econômico", value: 4 }
  ];

  return (
    <div className="grid gap-6 font-poppins">
      {/* Cabeçalho */}
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

      {/* Filtros simples */}
      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={() => {}}
        isAuthenticated={false}
        totalItems={studies.length}
        isPublic={true}
      />

      {/* Gráficos Públicos - Layout em Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Evolução de Estudos - Gráfico de Linha */}
        <StudiesChart data={data} />

        {/* Distribuição por Categoria - Gráfico de Pizza */}
        <CategoryChart data={studyCategories} title="Estudos por Categoria" />
      </div>

      {/* Informações adicionais */}
      <Card className="border-forest-100 shadow-md overflow-hidden mt-4">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <CardTitle className="text-forest-700 font-poppins text-lg">Como Interpretar os Dados</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-forest-700">Sobre os Estudos</h3>
              <p className="text-sm text-forest-600 text-justify">
                Os estudos apresentados representam pesquisas acadêmicas, projetos do PPGDAS e iniciativas de ONGs focadas na região amazônica.
                Cada estudo é categorizado e georreferenciado para facilitar a visualização no mapa interativo.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-forest-700">Metodologia</h3>
              <p className="text-sm text-forest-600 text-justify">
                Os dados são coletados através de parcerias com instituições de pesquisa, órgãos governamentais e monitoramento de fontes oficiais.
                A atualização é realizada periodicamente conforme novas informações são disponibilizadas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicDashboard;
