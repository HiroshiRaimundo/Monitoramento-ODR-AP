
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart 
} from 'recharts';

interface StudiesChartProps {
  data: Array<{
    name: string;
    estudos: number;
    monitoramentos: number;
    atualizacoes: number;
  }>;
}

const StudiesChart: React.FC<StudiesChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700">Evolução de Estudos</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorEstudos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#045424" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#045424" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#333' }} 
                tickLine={{ stroke: '#333' }}
              />
              <YAxis 
                tick={{ fill: '#333' }} 
                tickLine={{ stroke: '#333' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderColor: '#045424',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="estudos" 
                stroke="#045424" 
                fillOpacity={1}
                fill="url(#colorEstudos)" 
                activeDot={{ r: 8, fill: '#045424', stroke: 'white', strokeWidth: 2 }}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudiesChart;
