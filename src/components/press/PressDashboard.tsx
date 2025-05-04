
import React, { useState } from "react";
import PressHeader from "./dashboard/PressHeader";
import PressCharts from "./dashboard/PressCharts";
import PressStats from "./dashboard/PressStats";
import PressFilters from "./dashboard/PressFilters";
import PressContentView from "./dashboard/PressContentView";
import PressItemDialog from "./dashboard/PressItemDialog";
import { mockPressItems } from "./dashboard/mockData";
import { PressItem } from "./types/pressTypes";

const PressDashboard: React.FC<{ onCreateRelease: () => void }> = ({ onCreateRelease }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [viewType, setViewType] = useState("table");
  const [selectedItem, setSelectedItem] = useState<PressItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewItem = (item: PressItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const filteredItems = mockPressItems.filter(item => {
    return (
      (searchTerm === "" || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === "todos" || item.status === selectedStatus) &&
      (selectedCategory === "todas" || item.category === selectedCategory)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <PressHeader onCreateRelease={onCreateRelease} />
      
      {/* View Item Dialog */}
      <PressItemDialog 
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      {/* Statistics Cards */}
      <PressCharts 
        items={mockPressItems}
        onViewItem={handleViewItem}
      />

      {/* Summary Stats */}
      <PressStats items={mockPressItems} />

      {/* Filters */}
      <PressFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        viewType={viewType}
        setViewType={setViewType}
        items={mockPressItems}
      />

      {/* Main Content */}
      <PressContentView 
        items={filteredItems}
        viewType={viewType}
        onViewItem={handleViewItem}
      />
    </div>
  );
};

export default PressDashboard;
