
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, AlertTriangle, Clock, AlertCircle } from "lucide-react";
import { RecentUpdate } from "./types/dashboardTypes";

interface RecentUpdatesProps {
  updates: RecentUpdate[];
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ updates }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <ClipboardCheck className="text-green-500" size={16} />;
      case "error":
        return <AlertCircle className="text-red-500" size={16} />;
      case "warning":
        return <AlertTriangle className="text-amber-500" size={16} />;
      case "pending":
        return <Clock className="text-blue-500" size={16} />;
      default:
        return <ClipboardCheck className="text-green-500" size={16} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500 bg-green-50";
      case "error":
        return "text-red-500 bg-red-50";
      case "warning":
        return "text-amber-500 bg-amber-50";
      case "pending":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-green-500 bg-green-50";
    }
  };

  return (
    <Card className="border-forest-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-forest-700 text-base font-medium">Atualizações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="flex items-start justify-between p-3 bg-forest-50/50 rounded-md">
              <div className="text-left">
                <h4 className="text-sm font-medium text-forest-700 flex items-center gap-2">
                  {getStatusIcon(update.status)}
                  {update.title || update.site}
                </h4>
                <span className="text-xs text-forest-600 mt-1 block">
                  {update.description && <span className="block mb-1">{update.description}</span>}
                  {new Date(update.date).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                  update.status
                )}`}
              >
                {update.status === "success"
                  ? "Sucesso"
                  : update.status === "error"
                  ? "Erro"
                  : update.status === "warning"
                  ? "Alerta"
                  : "Pendente"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentUpdates;
