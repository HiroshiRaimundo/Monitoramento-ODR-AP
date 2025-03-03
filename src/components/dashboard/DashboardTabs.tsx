
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, Globe } from "lucide-react";
import VisualEditorTab from "./tabs/VisualEditorTab";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  dashboardContent: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  activeTab, 
  setActiveTab,
  dashboardContent
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-6 bg-green-100/70">
        <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden md:inline">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="visual-editor" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">Editor Visual</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        {dashboardContent}
      </TabsContent>

      <TabsContent value="visual-editor">
        <VisualEditorTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
