# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b75a93f0-491f-47e4-81c9-33e7c4d11dde

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b75a93f0-491f-47e4-81c9-33e7c4d11dde) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b75a93f0-491f-47e4-81c9-33e7c4d11dde) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Instruções para Implantação em Hospedagem Estática

Este projeto foi otimizado para funcionar em hospedagens estáticas que não suportam execução de código React no servidor.

### Preparação para Implantação

1. **Gerar a versão otimizada para hospedagem estática**:
   ```sh
   npm run build:static
   ```
   Este comando irá:
   - Compilar o código React para arquivos estáticos
   - Copiar o arquivo `.htaccess` para a pasta `dist`
   - Verificar se todos os arquivos necessários foram gerados

2. **Testar localmente antes de implantar**:
   ```sh
   npx serve dist
   ```
   Acesse http://localhost:3000 para verificar se tudo está funcionando corretamente.

### Implantação

1. **Copie todos os arquivos da pasta `dist` para o servidor de hospedagem**:
   - Certifique-se de copiar também o arquivo `.htaccess`
   - Mantenha a estrutura de pastas exatamente como está

2. **Configurações do Servidor**:
   - O servidor deve estar configurado para servir arquivos estáticos
   - O servidor deve suportar as regras de reescrita do `.htaccess`
   - Certifique-se de que o servidor está configurado para servir o arquivo `index.html` quando uma rota não for encontrada

### Solução de Problemas

Se encontrar problemas após a implantação:

1. **Página em branco**: Verifique se todos os arquivos foram copiados corretamente e se o `.htaccess` está funcionando.
2. **Erros de CORS**: Verifique se o servidor está configurado para permitir solicitações CORS.
3. **Problemas com rotas**: Certifique-se de que o servidor está redirecionando todas as rotas para o `index.html`.

### Observações Importantes

- Este site utiliza o Supabase como backend, todas as chamadas são feitas diretamente do navegador do cliente para o Supabase.
- Não é necessário nenhum servidor backend adicional para o funcionamento do site.
- Os monitoramentos e análises continuarão funcionando normalmente, pois são processados no navegador do cliente.
