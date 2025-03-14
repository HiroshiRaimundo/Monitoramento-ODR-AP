import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface CollaborationData {
  name: string;
  count: number;
}

interface CollaborationChartProps {
  authors: CollaborationData[];
  institutions: CollaborationData[];
}

const CollaborationChart: React.FC<CollaborationChartProps> = ({ authors, institutions }) => {
  // Combinar dados para visualização
  const combinedData = authors.map(author => {
    const matchingInstitution = institutions.find(inst => inst.name === author.name);
    return {
      name: author.name,
      autores: author.count,
      instituicoes: matchingInstitution ? matchingInstitution.count : 0
    };
  });

  // Adicionar instituições que não têm autores correspondentes
  institutions.forEach(inst => {
    if (!combinedData.some(item => item.name === inst.name)) {
      combinedData.push({
        name: inst.name,
        autores: 0,
        instituicoes: inst.count
      });
    }
  });

  // Limitar a 10 itens para melhor visualização
  const displayData = combinedData.slice(0, 10);

  return (
    <Card className="overflow-hidden border-forest-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins">Colaborações Científicas</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[400px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={displayData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category"
                tick={{ fill: '#333', fontFamily: 'Poppins, sans-serif', fontSize: 12 }}
                width={150}
                interval={0}
                tickFormatter={(value) => {
                  const words = value.split(' ');
                  return words.length > 2 ? words.slice(0, 2).join(' ') + '...' : value;
                }}
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
              <Bar 
                dataKey="autores" 
                name="Autores" 
                fill="#16744a" 
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="instituicoes" 
                name="Instituições" 
                fill="#72ab93" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationChart;
