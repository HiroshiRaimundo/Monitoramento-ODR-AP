
import React, { useState } from "react";
import { ResearchStudy } from "@/types/research";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, MapPin, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface StudyListProps {
  studies: ResearchStudy[];
}

const StudyList: React.FC<StudyListProps> = ({ studies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(studies.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudies = studies.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch (error) {
      return "Data indisponível";
    }
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Card className="h-full border-forest-100">
      <CardHeader className="bg-gradient-to-r from-forest-50 to-white py-3">
        <CardTitle className="text-forest-700 text-lg">Estudos Cadastrados</CardTitle>
      </CardHeader>
      <CardContent className="p-4 max-h-[600px] overflow-auto">
        {studies.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Nenhum estudo cadastrado.
          </p>
        ) : (
          <>
            <ul className="space-y-3">
              {currentStudies.map((study) => (
                <li key={study.id} className="border border-forest-100 p-3 rounded-md shadow-sm hover:shadow-md transition-all duration-200 bg-white">
                  <h3 className="font-medium text-forest-800 flex items-center">
                    <FileText size={14} className="mr-1 text-forest-600 flex-shrink-0" />
                    {truncateText(study.title, 50)}
                  </h3>
                  <div className="mt-2 text-sm text-forest-700 space-y-1">
                    <p className="flex items-center">
                      <User size={12} className="mr-1 text-forest-500 flex-shrink-0" />
                      <span className="font-medium">Autor:</span> 
                      <span className="ml-1">{truncateText(study.author, 25)}</span>
                    </p>
                    <p className="flex items-center">
                      <MapPin size={12} className="mr-1 text-forest-500 flex-shrink-0" />
                      <span className="font-medium">Local:</span> 
                      <span className="ml-1">{study.location}</span>
                    </p>
                    <p className="flex items-center">
                      <Calendar size={12} className="mr-1 text-forest-500 flex-shrink-0" />
                      <span className="font-medium">Tipo:</span>
                      <span className="ml-1 px-1.5 py-0.5 bg-forest-50 text-forest-600 rounded-full text-xs">
                        {study.type}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={prevPage} 
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`} 
                    />
                  </PaginationItem>
                  
                  {/* Generate page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                    // Calculate which page numbers to show
                    let pageNumber: number;
                    if (totalPages <= 5) {
                      pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
                    }

                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink 
                          onClick={() => paginate(pageNumber)}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={nextPage} 
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`} 
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StudyList;
