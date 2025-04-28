
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { PressItem } from "../types/pressTypes";
import StatusBadge from "./StatusBadge";

interface PressItemsTableProps {
  items: PressItem[];
  onViewItem: (item: PressItem) => void;
}

const PressItemsTable: React.FC<PressItemsTableProps> = ({ items, onViewItem }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length > 0 ? (
          items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.type === "release" ? "Release" : "Reportagem"}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => onViewItem(item)}>
                  <Eye size={14} className="mr-1" />
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Nenhum resultado encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PressItemsTable;
