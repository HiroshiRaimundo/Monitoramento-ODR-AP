
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PressDashboard from "./PressDashboard";
import ReleaseCreator from "./ReleaseCreator";
import MediaContacts from "./MediaContacts";
import MediaMonitoring from "./MediaMonitoring";

const PressOfficeTab: React.FC = () => {
  return (
    <div className="grid gap-6">
      <Card className="border-forest-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <CardTitle className="text-forest-700 font-poppins text-xl">Assessoria de Imprensa</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="creator" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Criação de Conteúdo
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Contatos de Mídia
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Clipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <PressDashboard />
            </TabsContent>

            <TabsContent value="creator">
              <ReleaseCreator />
            </TabsContent>

            <TabsContent value="contacts">
              <MediaContacts />
            </TabsContent>

            <TabsContent value="monitoring">
              <MediaMonitoring />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressOfficeTab;
