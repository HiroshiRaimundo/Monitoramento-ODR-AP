
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart2, PieChart, Database } from "lucide-react";

const AnalysisTools: React.FC = () => {
  return (
    <div className="bg-forest-50/50 p-6 rounded-lg border border-forest-100">
      <h3 className="text-lg font-medium text-forest-700 mb-4">Ferramentas de Análise</h3>
      <p className="text-forest-600 mb-6">
        Utilize as ferramentas abaixo para analisar os dados coletados pelos monitoramentos, gerar gráficos e exportar relatórios.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <LineChart size={18} className="text-forest-600" />
              Análise Temporal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Visualize a evolução de indicadores específicos ao longo do tempo para identificar tendências e padrões.
            </p>
            <div className="flex gap-2">
              <Button className="bg-forest-600 hover:bg-forest-700">
                Criar Gráfico
              </Button>
              <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <BarChart2 size={18} className="text-forest-600" />
              Comparação por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Compare indicadores entre diferentes categorias ou regiões para identificar disparidades e prioridades.
            </p>
            <div className="flex gap-2">
              <Button className="bg-forest-600 hover:bg-forest-700">
                Criar Gráfico
              </Button>
              <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <PieChart size={18} className="text-forest-600" />
              Distribuição de Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Analise a distribuição de recursos, investimentos ou dados demográficos em diferentes setores ou regiões.
            </p>
            <div className="flex gap-2">
              <Button className="bg-forest-600 hover:bg-forest-700">
                Criar Gráfico
              </Button>
              <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                Exportar Dados
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-forest-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
              <Database size={18} className="text-forest-600" />
              Relatórios Personalizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-forest-600 mb-4">
              Crie relatórios personalizados combinando diversos indicadores e formatos de visualização.
            </p>
            <div className="flex gap-2">
              <Button className="bg-forest-600 hover:bg-forest-700">
                Criar Relatório
              </Button>
              <Button variant="outline" className="border-forest-200 hover:bg-forest-50">
                Modelos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisTools;
