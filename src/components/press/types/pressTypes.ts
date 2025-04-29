
export interface PressItem {
  id: string;
  title: string;
  type: "release" | "news";
  category: string;
  status: "draft" | "sent" | "published";
  date: string;
  content?: string;
}

export interface StatusBadgeProps {
  status: string;
}

export interface PublicationStatusChartProps {
  items: PressItem[];
}

export interface PublishedItemsListProps {
  items: PressItem[];
  onViewItem: (item: PressItem) => void;
}

export interface PressDashboardProps {
  onCreateRelease: () => void;
}

// Lista comum de categorias para toda a aplicação
export const PRESS_CATEGORIES = [
  "Meio Ambiente",
  "Economia",
  "Política",
  "Social",
  "Internacional",
  "Ciência",
  "Tecnologia",
  "Educação",
  "Outros" // Nova categoria adicionada
];
