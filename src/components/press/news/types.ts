
export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  status: "draft" | "sent" | "published";
  media: Array<{type: string, url: string}>;
}
