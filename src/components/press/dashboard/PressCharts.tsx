
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PublicationStatusChart from "../components/PublicationStatusChart";
import PublishedItemsList from "../components/PublishedItemsList";
import { PressItem } from "../types/pressTypes";

interface PressChartsProps {
  items: PressItem[];
  onViewItem: (item: PressItem) => void;
}

const PressCharts: React.FC<PressChartsProps> = ({ items, onViewItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-6">
          <PublicationStatusChart items={items} />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <PublishedItemsList items={items} onViewItem={onViewItem} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PressCharts;
