
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReleaseEditor from "./ReleaseEditor";
import NewsEditor from "./NewsEditor";
import MediaContacts from "./MediaContacts";
import PressDashboard from "./PressDashboard";
import { PRESS_CATEGORIES } from "./types/pressTypes";

// Interface para compartilhamento de dados do jornalista entre componentes
export interface Journalist {
  id: string;
  name: string;
  email: string;
  category: string;
  media: string;
  phone?: string;
}

const PressOfficeTab: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  
  // Dados compartilhados dos jornalistas entre os componentes
  const [journalists, setJournalists] = useState<Journalist[]>([
    { id: "1", name: "Carlos Silva", email: "carlos@jornaleco.com.br", category: "Economia", media: "Jornal Econômico", phone: "(11) 98765-4321" },
    { id: "2", name: "Ana Melo", email: "ana@noticiasambiental.com", category: "Meio Ambiente", media: "Notícias Ambientais", phone: "(21) 99876-5432" },
    { id: "3", name: "Roberto Santos", email: "roberto@globomedia.com.br", category: "Política", media: "Globo Media", phone: "(31) 97654-3210" },
    { id: "4", name: "Luiza Costa", email: "luiza@jornaldaamazonia.com", category: "Meio Ambiente", media: "Jornal da Amazônia", phone: "(92) 98765-0987" },
    { id: "5", name: "Fernanda Lima", email: "fernanda@politicahoje.com", category: "Política", media: "Política Hoje", phone: "(61) 99876-1234" },
    { id: "6", name: "Paulo Mendes", email: "paulo@economianews.com.br", category: "Economia", media: "Economia News", phone: "(11) 97654-5678" },
    { id: "7", name: "Marcelo Oliveira", email: "marcelo@portalgerais.com.br", category: "Outros", media: "Portal Gerais", phone: "(31) 98888-7777" },
    { id: "8", name: "Patrícia Santos", email: "patricia@tecnoblog.com.br", category: "Tecnologia", media: "TecnoBlog", phone: "(11) 95555-3333" },
    { id: "9", name: "Ricardo Almeida", email: "ricardo@ciencia.info", category: "Ciência", media: "Ciência Info", phone: "(21) 97777-8888" },
  ]);

  // Função para atualizar a lista de jornalistas
  const updateJournalists = (updatedJournalists: Journalist[]) => {
    setJournalists(updatedJournalists);
  };

  // Função para redirecionar para a aba de criação
  const navigateToCreateRelease = () => {
    setSelectedTab("releases");
  };

  return (
    <div className="grid gap-6">
      <Card className="border-forest-100 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <CardTitle className="text-forest-700 font-poppins text-xl">Assessoria de Imprensa</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="releases" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Releases
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Reportagens
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
                Contatos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <PressDashboard onCreateRelease={navigateToCreateRelease} />
            </TabsContent>

            <TabsContent value="releases">
              <ReleaseEditor journalists={journalists} />
            </TabsContent>

            <TabsContent value="news">
              <NewsEditor journalists={journalists} />
            </TabsContent>

            <TabsContent value="contacts">
              <MediaContacts 
                journalists={journalists}
                onJournalistsUpdate={updateJournalists}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressOfficeTab;
