
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { ResearchStudy } from "@/types/research";
import DashboardControls from "./DashboardControls";
import DashboardHeader from "./public/DashboardHeader";
import ChartsSection from "./public/ChartsSection";
import MapSection from "./public/MapSection";
import InterpretationGuide from "./public/InterpretationGuide";
import { filterStudiesByTimeRange } from "./public/utils/dataUtils";
=======
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import { ResearchStudy } from "@/types/research";
import DashboardControls from "./DashboardControls";
import { Info, FileBarChart } from "lucide-react";
import ResearchersByInstitutionChart from "./ResearchersByInstitutionChart";
import TimelineChart from "./TimelineChart";
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937

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

const PublicDashboard: React.FC<PublicDashboardProps> = ({ 
  data, 
  timeRange, 
  setTimeRange, 
  isAuthenticated,
  studies,
  mapData = studies // Por padrão, usa os mesmos estudos
}) => {
  const [filteredMapData, setFilteredMapData] = useState<ResearchStudy[]>(mapData);

  useEffect(() => {
    const filtered = filterStudiesByTimeRange(mapData, timeRange);
    console.log("PublicDashboard: Filtrando dados do mapa", mapData.length, "->", filtered.length);
    setFilteredMapData(filtered);
  }, [timeRange, mapData]);

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

  // Dados simulados para a linha do tempo
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
    
    return sampleTitles.map((title, index) => {
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
  }, []);

  return (
    <div className="grid gap-6 font-poppins">
      <DashboardHeader studies={studies} />

      <DashboardControls 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleExport={() => {}}
        isAuthenticated={false}
        totalItems={studies.length}
        isPublic={true}
      />

      <ChartsSection data={data} studies={studies} />
      
      <MapSection filteredMapData={filteredMapData} />

<<<<<<< HEAD
      <InterpretationGuide />
=======
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
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937
    </div>
  );
};

export default PublicDashboard;
