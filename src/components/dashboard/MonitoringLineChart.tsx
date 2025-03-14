import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface MonitoringLineChartProps {
  data: Array<{
    name: string;
    monitoramentos: number;
  }>;
}

const MonitoringLineChart: React.FC<MonitoringLineChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins">Trabalhos Monitorados</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#333', fontFamily: 'Poppins, sans-serif' }} 
                tickLine={{ stroke: '#333' }}
              />
              <YAxis 
                tick={{ fill: '#333', fontFamily: 'Poppins, sans-serif' }} 
                tickLine={{ stroke: '#333' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderColor: '#045424',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="monitoramentos" 
                name="Monitoramentos"
                stroke="#045424" 
                activeDot={{ r: 8, fill: '#045424', stroke: 'white', strokeWidth: 2 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringLineChart;
