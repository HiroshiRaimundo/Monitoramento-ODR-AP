
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

const SourceTypeChart: React.FC<SourceTypeChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cobertura por Tipo de Fonte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Monitoramentos"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceTypeChart;
