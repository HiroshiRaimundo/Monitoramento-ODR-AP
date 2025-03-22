
// Shared types for research functionality
export interface ResearchStudy {
  id: string;
  title: string;
  author: string;
  coAuthors: string;
  summary: string;
  repositoryUrl: string;
  location: string;
  coordinates: [number, number];
  type: string; // Changed from union type to string to allow custom categories
}

export type ResearchStudyFormData = Omit<ResearchStudy, "id" | "coordinates">;
