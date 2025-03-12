
/**
 * Utility functions for chart data mapping and formatting
 */

// Map initialMockData to SystemUpdatesChart format
export function mapToSystemUpdates(data: { name: string; estudos: number; monitoramentos: number; atualizacoes: number; }[]) {
  return data.map(item => ({
    name: item.name,
    updates: item.atualizacoes
  }));
}

// Ensure status is one of the allowed enum values
export function mapToStatusEnum(status: string): "error" | "success" | "warning" | "pending" {
  switch (status.toLowerCase()) {
    case 'error':
      return "error";
    case 'success':
      return "success";
    case 'warning':
      return "warning";
    case 'pending':
    default:
      return "pending";
  }
}
