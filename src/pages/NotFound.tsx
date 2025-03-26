
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft, RefreshCw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Tentativa de acesso a rota inexistente:",
      location.pathname,
      { 
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    );
  }, [location.pathname]);

  const goBack = () => {
    window.history.back();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold text-forest-700 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! Página não encontrada
        </p>
        <p className="text-gray-500 mb-6">
          O caminho <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code> não existe ou não está acessível.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <Button 
            variant="secondary"
            className="flex items-center justify-center gap-2"
            onClick={refreshPage}
          >
            <RefreshCw size={16} />
            Atualizar
          </Button>
          <Button 
            className="flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-700"
            asChild
          >
            <a href="/">
              <HomeIcon size={16} />
              Página Inicial
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
