
import React from "react";
import StudiesChart from "./StudiesChart";
import CategoryChart from "./CategoryChart";
import FrequencyChart from "./FrequencyChart";
import ResearchersChart from "./ResearchersChart";
import SourceTypeChart from "./SourceTypeChart";
import SystemUpdatesChart from "./SystemUpdatesChart";

interface ChartsLayoutProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
  categoryData: Array<{
    name: string;
    value: number;
  }>;
  frequencyData: Array<{
    frequency: string;
    quantidade: number;
  }>;
  responsibleData: Array<{
    responsible: string;
    monitoramentos: number;
    institution: string;
  }>;
  radarData: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
}

const ChartsLayout: React.FC<ChartsLayoutProps> = ({
  data,
  categoryData,
  frequencyData,
  responsibleData,
  radarData
}) => {
  return (
    <>
      {/* Gráficos Principais - Layout em Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Evolução de Estudos - Gráfico de Linha */}
        <StudiesChart data={data} />

        {/* Distribuição por Categoria - Gráfico de Pizza */}
        <CategoryChart data={categoryData} />

        {/* Frequência de Atualização - Gráfico de Barras */}
        <FrequencyChart data={frequencyData} />
      </div>

      {/* Gráficos Secundários - 2 em uma linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição por Responsável - Gráfico de Barras */}
        <ResearchersChart data={responsibleData} />

        {/* Cobertura por Tipo - Gráfico Radar */}
        <SourceTypeChart data={radarData} />
      </div>

      {/* Atualizações do Sistema - Gráfico de Área */}
      <SystemUpdatesChart data={data} />
    </>
  );
};

export default ChartsLayout;
