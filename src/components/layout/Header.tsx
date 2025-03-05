
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRound, LogIn, LogOut, Home, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeaderProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated, 
  onLoginClick, 
  onLogoutClick 
}) => {
  return (
    <header className="flex justify-between items-center mb-8 pb-4 border-b border-forest-200">
      {/* Home icon with enhanced styling */}
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a href="https://observatório.org" target="_blank" rel="noopener noreferrer" className="flex items-center text-forest-600 hover:text-forest-500 transition-colors">
                <Home size={24} className="stroke-forest-600" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ir para o site do Observatório</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="text-center flex-1 flex justify-center">
        <h1 className="text-lg md:text-xl font-semibold text-forest-600 tracking-wide">
          Monitoramento e Análise de Indicadores Regionais
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        {isAuthenticated && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link to="/ajuda">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-forest-200 hover:bg-forest-50 hover:text-forest-700">
                    <HelpCircle size={16} />
                    <span className="hidden md:inline">Ajuda</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Acessar a página de ajuda</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {isAuthenticated ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" onClick={onLogoutClick} className="flex items-center gap-2 border-forest-200 hover:bg-forest-50 hover:text-forest-700">
                  <UserRound size={18} className="text-forest-600" />
                  <span className="hidden md:inline">Administrador</span>
                  <LogOut size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sair do sistema</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" onClick={onLoginClick} className="flex items-center gap-2 border-forest-200 hover:bg-forest-50 hover:text-forest-700">
                  <LogIn size={18} />
                  <span className="hidden md:inline">Entrar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fazer login no sistema</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </header>
  );
};

export default Header;
