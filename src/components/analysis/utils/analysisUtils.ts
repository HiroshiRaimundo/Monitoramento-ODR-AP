
import React from "react";

export interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  frequency: string;
  category: string;
}

export const downloadScript = (item: MonitoringItem, type: string, templates: Record<string, (url: string, name: string) => string>) => {
  let filename = '';
  let content = '';
  let fileType = '';
  
  switch (type) {
    case 'pandas':
      filename = `${item.name.replace(/ /g, "_")}_analysis.py`;
      content = templates.pandas(item.url, item.name);
      fileType = 'text/plain';
      break;
    case 'jupyter':
      filename = `${item.name.replace(/ /g, "_")}_notebook.ipynb`;
      content = templates.jupyter(item.url, item.name);
      fileType = 'text/plain';
      break;
    case 'powerbi':
      filename = `${item.name.replace(/ /g, "_")}_powerbi.pq`;
      content = templates.powerbi(item.url, item.name);
      fileType = 'text/plain';
      break;
    default:
      return;
  }
  
  const blob = new Blob([content], { type: fileType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
