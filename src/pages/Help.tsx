
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, Link, AlertTriangle, FileSearch, Clock, Calendar, Search, Database, FileJson, BarChart, ArrowLeft, User, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Para este exemplo, usamos o localStorage para verificar a autenticação
        // Em uma aplicação real, usaríamos o Supabase Auth
        const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(isLoggedIn);
        
        if (!isLoggedIn) {
          toast({
            title: "Acesso restrito",
            description: "Você precisa estar autenticado para acessar a página de ajuda.",
            variant: "destructive"
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Função para voltar para a área administrativa, garantindo
  // que o usuário veja a área de monitoramento
  const handleGoBack = () => {
    navigate("/");
    // Usando um pequeno atraso para garantir que a página foi carregada
    // antes de mudar para a aba de monitoramento
    setTimeout(() => {
      const monitoringTab = document.querySelector('[value="monitoring"]');
      if (monitoringTab) {
        (monitoringTab as HTMLElement).click();
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
          </div>
          <p className="mt-2 text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Não deveria chegar aqui devido ao redirect, mas por precaução
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com título centralizado e botão Voltar */}
        <header className="mb-8 flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack} 
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Voltar para Monitoramento
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold">Página de Ajuda</h1>
          </div>
          
          <div className="w-[80px]"></div> {/* Espaço para balancear o layout */}
        </header>

        <Tabs defaultValue="monitoring" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
            <TabsTrigger value="research">Pesquisa</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
          </TabsList>

          {/* Conteúdo da aba de Monitoramento */}
          <TabsContent value="monitoring">
            <Card>
              <CardHeader>
                <CardTitle>Como Funciona o Monitoramento</CardTitle>
                <CardDescription>
                  Entenda o funcionamento do sistema de monitoramento e aprenda a utilizá-lo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Database size={20} className="text-primary" />
                    1. Coleta automatizada de dados
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    <strong>Monitoramento de sites governamentais:</strong> Extração regular de dados de portais de transparência, diários oficiais e sites de órgãos públicos.
                  </p>
                  <p className="text-muted-foreground pl-6">
                    <strong>Captura de indicadores socioeconômicos:</strong> Coleta automática de estatísticas, índices e outros indicadores de desenvolvimento regional.
                  </p>
                  <p className="text-muted-foreground pl-6">
                    <strong>Acompanhamento de legislação:</strong> Monitoramento de novas leis, decretos e normas relacionadas a políticas públicas.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileJson size={20} className="text-primary" />
                    2. Tratamento e estruturação de dados
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    <strong>Padronização:</strong> Transformação de dados não estruturados (HTML) em formatos estruturados (JSON, CSV).
                  </p>
                  <p className="text-muted-foreground pl-6">
                    <strong>Limpeza:</strong> Remoção de informações irrelevantes e tratamento de inconsistências.
                  </p>
                  <p className="text-muted-foreground pl-6">
                    <strong>Integração:</strong> Possibilidade de combinar dados de múltiplas fontes em um único dataset.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart size={20} className="text-primary" />
                    3. Criação de séries históricas
                  </h3>
                  <p className="text-muted-foreground pl-6">
                    <strong>Agendamento:</strong> Execução periódica para criar séries temporais de indicadores.
                  </p>
                  <p className="text-muted-foreground pl-6">
                    <strong>Versionamento:</strong> Acompanhamento da evolução de políticas e seus resultados ao longo do tempo.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen size={20} className="text-primary" />
                    4. Acessando o Sistema de Monitoramento
                  </h3>
                  <p className="text-muted-foreground">
                    Para acessar o sistema de monitoramento, faça login com suas credenciais e selecione a aba "Monitoramento" no painel principal.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Clique no botão "Entrar" no canto superior direito</p>
                    <p>• Digite suas credenciais (e-mail e senha)</p>
                    <p>• Após o login, clique na aba "Monitoramento"</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Link size={20} className="text-primary" />
                    5. Adicionando um Novo Monitoramento
                  </h3>
                  <p className="text-muted-foreground">
                    Configure um novo monitoramento preenchendo o formulário com todos os detalhes necessários.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Preencha o nome do monitoramento (seja descritivo)</p>
                    <p>• Insira a URL da fonte de dados a ser monitorada</p>
                    <p>• Opcional: adicione uma URL de API para integração direta</p>
                    <p>• Preencha as palavras-chave para filtrar o conteúdo (separadas por vírgula)</p>
                    <p>• Selecione a categoria apropriada</p>
                    <p>• Escolha a frequência de atualização do monitoramento</p>
                    <p>• <strong>Informe o nome do pesquisador responsável</strong> pelo monitoramento</p>
                    <p>• Clique em "Adicionar Monitoramento" para salvar</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User size={20} className="text-primary" />
                    6. Gerenciando Responsáveis
                  </h3>
                  <p className="text-muted-foreground">
                    Utilize o sistema de responsáveis para organizar e filtrar os monitoramentos por pesquisador.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Cada monitoramento deve ter um pesquisador responsável designado</p>
                    <p>• O nome do responsável aparece nos detalhes do monitoramento</p>
                    <p>• Use o filtro "Filtrar por responsável" acima da lista de monitoramentos para visualizar apenas os itens de um determinado pesquisador</p>
                    <p>• Selecione "Todos" no filtro para voltar a visualizar todos os monitoramentos</p>
                    <p>• O sistema gera automaticamente a lista de responsáveis disponíveis no filtro</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileSearch size={20} className="text-primary" />
                    7. Utilizando Exemplos de Código
                  </h3>
                  <p className="text-muted-foreground">
                    O sistema oferece exemplos pré-configurados para diferentes tipos de monitoramento.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Acesse a aba "Exemplos de Spiders" no formulário de monitoramento</p>
                    <p>• Escolha o tipo de spider mais adequado ao seu caso</p>
                    <p>• Analise o código de exemplo para entender a estrutura</p>
                    <p>• Adapte o código conforme necessário para sua fonte específica</p>
                    <p>• Implemente o spider seguindo o exemplo mais próximo da sua necessidade</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    8. Gerenciando Monitoramentos
                  </h3>
                  <p className="text-muted-foreground">
                    Gerencie seus monitoramentos ativos, visualize dados e remova itens quando necessário.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Visualize todos os monitoramentos na lista abaixo do formulário</p>
                    <p>• Use o filtro por responsável para encontrar rapidamente monitoramentos específicos</p>
                    <p>• Verifique detalhes como categoria, URL, frequência e responsável</p>
                    <p>• Use o botão "Excluir" para remover um monitoramento</p>
                    <p>• No Dashboard, visualize estatísticas sobre os monitoramentos</p>
                    <p>• Exporte os dados através do botão "Exportar Dados" no Dashboard</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Filter size={20} className="text-primary" />
                    9. Filtrando Monitoramentos
                  </h3>
                  <p className="text-muted-foreground">
                    Utilize os filtros do sistema para encontrar rapidamente os monitoramentos que você precisa.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• O filtro por responsável permite visualizar apenas os monitoramentos de um pesquisador específico</p>
                    <p>• Útil para ambientes com muitos pesquisadores utilizando a plataforma</p>
                    <p>• Facilita a identificação de quem é responsável por cada monitoramento</p>
                    <p>• Permite verificar rapidamente os monitoramentos sob sua responsabilidade</p>
                    <p>• Ajuda na gestão de equipes de pesquisa com diferentes focos de monitoramento</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle size={20} className="text-primary" />
                    10. Solucionando Problemas Comuns
                  </h3>
                  <p className="text-muted-foreground">
                    Dicas para resolver problemas que podem ocorrer durante o monitoramento.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Se o crawler não encontrar dados, verifique se a estrutura do site mudou</p>
                    <p>• Para APIs que retornam erro, confirme se as credenciais estão corretas</p>
                    <p>• Verifique a conexão com a internet em caso de falhas de acesso</p>
                    <p>• Para dados desatualizados, confirme a frequência de atualização</p>
                    <p>• Se um responsável não aparecer no filtro, verifique se ele possui monitoramentos ativos</p>
                    <p>• Em caso de erros persistentes, contate o suporte técnico</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conteúdo da aba de Pesquisa */}
          <TabsContent value="research">
            <Card>
              <CardHeader>
                <CardTitle>Como Usar o Sistema de Pesquisa</CardTitle>
                <CardDescription>
                  Instruções para adicionar e gerenciar estudos de pesquisa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Search size={20} className="text-primary" />
                    1. Adicionando um Novo Estudo
                  </h3>
                  <p className="text-muted-foreground">
                    Adicione estudos de pesquisa ao sistema para visualização no mapa.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Navegue até a aba "Pesquisa" após fazer login</p>
                    <p>• Preencha o título, autor e coautores do estudo</p>
                    <p>• Adicione um resumo claro e conciso</p>
                    <p>• Insira a URL do repositório onde o estudo está disponível</p>
                    <p>• Especifique a localização geográfica do estudo</p>
                    <p>• Selecione o tipo de estudo (artigo, dissertação, tese, etc.)</p>
                    <p>• Clique em "Adicionar Estudo" para salvar</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar size={20} className="text-primary" />
                    2. Gerenciando Estudos
                  </h3>
                  <p className="text-muted-foreground">
                    Visualize, organize e remova estudos cadastrados no sistema.
                  </p>
                  <div className="pl-6 text-sm space-y-1">
                    <p>• Todos os estudos adicionados aparecem na lista lateral</p>
                    <p>• Visualize detalhes completos de cada estudo</p>
                    <p>• Para remover um estudo, clique no botão "Excluir"</p>
                    <p>• No Mapa Interativo, observe a distribuição geográfica dos estudos</p>
                    <p>• Clique nos marcadores no mapa para ver detalhes de cada estudo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conteúdo da aba Sobre */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Sistema</CardTitle>
                <CardDescription>
                  Informações sobre o desenvolvimento e responsáveis pelo sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sobre o Projeto</h3>
                  <p className="text-muted-foreground">
                    O Sistema de Monitoramento e Análise de Indicadores Regionais foi desenvolvido para acompanhar, 
                    coletar e analisar dados relevantes para o desenvolvimento sustentável da Amazônia. A plataforma permite 
                    configurar monitoramentos automatizados de diversas fontes de dados e visualizar estudos de pesquisa em um mapa interativo.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Linha de Pesquisa</h3>
                  <p className="text-muted-foreground">
                    Meio Ambiente e Planejamento
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Orientação</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium">Orientador</h4>
                      <p className="text-muted-foreground">Prof. Dr. Marco Antônio Augusto Chagas</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Coorientadora</h4>
                      <p className="text-muted-foreground">Profa. Dra. Lylian Caroline Maciel Rodrigues</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Créditos</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Desenvolvimento do Sistema</h4>
                      <p className="text-muted-foreground">Hiroshi Koga</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Desenvolvimento dos Códigos de Monitoramento</h4>
                      <p className="text-muted-foreground">Equipe de Desenvolvimento do PPGDAS</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Tecnologia de Web Scraping</h4>
                      <p className="text-muted-foreground">
                        <a href="https://scrapy.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Scrapy</a> - 
                        Uma estrutura colaborativa e de código aberto para extrair os dados que você precisa de sites.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Instituição</h4>
                      <p className="text-muted-foreground">
                        Programa de Pós-graduação em Desenvolvimento da Amazônia Sustentável (PPGDAS)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Contato</h3>
                  <p className="text-muted-foreground">
                    Para suporte técnico, sugestões ou mais informações, entre em contato através do site 
                    <a href="https://observatório.org" className="text-primary ml-1 hover:underline" target="_blank" rel="noopener noreferrer">
                      observatório.org
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="flex items-center">
                ©️ 2024 | Programa de Pós-graduação em Desenvolvimento da Amazônia Sustentável (PPGDAS)
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Desenvolvido por: Hiroshi Koga
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Help;
