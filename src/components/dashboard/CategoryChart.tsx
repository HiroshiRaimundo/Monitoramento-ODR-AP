
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface CategoryChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title?: string;
}

// Enhanced color palette with forest greens and complementary colors
const COLORS = ['#045424', '#16744a', '#44906f', '#72ab93', '#a1c7b7', '#3366cc', '#dc3912', '#ff9900'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-forest-200 rounded-md shadow-lg">
        <p className="font-medium text-forest-700 font-poppins">{payload[0].name}</p>
        <p className="text-forest-600 font-poppins">
          <span className="font-semibold">Quantidade:</span> {payload[0].value}
        </p>
        <p className="text-forest-600 font-poppins">
          <span className="font-semibold">Porcentagem:</span> {(payload[0].percent * 100).toFixed(1)}%
        </p>
      </div>
    );
  }

  return null;
};

const CategoryChart: React.FC<CategoryChartProps> = ({ data, title = "Monitoramentos por Categoria" }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  paddingTop: '20px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryChart;
