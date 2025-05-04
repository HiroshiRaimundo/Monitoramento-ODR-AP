
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import { ResearchStudy } from "@/types/research";
import DashboardControls from "./DashboardControls";
import { Info, FileBarChart } from "lucide-react";
import ResearchersByInstitutionChart from "./ResearchersByInstitutionChart";
import TimelineChart from "./TimelineChart";
import { toast } from "@/hooks/use-toast";

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

  // Dados para o gráfico de pesquisadores por instituição
  const institutionData = [
    { institution: "UNIFAP", researchers: 12 },
    { institution: "IFAP", researchers: 8 },
    { institution: "OMARA", researchers: 5 },
    { institution: "PPGED", researchers: 7 },
    { institution: "AGECOM", researchers: 3 },
    { institution: "PPGDAPP", researchers: 15 },
    { institution: "Pós-Doc", researchers: 4 }
  ];

  // Dados simulados para a linha do tempo filtrados pelo período
  const timelineData = useMemo(() => {
    const sampleTitles = [
      "Portal de Transparência", 
      "IBGE - Indicadores", 
      "Diário Oficial", 
      "Legislação Ambiental", 
      "Banco de Dados IBAMA", 
      "API Gov.br", 
      "Portal da UNIFAP", 
      "Biblioteca Digital",
      "Documentação Técnica",
      "Estudos Socioambientais"
    ];
    
    // Criar datas em ordem cronológica, mas limitar com base no timeRange
    let limit;
    switch (timeRange) {
      case "diario": limit = 3; break;
      case "semanal": limit = 5; break;
      case "mensal": limit = 7; break;
      default: limit = sampleTitles.length; // anual
    }
    
    return sampleTitles.slice(0, limit).map((title, index) => {
      // Criar datas em ordem cronológica com intervalos variados
      const monthOffset = index % 12;
      const yearOffset = Math.floor(index / 12);
      const date = new Date(2023 + yearOffset, monthOffset, 15);
      
      return {
        id: `timeline-${index + 1}`,
        title,
        date: date.toLocaleDateString('pt-BR')
      };
    });
  }, [timeRange]);

  // Função para exportar os dados
  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados serão exportados em formato CSV."
    });
    
    // Simulação de exportação (em uma implementação real, isso geraria um arquivo CSV)
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "Os dados foram exportados com sucesso."
      });
    }, 1500);
  };

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
        handleExport={handleExport}
        isAuthenticated={isAuthenticated}
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

      {/* Novos Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pesquisadores por Instituição - Gráfico de Barras */}
        <ResearchersByInstitutionChart data={institutionData} />

        {/* Linha do Tempo de Monitoramentos - Gráfico de Linha */}
        <TimelineChart data={timelineData} />
      </div>
    </div>
  );
};

export default PublicDashboard;
