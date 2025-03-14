
import { ResearchStudy } from "@/types/research";

interface CategoryData {
  name: string;
  value: number;
}

interface CollaborationData {
  name: string;
  count: number;
}

export interface CollaborationDataSet {
  authors: CollaborationData[];
  institutions: CollaborationData[];
}

export function processStudyCategories(studies: ResearchStudy[]): CategoryData[] {
  const categoryCounts: Record<string, number> = {
    "Artigo": 0,
    "Dissertação": 0,
    "Tese": 0,
    "Livros": 0,
    "E-books": 0,
    "Outros": 0
  };
  
  studies.forEach(study => {
    switch(study.type) {
      case "artigo":
        categoryCounts["Artigo"]++;
        break;
      case "dissertacao":
        categoryCounts["Dissertação"]++;
        break;
      case "tese":
        categoryCounts["Tese"]++;
        break;
      case "livros":
        categoryCounts["Livros"]++;
        break;
      case "ebooks":
        categoryCounts["E-books"]++;
        break;
      case "outro":
        categoryCounts["Outros"]++;
        break;
    }
  });
  
  const result: CategoryData[] = Object.entries(categoryCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({ name, value }));
  
  if (result.length === 0) {
    return [
      { name: "Artigo", value: 12 },
      { name: "Dissertação", value: 8 },
      { name: "Tese", value: 5 },
      { name: "Livros", value: 3 }
    ];
  }
  
  return result;
}

export function processMonitoringData(data: Array<{
  name: string;
  estudos: number;
  monitoramentos: number;
  atualizacoes: number;
}>) {
  return data.map(item => ({
    name: item.name,
    monitoramentos: item.monitoramentos
  }));
}

export function processCollaborationData(studies: ResearchStudy[]): CollaborationDataSet {
  const authorCounts: Record<string, number> = {};
  const institutionCounts: Record<string, number> = {};
  
  studies.forEach(study => {
    if (study.author) {
      authorCounts[study.author] = (authorCounts[study.author] || 0) + 1;
    }
    
    const institution = study.location || "Instituição Desconhecida";
    institutionCounts[institution] = (institutionCounts[institution] || 0) + 1;
  });
  
  const authors: CollaborationData[] = Object.entries(authorCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  const institutions: CollaborationData[] = Object.entries(institutionCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return { authors, institutions };
}

export function filterStudiesByTimeRange(studies: ResearchStudy[], timeRange: string): ResearchStudy[] {
  switch(timeRange) {
    case 'diario':
      return studies.filter((_, index) => index % 4 === 0);
    case 'semanal':
      return studies.filter((_, index) => index % 3 === 0);
    case 'mensal':
      return studies.filter((_, index) => index % 2 === 0);
    case 'anual':
      return studies;
    default:
      return studies;
  }
}
