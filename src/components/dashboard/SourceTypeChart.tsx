
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AMAZON_COLORS } from "./CategoryChart";

interface SourceTypeChartProps {
  data: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
}

const SourceTypeChart: React.FC<SourceTypeChartProps> = ({ data }) => {
  return (
    <Card className="eco-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary-foreground bg-primary py-2 px-4 rounded-md inline-block text-lg">
          Cobertura por Tipo de Fonte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid stroke="#E1E1E1" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#4b5563" }} />
              <PolarRadiusAxis tick={{ fill: "#4b5563" }} axisLine={{ stroke: "#9CA3AF" }} />
              <Radar
                name="Monitoramentos"
                dataKey="A"
                stroke={AMAZON_COLORS[6]}
                fill={AMAZON_COLORS[6]}
                fillOpacity={0.6}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px',
                  borderColor: AMAZON_COLORS[6],
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
