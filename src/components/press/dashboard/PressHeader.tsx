
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PressHeaderProps {
  onCreateRelease: () => void;
}

const PressHeader: React.FC<PressHeaderProps> = ({ onCreateRelease }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h2 className="text-2xl font-semibold text-forest-700">Dashboard da Assessoria</h2>
      <Button className="flex items-center gap-2" onClick={onCreateRelease}>
        <Plus size={16} />
        Novo Release
      </Button>
    </div>
  );
};

export default PressHeader;
