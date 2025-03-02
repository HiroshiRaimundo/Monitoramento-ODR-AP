
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';

interface ResearchersChartProps {
  data: Array<{
    responsible: string;
    monitoramentos: number;
    institution: string;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-md">
        <p className="font-medium">{payload[0].payload.responsible}</p>
        <p className="text-sm">Instituição: {payload[0].payload.institution}</p>
        <p className="text-sm">Monitoramentos: {payload[0].payload.monitoramentos}</p>
      </div>
    );
  }

  return null;
};

const ResearchersChart: React.FC<ResearchersChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Pesquisadores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="responsible" 
                type="category" 
                width={120}
                tickFormatter={(value) => {
                  // Formatação para exibir o responsável com a instituição abreviada
                  const item = data.find(d => d.responsible === value);
                  const institution = item?.institution ? 
                    ` (${item.institution.split(' ').map(w => w[0]).join('')})` : '';
                  return `${value}${institution}`;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="monitoramentos" fill="#FFBB28">
                <LabelList dataKey="monitoramentos" position="right" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchersChart;
