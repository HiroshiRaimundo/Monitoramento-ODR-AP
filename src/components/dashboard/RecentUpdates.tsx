
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface RecentUpdate {
  id: string;
  site: string;
  date: string;
  status: "success" | "error" | "warning" | "pending";
}

interface RecentUpdatesProps {
  updates: RecentUpdate[];
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ updates }) => {
  // Status formatter
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Sucesso</Badge>;
      case "error":
        return <Badge className="bg-red-500">Erro</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Atenção</Badge>;
      default:
        return <Badge className="bg-gray-500">Pendente</Badge>;
    }
  };

  return (
    <Card className="border-forest-100 shadow-sm mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-forest-700 text-base font-medium flex items-center gap-2">
          <Activity size={16} className="text-forest-600" />
          Atualizações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-forest-100">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-forest-600 uppercase tracking-wider">Site</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-forest-600 uppercase tracking-wider">Data</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-forest-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-forest-100">
              {updates.map((update) => (
                <tr key={update.id} className="hover:bg-forest-50/50">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-forest-700">{update.site}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-forest-600">
                    {new Date(update.date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    {getStatusBadge(update.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentUpdates;
