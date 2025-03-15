
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InterpretationGuide: React.FC = () => {
  return (
    <Card className="border-forest-100 shadow-md overflow-hidden mt-4">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins text-lg">Como Interpretar os Dados</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-medium text-forest-700">Sobre os Estudos</h3>
            <p className="text-sm text-forest-600 text-justify">
              Os estudos apresentados representam pesquisas acadêmicas, projetos do PPGDAS e iniciativas de ONGs focadas na região amazônica.
              Cada estudo é categorizado e georreferenciado para facilitar a visualização no mapa interativo.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-forest-700">Metodologia</h3>
            <p className="text-sm text-forest-600 text-justify">
              Os dados são coletados através de parcerias com instituições de pesquisa, órgãos governamentais e monitoramento de fontes oficiais.
              A atualização é realizada periodicamente conforme novas informações são disponibilizadas.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterpretationGuide;
