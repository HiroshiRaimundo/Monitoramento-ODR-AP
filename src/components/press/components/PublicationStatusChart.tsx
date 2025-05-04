
import React, { useMemo } from "react";
import { PublicationStatusChartProps } from "../types/pressTypes";
import { COLORS } from "@/lib/chartConstants";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PublicationStatusChart: React.FC<PublicationStatusChartProps> = ({ items }) => {
  // Use useMemo to calculate counts and percentages only when items change
  const chartData = useMemo(() => {
    const publishedCount = items.filter(item => item.status === "published").length;
    const sentCount = items.filter(item => item.status === "sent").length;
    const draftCount = items.filter(item => item.status === "draft").length;
    const total = items.length;

    const publishedPercent = total > 0 ? (publishedCount / total) * 100 : 0;
    const sentPercent = total > 0 ? (sentCount / total) * 100 : 0;
    const draftPercent = total > 0 ? (draftCount / total) * 100 : 0;

    // Format data for recharts
    return {
      counts: {
        published: publishedCount,
        sent: sentCount,
        draft: draftCount,
        total
      },
      percentages: {
        published: publishedPercent,
        sent: sentPercent,
        draft: draftPercent
      },
      pieData: [
        { name: "Publicado", value: publishedCount, color: "green-500" },
        { name: "Enviado", value: sentCount, color: "blue-500" },
        { name: "Rascunho", value: draftCount, color: "gray-500" }
      ]
    };
  }, [items]);
  
  // Format percentage for display
  const formatPercent = (value: number) => `${Math.round(value)}%`;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium">Status de Publicação</h3>
        <div className="flex items-center space-x-2">
          {chartData.pieData.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center space-x-1">
              <span className={`w-3 h-3 bg-${entry.color} rounded-full`}></span>
              <span className="text-xs">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        {chartData.pieData.map((entry, index) => (
          <div key={`bar-${index}`} className="flex items-center space-x-2">
            <div className="w-24 text-xs">{entry.name}s</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div 
                className={`bg-${entry.color} h-4 rounded-full`} 
                style={{ 
                  width: `${chartData.percentages[entry.name.toLowerCase() as keyof typeof chartData.percentages]}%` 
                }}
              />
            </div>
            <div className="w-10 text-xs font-semibold">
              {chartData.counts[entry.name.toLowerCase() as keyof typeof chartData.counts]}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="w-32 h-32">
          <ChartContainer
            config={{
              published: { theme: { light: "#22c55e" } },
              sent: { theme: { light: "#3b82f6" } },
              draft: { theme: { light: "#6b7280" } },
            }}
          >
            <PieChart>
              <Pie
                data={chartData.pieData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={40}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {chartData.pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`var(--color-${entry.name.toLowerCase()})`} 
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
      
      {/* Center total count */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="font-bold text-lg">{chartData.counts.total}</div>
        <div className="text-xs uppercase">Total</div>
      </div>
    </div>
  );
};

export default React.memo(PublicationStatusChart);
