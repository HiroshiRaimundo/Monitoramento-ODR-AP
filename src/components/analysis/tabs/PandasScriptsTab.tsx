
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Play, AlertTriangle, Check } from "lucide-react";
import { MonitoringItem, downloadScript } from "../utils/analysisUtils";
import { templates } from "../utils/codeTemplates";

interface PandasScriptsTabProps {
  items: MonitoringItem[];
  processingItem: string | null;
  processedItems: Record<string, boolean>;
  onProcessItem: (itemId: string) => void;
}

const PandasScriptsTab: React.FC<PandasScriptsTabProps> = ({ 
  items, 
  processingItem, 
  processedItems, 
  onProcessItem 
}) => {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-4">
        Adicione sites para monitoramento para gerar scripts de análise.
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
            <th className="px-4 py-2 text-center text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
            <th className="px-4 py-2 text-right text-xs font-medium text-green-800 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-green-50/50">
              <td className="px-4 py-3 whitespace-nowrap text-sm">{item.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{item.category}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">{item.frequency}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                {processedItems[item.id] ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Check size={12} className="mr-1" />
                    Processado
                  </span>
                ) : processingItem === item.id ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <div className="animate-spin h-3 w-3 border-2 border-yellow-600 rounded-full border-t-transparent mr-1"></div>
                    Processando
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <AlertTriangle size={12} className="mr-1" />
                    Pendente
                  </span>
                )}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 border-green-600 text-green-700 hover:bg-green-50" 
                    onClick={() => onProcessItem(item.id)}
                    disabled={processingItem === item.id || processedItems[item.id]}
                  >
                    <Play size={14} />
                    <span>Processar</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1" 
                    onClick={() => downloadScript(item, 'pandas', templates)}
                  >
                    <Download size={14} />
                    <span>Script</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PandasScriptsTab;
