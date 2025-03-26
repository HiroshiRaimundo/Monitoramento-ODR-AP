
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReleaseEditor from "./ReleaseEditor";
import NewsEditor from "./NewsEditor";
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
          <Tabs defaultValue="releases" className="w-full">
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="releases" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Releases
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Reportagens
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Contatos de Mídia
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Clipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="releases">
              <ReleaseEditor />
            </TabsContent>

            <TabsContent value="news">
              <NewsEditor />
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
