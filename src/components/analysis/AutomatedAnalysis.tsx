
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart2, PieChart, LineChart, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  frequency: string;
  category: string;
}

interface AutomatedAnalysisProps {
  items: MonitoringItem[];
}

// Dados simulados de análise
const generateAnalysisData = (items: MonitoringItem[]) => {
  // Simulando dados de análise baseados nos itens de monitoramento
  const categories = ["governo", "pesquisa", "ensino", "comunidade", "economia", "saúde", "outro"];
  const frequencies = ["diário", "semanal", "mensal", "trimestral", "anual"];
  
  // Contagem por categoria
  const categoryCounts: Record<string, number> = {};
  categories.forEach(cat => { categoryCounts[cat] = 0 });
  
  items.forEach(item => {
    if (item.category in categoryCounts) {
      categoryCounts[item.category]++;
    } else {
      categoryCounts["outro"]++;
    }
  });
  
  // Contagem por frequência
  const frequencyCounts: Record<string, number> = {};
  frequencies.forEach(freq => { frequencyCounts[freq] = 0 });
  
  items.forEach(item => {
    if (item.frequency in frequencyCounts) {
      frequencyCounts[item.frequency]++;
    }
  });
  
  // Tendências (dados simulados)
  const trends = [
    { month: "Jan", count: Math.floor(Math.random() * 30) },
    { month: "Fev", count: Math.floor(Math.random() * 30) },
    { month: "Mar", count: Math.floor(Math.random() * 30) },
    { month: "Abr", count: Math.floor(Math.random() * 30) },
    { month: "Mai", count: Math.floor(Math.random() * 30) },
    { month: "Jun", count: Math.floor(Math.random() * 30) },
  ];
  
  return {
    categoryCounts,
    frequencyCounts,
    trends,
    responsibleTop: [
      { name: "Carlos Silva", count: 7 },
      { name: "Roberta Alves", count: 5 },
      { name: "André Santos", count: 4 },
      { name: "Lucia Pereira", count: 3 },
      { name: "João Oliveira", count: 2 },
    ],
    mostActive: [
      { name: "Portal da Transparência", updates: 143 },
      { name: "IBGE Estatísticas", updates: 87 },
      { name: "Diário Oficial", updates: 65 },
      { name: "Secretaria de Educação", updates: 47 },
      { name: "Ministério da Saúde", updates: 36 },
    ]
  };
};

const AutomatedAnalysis: React.FC<AutomatedAnalysisProps> = ({ items }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(() => generateAnalysisData(items));
  
  const refreshAnalysis = () => {
    setIsLoading(true);
    // Simulação de carregamento para dar a impressão de processamento
    setTimeout(() => {
      setAnalysisData(generateAnalysisData(items));
      setIsLoading(false);
      toast({
        title: "Análise atualizada",
        description: "Os dados de análise foram atualizados com sucesso."
      });
    }, 1500);
  };
  
  const downloadReport = () => {
    // Simulação de download de relatório
    toast({
      title: "Relatório gerado",
      description: "O relatório completo foi baixado com sucesso."
    });
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg">
        <BarChart2 size={48} className="text-green-400 mb-4" />
        <h3 className="text-lg font-medium text-green-800 mb-2">Nenhum dado para análise</h3>
        <p className="text-green-600 text-center max-w-md mb-4">
          Adicione sites para monitoramento na aba "Monitoramento" para visualizar análises automáticas.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-green-800">Análise Automática de Dados</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 border-green-600 text-green-700 hover:bg-green-50"
            onClick={refreshAnalysis}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Atualizando...</span>
              </>
            ) : (
              <>
                <RefreshCw size={14} />
                <span>Atualizar</span>
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={downloadReport}
          >
            <Download size={14} />
            <span>Exportar Relatório</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Distribuição por Categoria */}
        <Card className="overflow-hidden border-green-100">
          <CardContent className="p-0">
            <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
              <div className="flex items-center">
                <PieChart size={18} className="text-green-700 mr-2" />
                <h4 className="font-medium text-green-800">Distribuição por Categoria</h4>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {Object.entries(analysisData.categoryCounts).map(([category, count]) => (
                  count > 0 && (
                    <div key={category} className="flex items-center">
                      <div className="w-32 text-sm">{category}</div>
                      <div className="flex-1 h-4 bg-green-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${(count / items.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-right text-sm">{count}</div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Frequência de Atualização */}
        <Card className="overflow-hidden border-green-100">
          <CardContent className="p-0">
            <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
              <div className="flex items-center">
                <BarChart2 size={18} className="text-green-700 mr-2" />
                <h4 className="font-medium text-green-800">Frequência de Atualização</h4>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {Object.entries(analysisData.frequencyCounts).map(([frequency, count]) => (
                  count > 0 && (
                    <div key={frequency} className="flex items-center">
                      <div className="w-32 text-sm">{frequency}</div>
                      <div className="flex-1 h-4 bg-green-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${(count / items.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-right text-sm">{count}</div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tendências Recentes */}
        <Card className="overflow-hidden border-green-100">
          <CardContent className="p-0">
            <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
              <div className="flex items-center">
                <LineChart size={18} className="text-green-700 mr-2" />
                <h4 className="font-medium text-green-800">Tendências Recentes</h4>
              </div>
            </div>
            <div className="p-4">
              <div className="h-40 flex items-end justify-between">
                {analysisData.trends.map((item) => (
                  <div key={item.month} className="flex flex-col items-center">
                    <div className="h-32 flex items-end">
                      <div 
                        className="w-8 bg-green-500 rounded-t-sm" 
                        style={{ height: `${(item.count / 30) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Responsáveis */}
        <Card className="overflow-hidden border-green-100">
          <CardContent className="p-0">
            <div className="p-4 bg-green-50 border-b border-green-100">
              <h4 className="font-medium text-green-800">Top Responsáveis</h4>
            </div>
            <div className="p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-green-700 uppercase tracking-wider pb-2">Pesquisador</th>
                    <th className="text-right text-xs font-medium text-green-700 uppercase tracking-wider pb-2">Monitoramentos</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.responsibleTop.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-green-50/50" : ""}>
                      <td className="py-2 text-sm">{item.name}</td>
                      <td className="py-2 text-sm text-right">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Monitoramentos Mais Ativos */}
        <Card className="overflow-hidden border-green-100">
          <CardContent className="p-0">
            <div className="p-4 bg-green-50 border-b border-green-100">
              <h4 className="font-medium text-green-800">Monitoramentos Mais Ativos</h4>
            </div>
            <div className="p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-green-700 uppercase tracking-wider pb-2">Fonte</th>
                    <th className="text-right text-xs font-medium text-green-700 uppercase tracking-wider pb-2">Atualizações</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.mostActive.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-green-50/50" : ""}>
                      <td className="py-2 text-sm">{item.name}</td>
                      <td className="py-2 text-sm text-right">{item.updates}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutomatedAnalysis;
