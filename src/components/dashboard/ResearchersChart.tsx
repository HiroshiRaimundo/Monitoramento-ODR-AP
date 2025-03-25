
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
      <div className="bg-white p-3 border border-forest-200 rounded-md shadow-lg">
        <p className="font-medium text-forest-700">{payload[0].payload.responsible}</p>
        <p className="text-forest-600">
          <span className="font-semibold">Instituição:</span> {payload[0].payload.institution}
        </p>
        <p className="text-forest-600">
          <span className="font-semibold">Monitoramentos:</span> {payload[0].payload.monitoramentos}
        </p>
      </div>
    );
  }

  return null;
};

const ResearchersChart: React.FC<ResearchersChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700">Top 15 Pesquisadores</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 50, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                tick={{ fill: '#333' }}
                tickLine={{ stroke: '#333' }}
                axisLine={{ stroke: '#333' }}
              />
              <YAxis 
                dataKey="responsible" 
                type="category" 
                width={120}
                tick={{ fill: '#333' }}
                tickLine={{ stroke: '#333' }}
                axisLine={{ stroke: '#333' }}
                tickFormatter={(value) => {
                  // Formatação para exibir o responsável com a instituição abreviada
                  const item = data.find(d => d.responsible === value);
                  const institution = item?.institution ? 
                    ` (${item.institution.split(' ').map(w => w[0]).join('')})` : '';
                  return `${value}${institution}`;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar 
                dataKey="monitoramentos" 
                fill="#045424"
                radius={[0, 4, 4, 0]}
                barSize={25}
              >
                <LabelList 
                  dataKey="monitoramentos" 
                  position="right" 
                  fill="#333"
                  style={{ fontWeight: 'bold' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchersChart;
