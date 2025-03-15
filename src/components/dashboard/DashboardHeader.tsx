
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Activity, ChevronRight, FileBarChart } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  description: string;
  statsItems: Array<{ value: number | string; label: string }>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  statsItems
}) => {
  return (
    <Card className="border-forest-100 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <div className="flex items-center gap-2">
          <FileBarChart size={24} className="text-forest-600" />
          <CardTitle className="text-forest-700 font-poppins text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-forest-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <p className="text-forest-700 mb-2">
              Área administrativa para visualização e gerenciamento de todos os monitoramentos ativos. Os dados coletados são atualizados automaticamente conforme a frequência configurada.
            </p>
            <div className="stats flex flex-wrap gap-4 font-poppins">
              {statsItems.map((stat, index) => (
                <div key={index} className="stat bg-forest-50 p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-forest-700">{stat.value}</div>
                  <div className="text-sm text-forest-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-forest-200 hover:bg-forest-50 hover:text-forest-700 flex items-center gap-2"
            >
              <Activity size={16} />
              <span>Relatório de Status</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-forest-200 hover:bg-forest-50 hover:text-forest-700 flex items-center gap-2"
            >
              <Download size={16} />
              <span>Exportar CSV</span>
            </Button>
            
            <Link to="/documentacao" className="inline-block">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-forest-200 hover:bg-forest-50 hover:text-forest-700 flex items-center gap-2"
              >
                <ChevronRight size={16} />
                <span>Documentação</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
