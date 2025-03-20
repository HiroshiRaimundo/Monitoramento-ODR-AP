
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Dot 
} from 'recharts';

interface TimelineEvent {
  date: string;
  title: string;
  id: string;
}

interface TimelineChartProps {
  data: TimelineEvent[];
}

// Componente personalizado para renderizar pontos com títulos
const CustomizedDot = (props: any) => {
  const { cx, cy, payload } = props;
  
  return (
    <g>
      <Dot cx={cx} cy={cy} r={6} fill="#045424" stroke="white" strokeWidth={2} />
      <text 
        x={cx} 
        y={cy - 10} 
        textAnchor="middle" 
        fill="#333" 
        fontSize={10}
        fontFamily="Poppins, sans-serif"
      >
        {payload.title.length > 15 ? payload.title.substring(0, 15) + '...' : payload.title}
      </text>
    </g>
  );
};

// Componente para tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-forest-200 rounded-md shadow-lg">
        <p className="font-medium text-forest-700">{payload[0].payload.title}</p>
        <p className="text-forest-600">
          <span className="font-semibold">Data:</span> {payload[0].payload.date}
        </p>
      </div>
    );
  }

  return null;
};

const TimelineChart: React.FC<TimelineChartProps> = ({ data }) => {
  // Transformar dados para formato compatível com o gráfico
  const chartData = data.map((item, index) => ({
    ...item,
    index: index + 1, // Valor Y para mostrar a evolução temporal
  }));

  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins">Linha do Tempo de Monitoramentos</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 40, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#333', fontFamily: 'Poppins, sans-serif' }} 
                tickLine={{ stroke: '#333' }}
              />
              <YAxis 
                type="number"
                domain={['dataMin - 1', 'dataMax + 1']}
                tick={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="index" 
                stroke="#045424" 
                strokeWidth={2}
                dot={<CustomizedDot />}
                activeDot={{ r: 8, fill: '#045424', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineChart;
