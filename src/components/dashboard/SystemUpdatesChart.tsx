
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SystemUpdatesChartProps {
  data: Array<{
    name: string;
    updates: number;
  }>;
}

const SystemUpdatesChart: React.FC<SystemUpdatesChartProps> = ({ data }) => {
  return (
    <Card className="border-forest-100 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-forest-700 text-base font-medium">Atualizações do Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="updates" 
                stroke="#38875D" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Atualizações"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemUpdatesChart;
