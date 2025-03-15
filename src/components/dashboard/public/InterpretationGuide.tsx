import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InterpretationGuide: React.FC = () => {
  return (
    <Card className="border-forest-100 shadow-md overflow-hidden mt-4">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700 font-poppins text-lg"></CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Conteúdo removido conforme solicitado */}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterpretationGuide;
