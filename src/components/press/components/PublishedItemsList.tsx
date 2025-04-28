
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { PublishedItemsListProps } from "../types/pressTypes";

const PublishedItemsList: React.FC<PublishedItemsListProps> = ({ items, onViewItem }) => {
  const publishedItems = items.filter(item => item.status === "published");

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Releases e Reportagens Publicados</h3>
      
      {publishedItems.length > 0 ? (
        <div className="space-y-2">
          {publishedItems.map(item => (
            <div key={item.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center">
                  <FileText size={16} className="text-forest-600 mr-2" />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className="mr-2">{item.type === "release" ? "Release" : "Reportagem"}</span>
                  <span>•</span>
                  <span className="mx-2">{item.category}</span>
                  <span>•</span>
                  <span className="ml-2">{new Date(item.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="ml-2" onClick={() => onViewItem(item)}>
                <Eye size={14} className="mr-1" />
                Ver
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 border rounded-md bg-gray-50">
          <p className="text-sm text-gray-500">Nenhum item publicado</p>
        </div>
      )}
    </div>
  );
};

export default PublishedItemsList;
