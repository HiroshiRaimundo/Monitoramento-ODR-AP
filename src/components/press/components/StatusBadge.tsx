
import React from "react";
import { StatusBadgeProps } from "../types/pressTypes";

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let color;
  let text;

  switch (status) {
    case "draft":
      color = "bg-gray-200 text-gray-800";
      text = "Rascunho";
      break;
    case "sent":
      color = "bg-blue-200 text-blue-800";
      text = "Enviado";
      break;
    case "published":
      color = "bg-green-200 text-green-800";
      text = "Publicado";
      break;
    default:
      color = "bg-gray-200 text-gray-800";
      text = status;
  }

  return (
    <span className={`${color} px-2 py-1 rounded-full text-xs font-medium`}>
      {text}
    </span>
  );
};

export default StatusBadge;
