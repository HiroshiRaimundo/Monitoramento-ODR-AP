
import React from "react";
import { AlertTriangle } from "lucide-react";

interface NoMonitoringsMessageProps {
  responsibleFilter?: string;
}

const NoMonitoringsMessageComponent: React.FC<NoMonitoringsMessageProps> = ({ responsibleFilter }) => {
  return (
    <div className="text-center py-10 border border-dashed border-forest-200 rounded-lg">
      <AlertTriangle size={36} className="mx-auto text-yellow-500 mb-2" />
      <p className="text-forest-700">
        {responsibleFilter 
          ? "Não foram encontrados monitoramentos para este responsável." 
          : "Nenhum item sendo monitorado ainda."}
      </p>
      {responsibleFilter && (
        <p className="text-sm text-forest-600 mt-2">
          Tente selecionar outro responsável ou volte para "Todos".
        </p>
      )}
      {!responsibleFilter && (
        <p className="text-sm text-forest-600 mt-2">
          Utilize o formulário acima para adicionar seu primeiro monitoramento.
        </p>
      )}
    </div>
  );
};

export default NoMonitoringsMessageComponent;
