
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo .htaccess de origem
const sourceFile = path.join(__dirname, 'dist-htaccess');

// Caminho para o arquivo .htaccess de destino na pasta dist
const destFile = path.join(__dirname, 'dist', '.htaccess');

// Copiar o arquivo
try {
  const content = fs.readFileSync(sourceFile, 'utf8');
  fs.writeFileSync(destFile, content, 'utf8');
  console.log('Arquivo .htaccess copiado com sucesso para a pasta dist!');
} catch (error) {
  console.error('Erro ao copiar o arquivo .htaccess:', error);
}
