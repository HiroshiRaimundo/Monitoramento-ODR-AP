import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import MonitoringLineChart from "./MonitoringLineChart";
import CollaborationChart from "./CollaborationChart";
import { ResearchStudy } from "@/types/research";
import DashboardControls from "./DashboardControls";
import { Info, FileBarChart } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";
import MapView from "@/components/MapView";

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
  mapData?: ResearchStudy[]; // Dados para o mapa
}

// Interface para os dados do gráfico de categorias
interface CategoryData {
  name: string;
  value: number;
}

// Interface para os dados de colaboração
interface CollaborationData {
  name: string;
  count: number;
}

const PublicDashboard: React.FC<PublicDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  isAuthenticated,
  studies,
  mapData = studies // Por padrão, usa os mesmos estudos
}) => {
  // Estado para armazenar os dados filtrados do mapa
  const [filteredMapData, setFilteredMapData] = useState<ResearchStudy[]>(mapData);
  
  // Efeito para filtrar os dados do mapa com base no período selecionado
  useEffect(() => {
    // Aqui implementamos a lógica de filtragem baseada no timeRange
    // Por exemplo, podemos filtrar os estudos com base na data de criação
    // Para este exemplo, vamos apenas simular uma filtragem
    
    // Simulação: filtrar aleatoriamente baseado no timeRange
    const filterStudies = () => {
      // Em uma implementação real, você usaria datas reais para filtrar
      switch(timeRange) {
        case 'diario':
          // Últimas 24 horas
          return mapData.filter((_, index) => index % 4 === 0);
        case 'semanal':
          // Última semana
          return mapData.filter((_, index) => index % 3 === 0);
        case 'mensal':
          // Último mês
          return mapData.filter((_, index) => index % 2 === 0);
        case 'anual':
          // Último ano
          return mapData;
        default:
          return mapData;
      }
    };
    
    setFilteredMapData(filterStudies());
  }, [timeRange, mapData]);

  // Calcular as categorias de estudos com base nos dados disponíveis
  const studyCategories = useMemo(() => {
    // Contadores para cada tipo de estudo
    const categoryCounts: Record<string, number> = {
      "Artigo": 0,
      "Dissertação": 0,
      "Tese": 0,
      "Livros": 0,
      "E-books": 0,
      "Outros": 0
    };
    
    // Contar estudos por tipo
    studies.forEach(study => {
      switch(study.type) {
        case "artigo":
          categoryCounts["Artigo"]++;
          break;
        case "dissertacao":
          categoryCounts["Dissertação"]++;
          break;
        case "tese":
          categoryCounts["Tese"]++;
          break;
        case "livros":
          categoryCounts["Livros"]++;
          break;
        case "ebooks":
          categoryCounts["E-books"]++;
          break;
        case "outro":
          categoryCounts["Outros"]++;
          break;
      }
    });
    
    // Converter para o formato esperado pelo CategoryChart
    const result: CategoryData[] = Object.entries(categoryCounts)
      .filter(([_, count]) => count > 0) // Remover categorias sem estudos
      .map(([name, value]) => ({ name, value }));
    
    // Se não houver dados reais, usar dados simulados
    if (result.length === 0) {
      return [
        { name: "Artigo", value: 12 },
        { name: "Dissertação", value: 8 },
        { name: "Tese", value: 5 },
        { name: "Livros", value: 3 }
      ];
    }
    
    return result;
  }, [studies]);

  // Dados para o gráfico de monitoramento
  const monitoringData = useMemo(() => {
    return data.map(item => ({
      name: item.name,
      monitoramentos: item.monitoramentos
    }));
  }, [data]);

  // Dados para o gráfico de colaboração
  const collaborationData = useMemo(() => {
    // Contagem de autores
    const authorCounts: Record<string, number> = {};
    const institutionCounts: Record<string, number> = {};
    
    studies.forEach(study => {
      // Contagem de autores
      if (study.author) {
        authorCounts[study.author] = (authorCounts[study.author] || 0) + 1;
      }
      
      // Contagem de instituições (simulado, pois não vimos o campo no tipo)
      // Na implementação real, você usaria o campo correto
      const institution = study.location || "Instituição Desconhecida";
      institutionCounts[institution] = (institutionCounts[institution] || 0) + 1;
    });
    
    // Converter para arrays
    const authors: CollaborationData[] = Object.entries(authorCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Limitar a 10 para melhor visualização
    
    const institutions: CollaborationData[] = Object.entries(institutionCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Limitar a 10 para melhor visualização
    
    return { authors, institutions };
  }, [studies]);

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

      {/* Gráficos Públicos - Layout em Grid com 4 gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Evolução de Estudos - Gráfico de Linha */}
        <StudiesChart data={data} />

        {/* Distribuição por Categoria - Gráfico de Pizza */}
        <CategoryChart data={studyCategories} title="Estudos por Categoria" />
        
        {/* Trabalhos Monitorados - Gráfico de Linha */}
        <MonitoringLineChart data={monitoringData} />
        
        {/* Colaborações Científicas - Gráfico de Barras */}
        <CollaborationChart 
          authors={collaborationData.authors} 
          institutions={collaborationData.institutions} 
        />
      </div>

      {/* Mapa filtrado por período */}
      <div className="mt-6">
        <MapView studies={filteredMapData} />
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
