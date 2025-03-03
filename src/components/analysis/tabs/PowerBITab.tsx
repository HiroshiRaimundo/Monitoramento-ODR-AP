
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { MonitoringItem, downloadScript } from "../utils/analysisUtils";
import { templates } from "../utils/codeTemplates";

interface PowerBITabProps {
  items: MonitoringItem[];
}

const PowerBITab: React.FC<PowerBITabProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-4">
        Adicione sites para monitoramento para gerar scripts Power BI.
      </p>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="min-w-full divide-y">
        <thead className="bg-green-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Site Monitorado</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Categoria</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Frequência</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-green-800 uppercase tracking-wider">Script Power BI</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-green-50/50">
              <td className="px-4 py-3 whitespace-nowrap text-sm">{item.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{item.category}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{item.frequency}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1" 
                  onClick={() => downloadScript(item, 'powerbi', templates)}
                >
                  <Download size={14} />
                  <span>Power BI</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PowerBITab;
