import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MonitoringItem } from "@/hooks/useMonitoring";
import { ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, subDays, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MonitoringChartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monitoringItem: MonitoringItem | null;
}

// Cores para os gráficos
const COLORS = ["#0A6640", "#137547", "#1D854F", "#279658", "#31A866"];

const MonitoringChartDialog: React.FC<MonitoringChartDialogProps> = ({
  open,
  onOpenChange,
  monitoringItem,
}) => {
  // Gerar dados históricos simulados para o monitoramento selecionado
  const historicalData = useMemo(() => {
    if (!monitoringItem) return [];

    const today = new Date();
    const data = [];
    
    // Gerar dados para os últimos 30 dias
    for (let i = 30; i >= 0; i--) {
      const date = subDays(today, i);
      const formattedDate = format(date, "dd/MM", { locale: ptBR });
      
      // Gerar valores simulados com base em padrões realistas
      // Valores aumentam gradualmente com algumas flutuações aleatórias
      const baseValue = 10 + Math.floor(i / 3);
      const randomFactor = Math.random() * 5 - 2.5; // Flutuação entre -2.5 e 2.5
      
      data.push({
        date: formattedDate,
        atualizacoes: Math.max(1, Math.floor(baseValue / 2 + randomFactor)),
        citacoes: Math.max(0, Math.floor(baseValue / 3 + randomFactor)),
        acessos: Math.max(5, Math.floor(baseValue + 5 + randomFactor)),
      });
    }
    
    return data;
  }, [monitoringItem]);

  // Gerar dados de distribuição por fonte
  const sourceData = useMemo(() => {
    if (!monitoringItem) return [];
    
    // Dados simulados de distribuição por fonte
    return [
      { name: "API", value: 45 },
      { name: "Web", value: 30 },
      { name: "PDF", value: 15 },
      { name: "RSS", value: 10 },
    ];
  }, [monitoringItem]);

  // Gerar dados de atualização mensal
  const monthlyData = useMemo(() => {
    if (!monitoringItem) return [];
    
    const today = new Date();
    const data = [];
    
    // Gerar dados para os últimos 6 meses
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(today, i);
      const formattedDate = format(date, "MMM/yy", { locale: ptBR });
      
      // Valores simulados com tendência de crescimento
      const baseValue = 30 + (5 - i) * 8;
      const randomFactor = Math.random() * 10 - 5; // Flutuação entre -5 e 5
      
      data.push({
        month: formattedDate,
        atualizacoes: Math.max(10, Math.floor(baseValue + randomFactor)),
      });
    }
    
    return data;
  }, [monitoringItem]);

  if (!monitoringItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-forest-700 text-xl">
            Análise de Monitoramento: {monitoringItem.name}
          </DialogTitle>
          <DialogDescription className="text-forest-600">
            Dados históricos e estatísticas do monitoramento
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-forest-50 p-4 rounded-lg">
              <div className="text-sm text-forest-600">Categoria</div>
              <div className="text-lg font-medium text-forest-700">{monitoringItem.category}</div>
            </div>
            <div className="bg-forest-50 p-4 rounded-lg">
              <div className="text-sm text-forest-600">Frequência</div>
              <div className="text-lg font-medium text-forest-700">{monitoringItem.frequency}</div>
            </div>
            <div className="bg-forest-50 p-4 rounded-lg">
              <div className="text-sm text-forest-600">Responsável</div>
              <div className="text-lg font-medium text-forest-700">{monitoringItem.responsible || "Não definido"}</div>
            </div>
          </div>

          <Tabs defaultValue="diario" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="diario">Evolução Diária</TabsTrigger>
              <TabsTrigger value="mensal">Evolução Mensal</TabsTrigger>
              <TabsTrigger value="distribuicao">Distribuição</TabsTrigger>
            </TabsList>

            <TabsContent value="diario">
              <div className="bg-white p-4 rounded-lg border border-forest-100">
                <h3 className="text-forest-700 font-medium mb-4">Evolução Diária de Dados</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="atualizacoes"
                        stroke="#0A6640"
                        activeDot={{ r: 8 }}
                        name="Atualizações"
                      />
                      <Line
                        type="monotone"
                        dataKey="citacoes"
                        stroke="#137547"
                        name="Citações"
                      />
                      <Line
                        type="monotone"
                        dataKey="acessos"
                        stroke="#1D854F"
                        name="Acessos"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mensal">
              <div className="bg-white p-4 rounded-lg border border-forest-100">
                <h3 className="text-forest-700 font-medium mb-4">Evolução Mensal de Atualizações</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="atualizacoes"
                        fill="#0A6640"
                        name="Atualizações"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="distribuicao">
              <div className="bg-white p-4 rounded-lg border border-forest-100">
                <h3 className="text-forest-700 font-medium mb-4">Distribuição por Tipo de Fonte</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonitoringChartDialog;
