
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface SourceTypeChartProps {
  data: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-forest-200 rounded-md shadow-lg">
        <p className="font-medium text-forest-700">{payload[0].payload.subject}</p>
        <p className="text-forest-600">
          <span className="font-semibold">Valor:</span> {payload[0].value}
        </p>
        <p className="text-forest-600">
          <span className="font-semibold">Escala Máxima:</span> {payload[0].payload.fullMark}
        </p>
      </div>
    );
  }

  return null;
};

const SourceTypeChart: React.FC<SourceTypeChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700">Cobertura por Tipo de Fonte</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid stroke="#d1d5db" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#333', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 'auto']} 
                tick={{ fill: '#333' }}
              />
              <Radar
                name="Monitoramentos"
                dataKey="A"
                stroke="#045424"
                fill="#045424"
                fillOpacity={0.6}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceTypeChart;
