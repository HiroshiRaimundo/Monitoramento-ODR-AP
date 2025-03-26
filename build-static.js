
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cores para saída no console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`${colors.blue}=== Iniciando build otimizado para Netlify ===${colors.reset}`);

// Passo 1: Executar o build do Vite
try {
  console.log(`${colors.yellow}Executando build do Vite...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}Build concluído com sucesso!${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Erro ao executar o build:${colors.reset}`, error);
  process.exit(1);
}

// Passo 2: Copiar o arquivo _redirects para a pasta dist se não existir
try {
  const redirectsPath = path.join(__dirname, 'dist', '_redirects');
  if (!fs.existsSync(redirectsPath)) {
    console.log(`${colors.yellow}Copiando arquivo _redirects para a pasta dist...${colors.reset}`);
    fs.copyFileSync(
      path.join(__dirname, '_redirects'),
      redirectsPath
    );
    console.log(`${colors.green}Arquivo _redirects copiado com sucesso!${colors.reset}`);
  } else {
    console.log(`${colors.green}Arquivo _redirects já existe na pasta dist.${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}Erro ao copiar o arquivo _redirects:${colors.reset}`, error);
}

// Passo 3: Verificar se o arquivo index.html existe na pasta dist
try {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log(`${colors.green}Arquivo index.html encontrado na pasta dist.${colors.reset}`);
  } else {
    throw new Error('Arquivo index.html não encontrado na pasta dist.');
  }
} catch (error) {
  console.error(`${colors.red}Erro ao verificar o arquivo index.html:${colors.reset}`, error);
  process.exit(1);
}

console.log(`${colors.blue}=== Build otimizado para Netlify concluído com sucesso! ===${colors.reset}`);
console.log(`${colors.yellow}Você pode encontrar os arquivos otimizados na pasta 'dist'.${colors.reset}`);
