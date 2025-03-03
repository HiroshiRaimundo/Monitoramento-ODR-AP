
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';
import { AMAZON_COLORS } from "./CategoryChart";

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
      <div className="bg-white p-3 border border-primary/20 rounded shadow-md">
        <p className="font-medium text-primary">{payload[0].payload.responsible}</p>
        <p className="text-sm">Instituição: <span className="font-medium">{payload[0].payload.institution}</span></p>
        <p className="text-sm">Monitoramentos: <span className="font-medium">{payload[0].payload.monitoramentos}</span></p>
      </div>
    );
  }

  return null;
};

const ResearchersChart: React.FC<ResearchersChartProps> = ({ data }) => {
  return (
    <Card className="eco-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary-foreground bg-primary py-2 px-4 rounded-md inline-block text-lg">
          Top 5 Pesquisadores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E1E1E1" horizontal={true} vertical={false} />
              <XAxis type="number" tick={{ fill: "#4b5563" }} axisLine={{ stroke: "#9CA3AF" }} />
              <YAxis 
                dataKey="responsible" 
                type="category" 
                width={120}
                tick={{ fill: "#4b5563" }}
                axisLine={{ stroke: "#9CA3AF" }}
                tickFormatter={(value) => {
                  // Formatação para exibir o responsável com a instituição abreviada
                  const item = data.find(d => d.responsible === value);
                  const institution = item?.institution ? 
                    ` (${item.institution.split(' ').map(w => w[0]).join('')})` : '';
                  return `${value}${institution}`;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Bar 
                dataKey="monitoramentos" 
                fill={AMAZON_COLORS[3]}
                radius={[0, 4, 4, 0]}
              >
                <LabelList dataKey="monitoramentos" position="right" fill="#4b5563" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchersChart;
