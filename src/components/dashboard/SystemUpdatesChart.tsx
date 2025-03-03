
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AMAZON_COLORS } from "./CategoryChart";

interface SystemUpdatesChartProps {
  data: Array<{
    name: string;
    atualizacoes: number;
  }>;
}

const SystemUpdatesChart: React.FC<SystemUpdatesChartProps> = ({ data }) => {
  return (
    <Card className="eco-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary-foreground bg-primary py-2 px-4 rounded-md inline-block text-lg">
          Atualizações do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAtualizacoes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={AMAZON_COLORS[4]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={AMAZON_COLORS[4]} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E1E1" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "#4b5563" }}
                axisLine={{ stroke: "#9CA3AF" }}
              />
              <YAxis 
                tick={{ fill: "#4b5563" }}
                axisLine={{ stroke: "#9CA3AF" }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px',
                  borderColor: AMAZON_COLORS[4],
                  backgroundColor: '#FDFDFD'
                }}
                formatter={(value: number) => [`${value} atualizações`, 'Quantidade']}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Area 
                type="monotone" 
                dataKey="atualizacoes" 
                stroke={AMAZON_COLORS[4]} 
                fillOpacity={1} 
                fill="url(#colorAtualizacoes)" 
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemUpdatesChart;
