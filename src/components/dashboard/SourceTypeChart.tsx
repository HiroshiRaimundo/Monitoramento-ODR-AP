
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Paleta de cores inspirada na Amazônia
export const AMAZON_COLORS = [
  '#005f20', // Verde escuro
  '#1e8449', // Verde médio
  '#52be80', // Verde claro
  '#a9dfbf', // Verde muito claro
  '#145a32', // Verde floresta
  '#196f3d', // Verde oliva
  '#27ae60', // Verde esmeralda
  '#82e0aa', // Verde menta
  '#186a3b', // Verde musgo
  '#229954'  // Verde lima
];

interface SourceTypeChartProps {
  data: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
}

const SourceTypeChart: React.FC<SourceTypeChartProps> = ({ data }) => {
  return (
    <Card className="eco-card border-green-200">
      <CardHeader className="pb-2 bg-green-50/50 border-b border-green-100">
        <CardTitle className="text-white bg-green-700 py-2 px-4 rounded-md inline-block text-lg">
          Cobertura por Tipo de Fonte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid stroke="#E1E1E1" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#1e8449" }} />
              <PolarRadiusAxis tick={{ fill: "#1e8449" }} axisLine={{ stroke: "#52be80" }} />
              <Radar
                name="Monitoramentos"
                dataKey="A"
                stroke={AMAZON_COLORS[0]}
                fill={AMAZON_COLORS[2]}
                fillOpacity={0.6}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px',
                  borderColor: AMAZON_COLORS[5],
                  backgroundColor: '#FDFDFD'
                }}
                formatter={(value: number) => [`${value} monitoramentos`, 'Quantidade']}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceTypeChart;
