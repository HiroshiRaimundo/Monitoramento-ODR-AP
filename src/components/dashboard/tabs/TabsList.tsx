
import React from "react";
import { TabsList as UITabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsListProps {
  isAuthenticated: boolean;
}

const TabsList: React.FC<TabsListProps> = ({ isAuthenticated }) => {
  return (
    <UITabsList className="grid grid-cols-5 w-full bg-forest-50 p-1">
      <TabsTrigger value="publico" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
        Público
      </TabsTrigger>
      {isAuthenticated && (
        <TabsTrigger value="gerenciamento" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Gerenciamento
        </TabsTrigger>
      )}
      {isAuthenticated && (
        <TabsTrigger value="analise" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Análise
        </TabsTrigger>
      )}
      {isAuthenticated && (
        <TabsTrigger value="registroEstudos" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Registro de Estudos
        </TabsTrigger>
      )}
      {isAuthenticated && (
        <TabsTrigger value="pressOffice" className="data-[state=active]:bg-forest-600 data-[state=active]:text-white">
          Assessoria de Imprensa
        </TabsTrigger>
      )}
    </UITabsList>
  );
};

export default TabsList;
