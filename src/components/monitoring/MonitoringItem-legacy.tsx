
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Link, Trash2, User, Clock, Building2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MonitoringItem } from "./types-legacy";
import { getFrequencyColor, getCategoryBorderColor } from "./monitoringUtils-legacy";

interface MonitoringItemProps {
  item: MonitoringItem;
  onDelete: (id: string) => void;
}

const MonitoringItemComponent: React.FC<MonitoringItemProps> = ({ item, onDelete }) => {
  return (
    <Card 
      className="overflow-hidden border-l-4 border-forest-100 shadow-sm hover:shadow-md transition-all duration-200" 
      style={{ borderLeftColor: getCategoryBorderColor(item.category) }}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-forest-800">{item.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-forest-50 text-forest-700 font-medium">
                {item.category}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getFrequencyColor(item.frequency)} font-medium`}>
                      <Clock size={12} className="mr-1" />
                      {item.frequency}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Frequência de atualização</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center text-sm text-forest-600 gap-1 mt-2">
              <Link2 size={14} className="text-forest-500" />
              <span className="break-all">Fonte: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-forest-700 hover:underline">{item.url}</a></span>
            </div>
            {item.api_url && (
              <div className="flex items-center text-sm text-forest-600 gap-1 mt-1">
                <Link size={14} className="text-forest-500" />
                <span className="break-all">API: <a href={item.api_url} target="_blank" rel="noopener noreferrer" className="text-forest-700 hover:underline">{item.api_url}</a></span>
              </div>
            )}
            {item.keywords && (
              <div className="mt-2">
                <span className="text-xs text-forest-600">Palavras-chave: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.keywords.split(',').map((keyword, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-forest-50 text-forest-700 rounded-full">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {item.responsible && (
              <div className="flex items-center text-sm font-medium gap-1 mt-2 text-forest-700">
                <User size={14} className="text-forest-600" />
                <span>Responsável: {item.responsible}</span>
                {item.institution && (
                  <span className="flex items-center ml-2">
                    <Building2 size={14} className="text-forest-600 mr-1" />
                    {item.institution}
                  </span>
                )}
              </div>
            )}
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="ml-4 mt-1"
          >
            <Trash2 size={16} className="mr-1" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitoringItemComponent;
