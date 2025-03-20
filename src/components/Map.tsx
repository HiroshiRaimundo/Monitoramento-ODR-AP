
import React, { useState, useEffect, useCallback } from 'react';
import MapContainer from './map/MapContainer';
import StudyDetail from './map/StudyDetail';
import AddStudyForm from './AddStudyForm';
import { MapPoint } from '@/types/map';

interface MapProps {
  points: MapPoint[];
  centerOnAmapa?: boolean;
  onSelectPoint?: (point: MapPoint) => void;
}

const Map: React.FC<MapProps> = ({ 
  points = [], 
  centerOnAmapa = true, 
  onSelectPoint
}) => {
  const [selectedStudies, setSelectedStudies] = useState<MapPoint[]>([]);
  const [validPoints, setValidPoints] = useState<MapPoint[]>([]);
  const [allPoints, setAllPoints] = useState<MapPoint[]>([]);

  // Filtrar pontos válidos (com coordenadas)
  useEffect(() => {
    const filtered = points.filter(point => 
      point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2 &&
      !isNaN(point.coordinates[0]) && 
      !isNaN(point.coordinates[1])
    );
    
    console.log("Map: Filtrando pontos válidos", points.length, "->", filtered.length);
    console.log("Map: Pontos válidos filtrados:", filtered);
    
    // Manter pontos existentes e adicionar novos
    setAllPoints(prevPoints => {
      // Combinar pontos atuais com novos, evitando duplicatas por ID
      const existingIds = new Set(prevPoints.map(p => p.id));
      const newPoints = filtered.filter(p => !existingIds.has(p.id));
      const mergedPoints = [...prevPoints, ...newPoints];
      
      console.log("Map: Combinando pontos anteriores", prevPoints.length, 
                 "com novos pontos", newPoints.length, 
                 "total:", mergedPoints.length);
      
      return mergedPoints;
    });
  }, [points]);

  // Atualizar validPoints quando allPoints mudar
  useEffect(() => {
    const filtered = allPoints.filter(point => 
      point.coordinates && 
      Array.isArray(point.coordinates) && 
      point.coordinates.length === 2 &&
      !isNaN(point.coordinates[0]) && 
      !isNaN(point.coordinates[1])
    );
    
    console.log("Map: Validando pontos do allPoints", allPoints.length, "->", filtered.length);
    setValidPoints(filtered);
  }, [allPoints]);

  const handleSelectPoint = useCallback((point: MapPoint) => {
    // Se onSelectPoint foi fornecido, use-o
    if (onSelectPoint) {
      onSelectPoint(point);
      return;
    }
    
    // Se não, use a lógica interna
    // Se o ponto já estiver selecionado, não adicione novamente
    setSelectedStudies(prev => {
      if (prev.some(study => study.id === point.id)) {
        return prev;
      }
      return [...prev, point];
    });
  }, [onSelectPoint]);

  const removeStudyFromList = useCallback((studyId: string) => {
    setSelectedStudies(prev => prev.filter(study => study.id !== studyId));
  }, []);

  const handleAddStudy = useCallback((newPoint: MapPoint) => {
    console.log("Map: Adicionando novo estudo:", newPoint.title);
    
    setAllPoints(prev => {
      // Verificar se o ponto já existe
      const exists = prev.some(p => p.id === newPoint.id);
      if (exists) {
        console.log("Map: Ponto já existe, atualizando");
        return prev.map(p => p.id === newPoint.id ? newPoint : p);
      }
      // Adicionar novo ponto
      console.log("Map: Adicionando novo ponto ao estado");
      return [...prev, newPoint];
    });
  }, []);
  
  // Log para depuração
  console.log("Map: Renderizando com", validPoints.length, "pontos válidos");
  
  return (
    <div className="flex flex-col gap-4">
<<<<<<< HEAD
      {!onSelectPoint && <AddStudyForm onAddStudy={handleAddStudy} />}
      <div className="border border-forest-100 rounded-lg overflow-hidden shadow-md">
        <MapContainer 
          points={validPoints} 
          onSelectPoint={handleSelectPoint}
          centerOnAmapa={centerOnAmapa}
        />
      </div>
      
      {!onSelectPoint && selectedStudies.length > 0 && (
=======
      {/* Mapa com altura fixa para melhor visualização */}
      <MapContainer 
        points={points} 
        onSelectPoint={handleSelectPoint} 
      />
      
      {/* Lista de estudos selecionados */}
      {selectedStudies.length > 0 && (
>>>>>>> ae6a1a77e437a83ff41b625f5f08ccc6f18d3937
        <StudyDetail 
          selectedStudies={selectedStudies}
          onRemoveStudy={removeStudyFromList}
        />
      )}
    </div>
  );
};

export default Map;
