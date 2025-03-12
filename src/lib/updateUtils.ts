
import { mapToStatusEnum } from "./chartUtils";

export interface RecentUpdate {
  id: string;
  site: string;
  date: string;
  status: "error" | "success" | "warning" | "pending";
}

export function mapToRecentUpdates(updates: { id: string; site: string; date: string; status: string; }[]): RecentUpdate[] {
  return updates.map(update => ({
    id: update.id,
    site: update.site,
    date: update.date,
    status: mapToStatusEnum(update.status)
  }));
}
