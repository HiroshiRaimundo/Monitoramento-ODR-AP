
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Journalist } from "../PressOfficeTab";

interface SendNewsDialogProps {
  showSendDialog: boolean;
  setShowSendDialog: (show: boolean) => void;
  currentNews: {
    id: string;
    title: string;
    category: string;
  } | null;
  availableJournalists: Journalist[];
  selectedJournalists: string[];
  customEmail: string;
  setCustomEmail: (email: string) => void;
  toggleJournalist: (id: string) => void;
  selectAllJournalists: () => void;
  handleSendNews: () => void;
}

const SendNewsDialog: React.FC<SendNewsDialogProps> = ({
  showSendDialog,
  setShowSendDialog,
  currentNews,
  availableJournalists,
  selectedJournalists,
  customEmail,
  setCustomEmail,
  toggleJournalist,
  selectAllJournalists,
  handleSendNews
}) => {
  return (
    <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Enviar Reportagem: {currentNews?.title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Jornalistas da categoria {currentNews?.category}</h3>
            <Button variant="outline" size="sm" onClick={selectAllJournalists}>
              {selectedJournalists.length === availableJournalists.length 
                ? "Desmarcar Todos" 
                : "Selecionar Todos"}
            </Button>
          </div>
          
          <div className="max-h-60 overflow-y-auto border rounded-md p-2">
            {availableJournalists.length > 0 ? (
              availableJournalists.map(journalist => (
                <div key={journalist.id} className="flex items-start space-x-2 py-2 border-b last:border-0">
                  <Checkbox 
                    id={`journalist-${journalist.id}`}
                    checked={selectedJournalists.includes(journalist.id)} 
                    onCheckedChange={() => toggleJournalist(journalist.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor={`journalist-${journalist.id}`} className="font-medium">
                      {journalist.name}
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      {journalist.email} - {journalist.media}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-sm text-muted-foreground">
                Nenhum jornalista cadastrado nesta categoria.
              </p>
            )}
          </div>
          
          <div className="mt-4">
            <Label htmlFor="custom-email">Adicionar outros e-mails (separados por vírgula)</Label>
            <Input 
              id="custom-email"
              placeholder="ex: email1@exemplo.com, email2@exemplo.com" 
              value={customEmail}
              onChange={e => setCustomEmail(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowSendDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleSendNews}
            disabled={selectedJournalists.length === 0 && !customEmail}
            className="flex items-center gap-2"
          >
            <Send size={16} />
            Confirmar Envio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendNewsDialog;
