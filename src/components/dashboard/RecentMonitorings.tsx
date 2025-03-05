
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import { MonitoringItem } from "@/hooks/useMonitoring";

interface RecentMonitoringsProps {
  monitorings: MonitoringItem[];
}

const RecentMonitorings: React.FC<RecentMonitoringsProps> = ({ monitorings }) => {
  return (
    <Card className="border-forest-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-forest-700 text-base font-medium">Monitoramentos Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monitorings.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-forest-50/50 rounded-md">
              <div className="text-left">
                <h4 className="text-sm font-medium text-forest-700">{item.name}</h4>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs bg-white text-forest-600 mr-2">
                    {item.category}
                  </Badge>
                  <span className="text-xs text-forest-600">
                    {new Date(item.created_at ?? "").toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 border-forest-200 hover:bg-forest-50 hover:text-forest-700">
                <BarChart2 size={14} className="mr-1" />
                Gráfico
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMonitorings;
