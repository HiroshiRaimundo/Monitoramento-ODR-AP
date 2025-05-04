
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PressItem } from "../types/pressTypes";

interface PressItemDialogProps {
  item: PressItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const PressItemDialog: React.FC<PressItemDialogProps> = ({ item, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item?.title}</DialogTitle>
          <DialogDescription>
            {item?.type === "release" ? "Release" : "Reportagem"} • {item?.category} • 
            {item?.date ? new Date(item.date).toLocaleDateString('pt-BR') : ''}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-gray-700">{item?.content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PressItemDialog;
