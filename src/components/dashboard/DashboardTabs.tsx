
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, Database, Globe, Code, FileText, TableProperties } from "lucide-react";
import VisualEditorTab from "./tabs/VisualEditorTab";
import SqlEditorTab from "./tabs/SqlEditorTab";
import SemanticLayerTab from "./tabs/SemanticLayerTab";
import ApiTab from "./tabs/ApiTab";
import ReportsTab from "./tabs/ReportsTab";

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
      <TabsList className="grid grid-cols-6 mb-6 bg-green-100/70">
        <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden md:inline">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="visual-editor" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">Editor Visual</span>
        </TabsTrigger>
        <TabsTrigger value="sql-editor" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <Database className="h-4 w-4" />
          <span className="hidden md:inline">Editor SQL</span>
        </TabsTrigger>
        <TabsTrigger value="semantic-layer" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <TableProperties className="h-4 w-4" />
          <span className="hidden md:inline">Camada Semântica</span>
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <Code className="h-4 w-4" />
          <span className="hidden md:inline">API</span>
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-green-200 data-[state=active]:text-green-900">
          <FileText className="h-4 w-4" />
          <span className="hidden md:inline">Relatórios</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        {dashboardContent}
      </TabsContent>

      <TabsContent value="visual-editor">
        <VisualEditorTab />
      </TabsContent>

      <TabsContent value="sql-editor">
        <SqlEditorTab />
      </TabsContent>

      <TabsContent value="semantic-layer">
        <SemanticLayerTab />
      </TabsContent>

      <TabsContent value="api">
        <ApiTab />
      </TabsContent>

      <TabsContent value="reports">
        <ReportsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
