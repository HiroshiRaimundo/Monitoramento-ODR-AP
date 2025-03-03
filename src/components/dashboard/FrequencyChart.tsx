
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AMAZON_COLORS } from "./CategoryChart";

interface FrequencyChartProps {
  data: Array<{
    frequency: string;
    quantidade: number;
  }>;
}

const FrequencyChart: React.FC<FrequencyChartProps> = ({ data }) => {
  return (
    <Card className="eco-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary-foreground bg-primary py-2 px-4 rounded-md inline-block text-lg">
          Frequência de Atualização
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E1E1" />
              <XAxis 
                dataKey="frequency" 
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
                  borderColor: AMAZON_COLORS[1],
                  backgroundColor: '#FDFDFD'
                }}
                formatter={(value: number) => [`${value} monitoramentos`, 'Quantidade']}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "10px" }}
              />
              <Bar 
                dataKey="quantidade" 
                fill={AMAZON_COLORS[1]} 
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrequencyChart;
