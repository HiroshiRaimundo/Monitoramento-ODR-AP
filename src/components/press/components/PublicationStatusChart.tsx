
import React from "react";
import { PublicationStatusChartProps } from "../types/pressTypes";

const PublicationStatusChart: React.FC<PublicationStatusChartProps> = ({ items }) => {
  const publishedCount = items.filter(item => item.status === "published").length;
  const sentCount = items.filter(item => item.status === "sent").length;
  const draftCount = items.filter(item => item.status === "draft").length;
  const total = items.length;

  const publishedPercent = (publishedCount / total) * 100;
  const sentPercent = (sentCount / total) * 100;
  const draftPercent = (draftCount / total) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium">Status de Publicação</h3>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-xs">Publicado</span>
          <span className="w-3 h-3 bg-blue-500 rounded-full ml-2"></span>
          <span className="text-xs">Enviado</span>
          <span className="w-3 h-3 bg-gray-500 rounded-full ml-2"></span>
          <span className="text-xs">Rascunho</span>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-24 text-xs">Publicados</div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: `${publishedPercent}%` }}></div>
          </div>
          <div className="w-10 text-xs font-semibold">{publishedCount}</div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-24 text-xs">Enviados</div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${sentPercent}%` }}></div>
          </div>
          <div className="w-10 text-xs font-semibold">{sentCount}</div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-24 text-xs">Rascunhos</div>
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div className="bg-gray-500 h-4 rounded-full" style={{ width: `${draftPercent}%` }}></div>
          </div>
          <div className="w-10 text-xs font-semibold">{draftCount}</div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#e9e9e9" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#22c55e" strokeWidth="3" 
              strokeDasharray={`${publishedPercent} ${100-publishedPercent}`} strokeDashoffset="25" transform="rotate(-90 18 18)" />
            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="3"
              strokeDasharray={`${sentPercent} ${100-sentPercent}`} strokeDashoffset={`${25 - publishedPercent}`} transform="rotate(-90 18 18)" />
            <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#6b7280" strokeWidth="3"
              strokeDasharray={`${draftPercent} ${100-draftPercent}`} strokeDashoffset={`${25 - publishedPercent - sentPercent}`} transform="rotate(-90 18 18)" />
            <text x="18" y="18" fontFamily="Verdana" fontSize="5" textAnchor="middle" alignmentBaseline="middle">
              <tspan x="18" y="17" fontWeight="bold" fontSize="8">{total}</tspan>
              <tspan x="18" y="23" fontSize="3">TOTAL</tspan>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PublicationStatusChart;
