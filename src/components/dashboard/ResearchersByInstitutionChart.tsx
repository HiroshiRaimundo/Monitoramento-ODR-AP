
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

interface ResearchersByInstitutionProps {
  data: Array<{
    institution: string;
    researchers: number;
    color?: string;
  }>;
}

const INSTITUTION_COLORS = {
  'UNIFAP': '#3BB143',
  'IFAP': '#046307', 
  'OMARA': '#6db784',
  'PPGED': '#93c572',
  'AGECOM': '#1e4d2b',
  'PPGDAPP': '#045424',
  'Pós-Doc': '#7cb69d'
};

const ResearchersByInstitutionChart: React.FC<ResearchersByInstitutionProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins">Pesquisadores por Instituição</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="institution" 
                tick={{ fill: '#333', fontFamily: 'Poppins, sans-serif' }} 
                tickLine={{ stroke: '#333' }}
              />
              <YAxis 
                tick={{ fill: '#333', fontFamily: 'Poppins, sans-serif' }} 
                tickLine={{ stroke: '#333' }}
                label={{ value: 'Quantidade', angle: -90, position: 'insideLeft', offset: -5, style: { textAnchor: 'middle', fill: '#333', fontFamily: 'Poppins, sans-serif' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderColor: '#045424',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  fontFamily: 'Poppins, sans-serif'
                }}
                formatter={(value, name) => [value, 'Pesquisadores']}
                labelFormatter={(label) => `Instituição: ${label}`}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
              <Bar 
                dataKey="researchers" 
                name="Pesquisadores" 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={INSTITUTION_COLORS[entry.institution as keyof typeof INSTITUTION_COLORS] || '#045424'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchersByInstitutionChart;
