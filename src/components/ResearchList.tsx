
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronLeft, ChevronRight, FileText, MapPin, User } from "lucide-react";
import { ResearchStudy } from "@/types/research";

interface ResearchListProps {
  studies: ResearchStudy[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const ResearchList: React.FC<ResearchListProps> = ({ studies, onDelete, isLoading = false }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate pagination values
  const totalPages = Math.ceil(studies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudies = studies.slice(indexOfFirstItem, indexOfLastItem);
  
  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (isLoading) {
    return (
      <Card className="border-forest-100 shadow-md h-full">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <CardTitle className="text-forest-700">Estudos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-forest-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
            </div>
            <p className="mt-2 text-forest-600">Carregando estudos...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (studies.length === 0) {
    return (
      <Card className="border-forest-100 shadow-md h-full">
        <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
          <CardTitle className="text-forest-700">Estudos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-forest-600 text-center py-8">Nenhum estudo cadastrado.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-forest-100 shadow-md h-full">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white">
        <CardTitle className="text-forest-700">Estudos Cadastrados</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {currentStudies.map((study) => (
            <li key={study.id} className="border border-forest-100 p-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200 bg-white">
              <div className="flex justify-between">
                <h3 className="font-medium text-forest-800 flex items-center">
                  <FileText size={16} className="mr-2 text-forest-600" />
                  {truncateText(study.title, 40)}
                </h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive hover:bg-red-50" 
                  onClick={() => onDelete(study.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <p className="text-sm text-forest-700 mt-2">
                <User size={14} className="inline mr-1 text-forest-500" />
                <span className="font-medium">Autor:</span> {truncateText(study.author, 30)}
              </p>
              <p className="text-sm text-forest-700 mt-1">
                <MapPin size={14} className="inline mr-1 text-forest-500" />
                <span className="font-medium">Local:</span> {truncateText(study.location, 25)}
              </p>
              <p className="text-sm text-forest-700 mt-1">
                <span className="font-medium">Tipo:</span> 
                <span className="ml-1 px-2 py-0.5 bg-forest-50 text-forest-600 rounded-full text-xs">
                  {study.type}
                </span>
              </p>
            </li>
          ))}
        </ul>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPrevPage} 
              disabled={currentPage === 1}
              className="border-forest-200 hover:bg-forest-50 hover:text-forest-700"
            >
              <ChevronLeft size={16} />
            </Button>
            
            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === page 
                      ? "bg-forest-600 hover:bg-forest-700 text-white" 
                      : "border-forest-200 hover:bg-forest-50 hover:text-forest-700"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages}
              className="border-forest-200 hover:bg-forest-50 hover:text-forest-700"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResearchList;
