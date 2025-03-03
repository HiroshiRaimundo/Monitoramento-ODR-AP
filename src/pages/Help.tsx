
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, Link, AlertTriangle, FileSearch, Clock, Calendar, Search, Database, FileJson, BarChart, ArrowLeft, User, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Help: React.FC = () => {
  const navigate = useNavigate();

  // Função para voltar para a página principal
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com título centralizado e botão Voltar */}
        <header className="mb-8 flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack} 
            className="flex items-center gap-2 border-green-600 text-green-700 hover:bg-green-50"
          >
            <ArrowLeft size={16} />
            Voltar para o Dashboard
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-green-800">Página de Ajuda</h1>
          </div>
          
          <div className="w-[80px]"></div> {/* Espaço para balancear o layout */}
        </header>

        <Tabs defaultValue="monitoring" className="w-full">
          <TabsList className="grid grid-cols-3 w-full bg-green-100/70">
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-green-200 data-[state=active]:text-green-900">Monitoramento</TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-green-200 data-[state=active]:text-green-900">Pesquisa</TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-green-200 data-[state=active]:text-green-900">Sobre</TabsTrigger>
          </TabsList>

          {/* Conteúdo da aba de Monitoramento */}
          <TabsContent value="monitoring">
            <Card className="bg-white/90 border-green-200">
              <CardHeader className="bg-green-50/50 border-b border-green-100">
                <CardTitle className="text-green-800">Como Funciona o Monitoramento</CardTitle>
                <CardDescription>
                  Entenda o funcionamento do sistema de monitoramento e aprenda a utilizá-lo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <Database size={20} className="text-green-600" />
                    1. Coleta automatizada de dados
                  </h3>
                  <p className="text-green-700 pl-6">
                    <strong>Monitoramento de sites governamentais:</strong> Extração regular de dados de portais de transparência, diários oficiais e sites de órgãos públicos.
                  </p>
                  <p className="text-green-700 pl-6">
                    <strong>Captura de indicadores socioeconômicos:</strong> Coleta automática de estatísticas, índices e outros indicadores de desenvolvimento regional.
                  </p>
                  <p className="text-green-700 pl-6">
                    <strong>Acompanhamento de legislação:</strong> Monitoramento de novas leis, decretos e normas relacionadas a políticas públicas.
                  </p>
                </div>

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <FileJson size={20} className="text-green-600" />
                    2. Tratamento e estruturação de dados
                  </h3>
                  <p className="text-green-700 pl-6">
                    <strong>Padronização:</strong> Transformação de dados não estruturados (HTML) em formatos estruturados (JSON, CSV).
                  </p>
                  <p className="text-green-700 pl-6">
                    <strong>Limpeza:</strong> Remoção de informações irrelevantes e tratamento de inconsistências.
                  </p>
                  <p className="text-green-700 pl-6">
                    <strong>Integração:</strong> Possibilidade de combinar dados de múltiplas fontes em um único dataset.
                  </p>
                </div>

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <BarChart size={20} className="text-green-600" />
                    3. Criação de séries históricas
                  </h3>
                  <p className="text-green-700 pl-6">
                    <strong>Agendamento:</strong> Execução periódica para criar séries temporais de indicadores.
                  </p>
                  <p className="text-green-700 pl-6">
                    <strong>Versionamento:</strong> Acompanhamento da evolução de políticas e seus resultados ao longo do tempo.
                  </p>
                </div>

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <BookOpen size={20} className="text-green-600" />
                    4. Acessando o Sistema de Monitoramento
                  </h3>
                  <p className="text-green-700">
                    Para acessar o sistema de monitoramento, faça login com suas credenciais e selecione a aba "Monitoramento" no painel principal.
                  </p>
                  <div className="pl-6 text-sm space-y-1 text-green-700">
                    <p>• Clique no botão "Entrar" no canto superior direito</p>
                    <p>• Digite suas credenciais (e-mail e senha)</p>
                    <p>• Após o login, clique na aba "Monitoramento"</p>
                  </div>
                </div>

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <Link size={20} className="text-green-600" />
                    5. Adicionando um Novo Monitoramento
                  </h3>
                  <p className="text-green-700">
                    Configure um novo monitoramento preenchendo o formulário com todos os detalhes necessários.
                  </p>
                  <div className="pl-6 text-sm space-y-1 text-green-700">
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

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <User size={20} className="text-green-600" />
                    6. Utilizando a Análise Automática
                  </h3>
                  <p className="text-green-700">
                    Utilize as ferramentas de análise automática para processar e visualizar dados.
                  </p>
                  <div className="pl-6 text-sm space-y-1 text-green-700">
                    <p>• Acesse a aba "Análise Automática" na área de administração</p>
                    <p>• Utilize o botão "Processar" para iniciar a análise automática de um monitoramento</p>
                    <p>• Visualize gráficos e estatísticas geradas automaticamente</p>
                    <p>• Baixe scripts Python, notebooks Jupyter ou scripts Power BI para análises mais avançadas</p>
                    <p>• Exporte relatórios completos com os resultados das análises</p>
                  </div>
                </div>

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <Clock size={20} className="text-green-600" />
                    7. Gerenciando Monitoramentos
                  </h3>
                  <p className="text-green-700">
                    Gerencie seus monitoramentos ativos, visualize dados e remova itens quando necessário.
                  </p>
                  <div className="pl-6 text-sm space-y-1 text-green-700">
                    <p>• Visualize todos os monitoramentos na lista abaixo do formulário</p>
                    <p>• Use o filtro por responsável para encontrar rapidamente monitoramentos específicos</p>
                    <p>• Verifique detalhes como categoria, URL, frequência e responsável</p>
                    <p>• Use o botão "Excluir" para remover um monitoramento</p>
                    <p>• No Dashboard, visualize estatísticas sobre os monitoramentos</p>
                    <p>• Exporte os dados através do botão "Exportar Dados" no Dashboard</p>
                  </div>
                </div>

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <AlertTriangle size={20} className="text-green-600" />
                    8. Solucionando Problemas Comuns
                  </h3>
                  <p className="text-green-700">
                    Dicas para resolver problemas que podem ocorrer durante o monitoramento.
                  </p>
                  <div className="pl-6 text-sm space-y-1 text-green-700">
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
            <Card className="bg-white/90 border-green-200">
              <CardHeader className="bg-green-50/50 border-b border-green-100">
                <CardTitle className="text-green-800">Como Usar o Sistema de Pesquisa</CardTitle>
                <CardDescription>
                  Instruções para adicionar e gerenciar estudos de pesquisa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <Search size={20} className="text-green-600" />
                    1. Adicionando um Novo Estudo
                  </h3>
                  <p className="text-green-700">
                    Adicione estudos de pesquisa ao sistema para visualização no mapa.
                  </p>
                  <div className="pl-6 text-sm space-y-1 text-green-700">
                    <p>• Navegue até a aba "Pesquisa" após fazer login</p>
                    <p>• Preencha o título, autor e coautores do estudo</p>
                    <p>• Adicione um resumo claro e conciso</p>
                    <p>• Insira a URL do repositório onde o estudo está disponível</p>
                    <p>• Especifique a localização geográfica do estudo</p>
                    <p>• Selecione o tipo de estudo (artigo, dissertação, tese, etc.)</p>
                    <p>• Clique em "Adicionar Estudo" para salvar</p>
                  </div>
                </div>

                <Separator className="bg-green-100" />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-green-800">
                    <Calendar size={20} className="text-green-600" />
                    2. Gerenciando Estudos
                  </h3>
                  <p className="text-green-700">
                    Visualize, organize e remova estudos cadastrados no sistema.
                  </p>
                  <div className="pl-6 text-sm space-y-1 text-green-700">
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
            <Card className="bg-white/90 border-green-200">
              <CardHeader className="bg-green-50/50 border-b border-green-100">
                <CardTitle className="text-green-800">Sobre o Sistema</CardTitle>
                <CardDescription>
                  Informações sobre o desenvolvimento e responsáveis pelo sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-800">Sobre o Projeto</h3>
                  <p className="text-green-700">
                    O Sistema de Monitoramento e Análise de Indicadores Regionais foi desenvolvido para acompanhar, 
                    coletar e analisar dados relevantes para o desenvolvimento sustentável. A plataforma permite 
                    configurar monitoramentos automatizados de diversas fontes de dados e visualizar estudos de pesquisa em um mapa interativo.
                  </p>
                </div>

                <Separator className="bg-green-100" />

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-800">Linha de Pesquisa</h3>
                  <p className="text-green-700">
                    Meio Ambiente e Planejamento
                  </p>
                </div>

                <Separator className="bg-green-100" />

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-800">Orientação</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-green-800">Orientador</h4>
                      <p className="text-green-700">Prof. Dr. Marco Antônio Augusto Chagas</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-800">Coorientadora</h4>
                      <p className="text-green-700">Profa. Dra. Lylian Caroline Maciel Rodrigues</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-green-100" />

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-800">Créditos</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-800">Desenvolvimento do Sistema</h4>
                      <p className="text-green-700">Hiroshi Koga</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-800">Desenvolvimento dos Códigos de Monitoramento</h4>
                      <p className="text-green-700">Equipe de Desenvolvimento do PPGDAS</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-800">Tecnologia de Web Scraping</h4>
                      <p className="text-green-700">
                        <a href="https://scrapy.org/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Scrapy</a> - 
                        Uma estrutura colaborativa e de código aberto para extrair os dados que você precisa de sites.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-800">Instituição</h4>
                      <p className="text-green-700">
                        Programa de Pós-graduação em Desenvolvimento da Amazônia Sustentável (PPGDAS)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-green-100" />

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-800">Contato</h3>
                  <p className="text-green-700">
                    Para suporte técnico, sugestões ou mais informações, entre em contato através do site 
                    <a href="https://observatório.org" className="text-green-600 ml-1 hover:underline" target="_blank" rel="noopener noreferrer">
                      observatório.org
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-green-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center text-sm text-green-700">
              <span className="flex items-center">
                ©️ 2024 | Programa de Pós-graduação em Desenvolvimento da Amazônia Sustentável (PPGDAS)
              </span>
            </div>
            <div className="text-sm text-green-700">
              Desenvolvido por: Hiroshi Koga
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Help;
