
export interface MapPoint {
  id: string;
  title: string;
  author: string;
  location: string;
  coordinates: [number, number];
  repositoryUrl?: string;
  summary?: string;
  type?: string; // Changed from union type to string to match ResearchStudy
}
