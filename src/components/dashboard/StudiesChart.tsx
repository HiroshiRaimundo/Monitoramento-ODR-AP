
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AMAZON_COLORS } from "./CategoryChart";

interface StudiesChartProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
}

const StudiesChart: React.FC<StudiesChartProps> = ({ data }) => {
  return (
    <Card className="eco-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary-foreground bg-primary py-2 px-4 rounded-md inline-block text-lg">
          Evolução de Estudos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                  borderColor: AMAZON_COLORS[0],
                  backgroundColor: '#FDFDFD'
                }}
                formatter={(value: number) => [`${value} estudos`, 'Quantidade']}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Line 
                type="monotone" 
                dataKey="estudos" 
                stroke={AMAZON_COLORS[0]} 
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={{ fill: AMAZON_COLORS[0], stroke: 'white', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudiesChart;
