
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div 
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-forest-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" 
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Carregando...
        </span>
      </div>
      <p className="mt-2 text-forest-600">Carregando monitoramentos...</p>
    </div>
  );
};

export default LoadingIndicator;
