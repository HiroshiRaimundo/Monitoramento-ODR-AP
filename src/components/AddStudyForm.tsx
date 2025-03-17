import { useState } from 'react';
import { geocodeLocation } from '../utils/geocoder';
import { MapPoint } from '../types/map';

interface AddStudyFormProps {
  onAddStudy: (study: MapPoint) => void;
}

const AddStudyForm: React.FC<AddStudyFormProps> = ({ onAddStudy }) => {
  const municipalities = [
    "Amapá", "Calçoene", "Cutias", "Ferreira Gomes", "Itaubal",
    "Laranjal do Jari", "Macapá", "Mazagão", "Oiapoque",
    "Pedra Branca do Amapari", "Porto Grande", "Pracuúba",
    "Santana", "Serra do Navio", "Tartarugalzinho", "Vitória do Jari"
  ];

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    location: municipalities[0], // Definindo o município padrão
    type: 'artigo' as 'artigo' | 'dissertacao' | 'tese' | 'livros' | 'ebooks' | 'outro',
    summary: '',
    repositoryUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const coordinates = await geocodeLocation(formData.location); // Aqui, a localização deve ser validada

    console.log('Dados do formulário:', formData);
    console.log('Coordenadas:', coordinates);

    if (coordinates) {
      const newStudy: MapPoint = {
        id: Date.now().toString(),
        title: formData.title,
        author: formData.author,
        type: formData.type,
        coordinates,
        summary: formData.summary,
        location: formData.location,
        repositoryUrl: formData.repositoryUrl
      };
      
      onAddStudy(newStudy);
      setFormData({
        title: '',
        author: '',
        location: municipalities[0], // Resetando para o município padrão
        type: 'artigo' as 'artigo' | 'dissertacao' | 'tese' | 'livros' | 'ebooks' | 'outro',
        summary: '',
        repositoryUrl: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulário de entrada aqui */}
    </form>
  );
};

export default AddStudyForm;
