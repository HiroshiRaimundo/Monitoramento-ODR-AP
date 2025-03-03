
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Paleta de cores em tons de verde para representar a Amazônia
export const AMAZON_COLORS = [
  '#3CB371', // Medium Sea Green
  '#2E8B57', // Sea Green
  '#6B8E23', // Olive Drab
  '#556B2F', // Dark Olive Green
  '#006400', // Dark Green
  '#8FBC8F', // Dark Sea Green
  '#9ACD32', // Yellow Green
  '#32CD32', // Lime Green
  '#00FF7F', // Spring Green
  '#7CFC00'  // Lawn Green
];

interface CategoryChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  return (
    <Card className="eco-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary-foreground bg-primary py-2 px-4 rounded-md inline-block text-lg">
          Monitoramentos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={AMAZON_COLORS[index % AMAZON_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} monitoramentos`, 'Quantidade']}
                contentStyle={{ borderRadius: '8px', borderColor: AMAZON_COLORS[0], backgroundColor: '#FDFDFD' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
