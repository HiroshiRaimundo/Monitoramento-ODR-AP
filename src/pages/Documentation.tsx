
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";

const Documentation: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-6 flex-1">
        <Header 
          isAuthenticated={auth.isAuthenticated} 
          onLoginClick={() => auth.setIsLoginDialogOpen(true)} 
          onLogoutClick={auth.handleLogout} 
        />

        <div className="flex items-center mt-4 mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-forest-600 border-forest-200 hover:bg-forest-50"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} />
            Voltar
          </Button>
        </div>

        <Card className="mt-2">
          <CardHeader>
            <CardTitle className="text-2xl">Documentação Técnica: Sistema de Monitoramento</CardTitle>
            <CardDescription>
              Estrutura lógica e técnica do sistema de monitoramento de fontes de dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="data-model">Modelo de Dados</TabsTrigger>
                <TabsTrigger value="components">Componentes</TabsTrigger>
                <TabsTrigger value="workflows">Fluxos de Trabalho</TabsTrigger>
                <TabsTrigger value="technical">Detalhes Técnicos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <h2 className="text-xl font-semibold mb-3">Visão Geral do Sistema</h2>
                <p className="text-muted-foreground mb-4">
                  O Sistema de Monitoramento é uma aplicação web projetada para monitorar fontes de dados automaticamente. Permite que os usuários configurem monitoramentos em diversas fontes como páginas da web, APIs, bases de dados governamentais, e outras fontes de dados.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Principais Funcionalidades</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Configuração de monitoramentos para diversas fontes de dados</li>
                  <li>Customização da frequência de monitoramento (diário, semanal, etc)</li>
                  <li>Categorização das fontes monitoradas</li>
                  <li>Atribuição de responsáveis com vínculos institucionais</li>
                  <li>Visualização de estatísticas em dashboard interativo</li>
                  <li>Exportação de dados para análise externa</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Arquitetura</h3>
                <p className="text-muted-foreground mb-2">
                  O sistema utiliza uma arquitetura frontend com persistência em banco de dados:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Frontend:</strong> React, TypeScript, TailwindCSS, shadcn/ui</li>
                  <li><strong>Gerenciamento de Estado:</strong> Hooks React personalizados</li>
                  <li><strong>Persistência:</strong> Supabase (PostgreSQL)</li>
                  <li><strong>Visualização:</strong> Recharts para gráficos dinâmicos</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="data-model">
                <h2 className="text-xl font-semibold mb-4">Modelo de Dados</h2>
                <p className="text-muted-foreground mb-6">
                  O sistema armazena informações na tabela <code>monitoring_items</code> no Supabase. Abaixo está a descrição detalhada de cada campo.
                </p>
                
                <Table>
                  <TableCaption>Estrutura da tabela monitoring_items</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Obrigatório</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">id</TableCell>
                      <TableCell>UUID</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Identificador único gerado automaticamente</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">name</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Nome descritivo do monitoramento</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">url</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>URL da fonte de dados a ser monitorada</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">api_url</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Não</TableCell>
                      <TableCell>URL da API (se aplicável) para integração direta</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">frequency</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Frequência de atualização (diario, semanal, quinzenal, mensal)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">category</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Categoria do item (governo, indicadores, legislacao, api)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">keywords</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Não</TableCell>
                      <TableCell>Palavras-chave relacionadas, separadas por vírgula</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">responsible</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Não</TableCell>
                      <TableCell>Nome do pesquisador ou responsável pelo monitoramento</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">institution</TableCell>
                      <TableCell>Texto</TableCell>
                      <TableCell>Não</TableCell>
                      <TableCell>Instituição à qual o responsável está vinculado</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">created_at</TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Sim</TableCell>
                      <TableCell>Data e hora da criação do registro</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <h3 className="text-lg font-medium mt-8 mb-3">Interface TypeScript</h3>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <pre>
{`export interface MonitoringItem {
  id: string;
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  institution?: string;
}`}
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="components">
                <h2 className="text-xl font-semibold mb-4">Componentes do Sistema</h2>
                <p className="text-muted-foreground mb-6">
                  O sistema é composto por diversos componentes React que trabalham juntos. Abaixo estão os principais componentes e suas responsabilidades.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">MonitoringForm.tsx</h3>
                    <p className="text-muted-foreground mb-2">
                      Componente principal para adição e gerenciamento de monitoramentos.
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Gerencia o estado da interface de adição de monitoramentos</li>
                      <li>Coordena os inputs do formulário e exemplos de código</li>
                      <li>Usa abas para alternar entre formulário e exemplos</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">MonitoringFormInputs.tsx</h3>
                    <p className="text-muted-foreground mb-2">
                      Gerencia os campos de entrada para configuração de monitoramentos.
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Renderiza todos os campos de entrada necessários</li>
                      <li>Gerencia validação de formulário usando react-hook-form</li>
                      <li>Processa submissão do formulário</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">MonitoringList.tsx</h3>
                    <p className="text-muted-foreground mb-2">
                      Exibe a lista de monitoramentos ativos com recursos de filtragem.
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Renderiza cartões para cada item de monitoramento</li>
                      <li>Fornece opções de filtragem por responsável</li>
                      <li>Exibe detalhes completos de cada configuração</li>
                      <li>Permite excluir monitoramentos</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Dashboard.tsx e componentes relacionados</h3>
                    <p className="text-muted-foreground mb-2">
                      Sistema de visualização de dados com diversos gráficos.
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>CategoryChart: Distribuição por categoria (gráfico de pizza)</li>
                      <li>FrequencyChart: Distribuição por frequência (gráfico de barras)</li>
                      <li>ResearchersChart: Top 5 pesquisadores (gráfico de barras horizontal)</li>
                      <li>SourceTypeChart: Cobertura por tipo (gráfico de radar)</li>
                      <li>SystemUpdatesChart: Histórico de atualizações (gráfico de área)</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">useMonitoring.ts</h3>
                    <p className="text-muted-foreground mb-2">
                      Hook personalizado para gerenciamento de estado e operações CRUD.
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Gerencia o estado global dos monitoramentos</li>
                      <li>Fornece funções para adicionar, remover e buscar monitoramentos</li>
                      <li>Gerencia a comunicação com o Supabase</li>
                      <li>Implementa filtragem e exportação de dados</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="workflows">
                <h2 className="text-xl font-semibold mb-4">Fluxos de Trabalho</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3">1. Adição de um Novo Monitoramento</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                      <li>Usuário acessa a aba "Monitoramento"</li>
                      <li>Preenche o formulário com os detalhes do monitoramento:
                        <ul className="list-disc pl-6 mt-1">
                          <li>Nome do monitoramento</li>
                          <li>URL da fonte</li>
                          <li>URL da API (se aplicável)</li>
                          <li>Categoria</li>
                          <li>Frequência de atualização</li>
                          <li>Palavras-chave</li>
                          <li>Responsável</li>
                          <li>Instituição</li>
                        </ul>
                      </li>
                      <li>Clica em "Adicionar Monitoramento"</li>
                      <li>Os dados são validados pelo frontend</li>
                      <li>Os dados validados são enviados ao Supabase via <code>handleAddMonitoring</code></li>
                      <li>O novo item é adicionado ao estado do aplicativo via <code>setMonitoringItems</code></li>
                      <li>Um toast de confirmação é exibido para o usuário</li>
                      <li>O formulário é resetado para permitir novas entradas</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">2. Visualização e Filtragem de Monitoramentos</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                      <li>Ao carregar a página, <code>fetchMonitoringItems</code> é chamado para buscar os dados do Supabase</li>
                      <li>Os dados são processados e armazenados no estado via <code>setMonitoringItems</code></li>
                      <li>MonitoringList renderiza um cartão para cada item</li>
                      <li>Usuário pode filtrar itens por responsável usando o seletor de filtro</li>
                      <li>Quando um filtro é aplicado, <code>setResponsibleFilter</code> atualiza o estado</li>
                      <li>MonitoringList é re-renderizado mostrando apenas os itens que correspondem ao filtro</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">3. Exclusão de um Monitoramento</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                      <li>Usuário clica no botão "Excluir" em um item na lista</li>
                      <li><code>handleDeleteMonitoring</code> é chamado com o ID do item</li>
                      <li>Uma requisição DELETE é enviada ao Supabase</li>
                      <li>Após confirmação de sucesso, o item é removido do estado via <code>setMonitoringItems</code></li>
                      <li>Um toast de confirmação é exibido para o usuário</li>
                      <li>A lista é atualizada automaticamente</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">4. Visualização de Estatísticas no Dashboard</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                      <li>Usuário acessa a aba "Dashboard"</li>
                      <li>Os dados são processados por funções em DashboardUtils:
                        <ul className="list-disc pl-6 mt-1">
                          <li><code>getCategoryData</code>: processa dados para o gráfico de categorias</li>
                          <li><code>getFrequencyData</code>: processa dados para o gráfico de frequências</li>
                          <li><code>getResponsibleData</code>: processa dados para o gráfico de responsáveis/instituições</li>
                          <li><code>getRadarData</code>: processa dados para o gráfico radar de tipos</li>
                        </ul>
                      </li>
                      <li>Os componentes de gráficos renderizam visualizações baseadas nos dados processados</li>
                      <li>Usuário pode ajustar filtros como período de tempo</li>
                      <li>Usuário autenticado pode exportar dados para análise externa</li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="technical">
                <h2 className="text-xl font-semibold mb-4">Detalhes Técnicos de Implementação</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Integração com o Supabase</h3>
                    <p className="text-muted-foreground mb-3">
                      O sistema utiliza o Supabase como backend para persistência de dados. Abaixo estão os detalhes da implementação:
                    </p>
                    <div className="bg-muted p-4 rounded-md mb-4">
                      <pre>
{`// Exemplo de operação CRUD no Supabase
const handleAddMonitoring = async (data: Omit<MonitoringItem, "id">) => {
  try {
    // Inserir no Supabase
    const { data: newItem, error } = await supabase
      .from('monitoring_items')
      .insert({
        name: data.name,
        url: data.url,
        api_url: data.api_url || null,
        frequency: data.frequency,
        category: data.category,
        keywords: data.keywords || null,
        responsible: data.responsible || null,
        institution: data.institution || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Processar resposta...
  } catch (error) {
    // Gerenciar erros...
  }
};`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Implementação de Spiders/Crawlers</h3>
                    <p className="text-muted-foreground mb-3">
                      O sistema fornece exemplos de código para implementação de crawlers usando frameworks como Scrapy. Estes exemplos servem como base para o desenvolvimento de coletores de dados personalizados.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      Os exemplos estão disponíveis na aba "Exemplos de Spiders" e incluem:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>TransparenciaSpider: para portais de transparência governamental</li>
                      <li>DiarioOficialSpider: para monitoramento de publicações oficiais</li>
                      <li>IbgeSpider: para coleta de dados estatísticos do IBGE</li>
                      <li>ApiExample: para integração com APIs REST</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Gerenciamento de Estado</h3>
                    <p className="text-muted-foreground mb-3">
                      O aplicativo utiliza hooks React personalizados para gerenciamento de estado, principalmente o hook <code>useMonitoring</code> que encapsula toda a lógica relacionada aos monitoramentos.
                    </p>
                    <p className="text-muted-foreground mb-3">
                      Principais funcionalidades do hook:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Estado global de itens: <code>monitoringItems</code></li>
                      <li>Estado de carregamento: <code>isLoading</code></li>
                      <li>Filtros: <code>responsibleFilter</code></li>
                      <li>Formulário: <code>form</code> (usando react-hook-form)</li>
                      <li>Operações CRUD: <code>fetchMonitoringItems</code>, <code>handleAddMonitoring</code>, <code>handleDeleteMonitoring</code></li>
                      <li>Exportação: <code>handleExport</code></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Visualização de Dados</h3>
                    <p className="text-muted-foreground mb-3">
                      O dashboard utiliza a biblioteca Recharts para renderizar visualizações interativas dos dados. Os componentes de gráfico incluem:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      <li>Gráficos de barras para frequência e responsáveis</li>
                      <li>Gráfico de pizza para categorias</li>
                      <li>Gráfico radar para tipos de fonte</li>
                      <li>Gráfico de área para histórico de atualizações</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      Cada componente de gráfico recebe dados processados pelas funções utilitárias em <code>DashboardUtils.ts</code>.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
