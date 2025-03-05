
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';

interface FrequencyChartProps {
  data: Array<{
    frequency: string;
    quantidade: number;
  }>;
}

// Define color mapping for frequencies
const getFrequencyColor = (frequency: string) => {
  switch (frequency) {
    case "diario":
      return "#045424"; // Our primary green
    case "semanal":
      return "#44906f"; // Lighter green
    case "quinzenal":
      return "#72ab93"; // Even lighter green
    case "mensal":
      return "#a1c7b7"; // Very light green
    default:
      return "#cfe3db"; // Extremely light green
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-forest-200 rounded-md shadow-lg">
        <p className="font-medium text-forest-700">
          Frequência: <span className="capitalize">{payload[0].payload.frequency}</span>
        </p>
        <p className="text-forest-600">
          <span className="font-semibold">Quantidade:</span> {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const FrequencyChart: React.FC<FrequencyChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700">Frequência de Atualização</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="frequency" 
                tick={{ fill: '#333' }}
                tickLine={{ stroke: '#333' }}
                axisLine={{ stroke: '#333' }}
              />
              <YAxis 
                tick={{ fill: '#333' }}
                tickLine={{ stroke: '#333' }}
                axisLine={{ stroke: '#333' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar 
                dataKey="quantidade" 
                name="Quantidade" 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={getFrequencyColor(entry.frequency)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrequencyChart;
