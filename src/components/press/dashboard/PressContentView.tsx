
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import PressItemsTable from "../components/PressItemsTable";
import { PressItem } from "../types/pressTypes";

interface PressContentViewProps {
  items: PressItem[];
  viewType: string;
  onViewItem: (item: PressItem) => void;
}

const PressContentView: React.FC<PressContentViewProps> = ({ items, viewType, onViewItem }) => {
  // Contagem de itens por status para o gráfico
  const statusCounts = {
    draft: items.filter(item => item.status === "draft").length,
    sent: items.filter(item => item.status === "sent").length,
    published: items.filter(item => item.status === "published").length,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Releases e Reportagens</CardTitle>
      </CardHeader>
      <CardContent>
        <TabsContent value="table" className="mt-0">
          <PressItemsTable items={items} onViewItem={onViewItem} />
        </TabsContent>
        
        <TabsContent value="chart" className="mt-0">
          <div className="h-80 flex items-center justify-center">
            <div className="w-full max-w-md">
              <h3 className="text-center mb-4">Distribuição por Status</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div className="bg-gray-400 h-5 rounded-full" style={{ width: `${(statusCounts.draft / items.length) * 100}%` }}></div>
                  </div>
                  <span className="ml-2 text-sm">Rascunho ({statusCounts.draft})</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div className="bg-blue-400 h-5 rounded-full" style={{ width: `${(statusCounts.sent / items.length) * 100}%` }}></div>
                  </div>
                  <span className="ml-2 text-sm">Enviado ({statusCounts.sent})</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div className="bg-green-400 h-5 rounded-full" style={{ width: `${(statusCounts.published / items.length) * 100}%` }}></div>
                  </div>
                  <span className="ml-2 text-sm">Publicado ({statusCounts.published})</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default PressContentView;
