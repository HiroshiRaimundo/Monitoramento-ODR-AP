
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';

interface SystemUpdatesChartProps {
  data: Array<{
    name: string;
    updates: number;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-forest-200 rounded-md shadow-lg">
        <p className="font-medium text-forest-700">{label}</p>
        <p className="text-forest-600">
          <span className="font-semibold">Atualizações:</span> {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const SystemUpdatesChart: React.FC<SystemUpdatesChartProps> = ({ data }) => {
  // Transform data to match the expected format
  const formattedData = data.map(item => ({
    name: item.name,
    atualizacoes: item.updates
  }));

  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700">Atualizações do Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={formattedData} 
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorAtualizacoes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name"
                tick={{ fill: '#333' }}
                tickLine={{ stroke: '#333' }}
              />
              <YAxis 
                tick={{ fill: '#333' }}
                tickLine={{ stroke: '#333' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Area 
                type="monotone" 
                dataKey="atualizacoes" 
                stroke="#ffc658" 
                fillOpacity={1}
                fill="url(#colorAtualizacoes)" 
                activeDot={{ r: 8, fill: '#ffc658', stroke: 'white', strokeWidth: 2 }}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemUpdatesChart;
