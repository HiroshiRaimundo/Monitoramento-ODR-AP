
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import PressOfficeTab from "@/components/press/PressOfficeTab";

interface PressTabContentProps {
  isAuthenticated: boolean;
}

const PressTabContent: React.FC<PressTabContentProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) return null;
  
  return (
    <TabsContent value="pressOffice">
      <PressOfficeTab />
    </TabsContent>
  );
};

export default PressTabContent;
