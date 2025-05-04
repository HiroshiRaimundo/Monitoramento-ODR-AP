
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { PressItem } from "../types/pressTypes";

interface PressStatsProps {
  items: PressItem[];
}

const PressStats: React.FC<PressStatsProps> = ({ items }) => {
  const totalReleases = items.filter(item => item.type === "release").length;
  const publishedItems = items.filter(item => item.status === "published").length;
  const pendingItems = items.filter(item => item.status === "draft" || item.status === "sent").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-forest-600">Total de Releases</p>
              <h3 className="text-2xl font-bold">{totalReleases}</h3>
            </div>
            <div className="h-12 w-12 bg-forest-100 rounded-full flex items-center justify-center">
              <FileText size={24} className="text-forest-700" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-forest-600">Publicados</p>
              <h3 className="text-2xl font-bold">{publishedItems}</h3>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText size={24} className="text-green-700" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-forest-600">Pendentes</p>
              <h3 className="text-2xl font-bold">{pendingItems}</h3>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <FileText size={24} className="text-amber-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressStats;
