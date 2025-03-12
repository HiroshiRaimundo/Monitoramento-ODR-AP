
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Code, Database, FileText, Image, Link, Code2, Layout, Shield, Key, GitBranch, CheckCircle, XCircle, Search, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MetricItem {
  icon: React.ReactNode;
  title: string;
  function: string;
  usage: string;
  enabled: boolean;
}

interface AnalysisType {
  icon: React.ReactNode;
  title: string;
  description: string;
  useCases: string[];
  pythonModule: string;
  enabled: boolean;
}

const MonitoringMetrics = () => {
  const [metrics, setMetrics] = useState<MetricItem[]>([
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Tempo de Resposta",
      function: "Monitora o tempo que o servidor leva para responder às requisições.",
      usage: "Identifica gargalos de desempenho.",
      enabled: true
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Código de Status",
      function: "Verifica os códigos de status HTTP (ex: 200, 404, 500).",
      usage: "Detecta erros ou respostas inesperadas.",
      enabled: true
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Tamanho do Conteúdo",
      function: "Monitora alterações no tamanho do conteúdo enviado.",
      usage: "Identifica mudanças que podem afetar o desempenho.",
      enabled: true
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Estrutura HTML",
      function: "Detecta mudanças na estrutura HTML.",
      usage: "Garante que a estrutura do site não seja alterada acidentalmente.",
      enabled: true
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Meta Tags",
      function: "Monitora alterações em meta tags.",
      usage: "Assegura que informações importantes, como SEO, permaneçam consistentes.",
      enabled: true
    },
    {
      icon: <Link className="h-5 w-5" />,
      title: "Links",
      function: "Verifica links quebrados e alterações.",
      usage: "Mantém a integridade dos links internos e externos.",
      enabled: true
    },
    {
      icon: <Image className="h-5 w-5" />,
      title: "Imagens",
      function: "Monitora alterações em imagens.",
      usage: "Detecta mudanças não autorizadas ou problemas de carregamento.",
      enabled: true
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "JavaScript",
      function: "Detecta mudanças em scripts.",
      usage: "Garante que o comportamento do site não seja afetado por alterações inesperadas.",
      enabled: true
    },
    {
      icon: <Layout className="h-5 w-5" />,
      title: "CSS",
      function: "Monitora alterações no estilo.",
      usage: "Mantém a consistência visual do site.",
      enabled: true
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Headers HTTP",
      function: "Monitora headers de resposta.",
      usage: "Verifica se as configurações de segurança e cache estão corretas.",
      enabled: true
    },
    {
      icon: <Key className="h-5 w-5" />,
      title: "Certificado SSL",
      function: "Verifica a validade do certificado SSL.",
      usage: "Assegura que a conexão seja segura e confiável.",
      enabled: true
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: "Redirecionamentos",
      function: "Monitora a cadeia de redirecionamentos.",
      usage: "Evita loops de redirecionamento ou redirecionamentos incorretos.",
      enabled: true
    }
  ]);

  const [analysisTypes, setAnalysisTypes] = useState<AnalysisType[]>([
    {
      icon: <Search className="h-5 w-5" />,
      title: "XPath Selectors",
      description: "Utiliza expressões XPath para selecionar e extrair dados de documentos XML/HTML.",
      useCases: [
        "Extrair dados de elementos específicos na estrutura DOM",
        "Navegação precisa em documentos com estrutura complexa",
        "Seleção de elementos baseada em atributos e posição"
      ],
      pythonModule: "from scrapy.selector import Selector\nselector = Selector(text=html)\ndata = selector.xpath('//div[@class=\"content\"]/text()').get()",
      enabled: true
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "CSS Selectors",
      description: "Utiliza seletores CSS para extrair dados de documentos HTML.",
      useCases: [
        "Extração simplificada de dados baseada em classes e IDs",
        "Seleção de elementos com sintaxe familiar para desenvolvedores web",
        "Combinação com Pseudo-classes CSS para seleção avançada"
      ],
      pythonModule: "from scrapy.selector import Selector\nselector = Selector(text=html)\ndata = selector.css('div.content::text').get()",
      enabled: true
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Item Loaders",
      description: "Mecanismo para popular items com dados extraídos, aplicando processadores de entrada/saída.",
      useCases: [
        "Limpeza e transformação de dados durante a extração",
        "Aplicação de regras consistentes de processamento para múltiplos campos",
        "Construção de pipelines de processamento para diferentes tipos de dados"
      ],
      pythonModule: "from scrapy.loader import ItemLoader\nfrom myproject.items import Product\n\nloader = ItemLoader(item=Product(), response=response)\nloader.add_xpath('name', '//div[@class=\"product-name\"]/text()')\nproduct = loader.load_item()",
      enabled: true
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Item Pipeline",
      description: "Processamento sequencial de items extraídos através de componentes.",
      useCases: [
        "Validação de dados extraídos",
        "Limpeza e normalização de dados",
        "Armazenamento em banco de dados ou exportação para formatos específicos"
      ],
      pythonModule: "class PricePipeline:\n    def process_item(self, item, spider):\n        item['price'] = float(item['price'].replace('$', ''))\n        return item",
      enabled: true
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Middlewares",
      description: "Componentes que processam requisições e respostas entre o Scrapy e os sites alvo.",
      useCases: [
        "Gerenciamento de cookies e sessões",
        "Rotação de proxies e user agents",
        "Tratamento de redirecionamentos e erros HTTP"
      ],
      pythonModule: "class CustomMiddleware:\n    def process_request(self, request, spider):\n        request.headers['User-Agent'] = 'Mozilla/5.0 ...'\n        return None",
      enabled: true
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Scheduler",
      description: "Gerencia a fila de requisições a serem processadas.",
      useCases: [
        "Priorização de URLs para crawling",
        "Filtragem de URLs duplicadas",
        "Limitação de taxa de requisições por domínio"
      ],
      pythonModule: "# configuração no settings.py\nSCHEDULER_PRIORITY_QUEUE = 'scrapy.pqueues.DownloaderAwarePriorityQueue'",
      enabled: true
    },
    {
      icon: <Link className="h-5 w-5" />,
      title: "LinkExtractor",
      description: "Extrair links de páginas HTML para seguir durante o crawling.",
      useCases: [
        "Crawling recursivo de sites",
        "Filtragem de links por padrões e regex",
        "Navegação sistemática por categorias e paginação"
      ],
      pythonModule: "from scrapy.linkextractors import LinkExtractor\n\nlink_extractor = LinkExtractor(allow=r'/product/\\d+')\nlinks = link_extractor.extract_links(response)",
      enabled: true
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Feeds Export",
      description: "Exportação de dados extraídos para diversos formatos.",
      useCases: [
        "Salvar dados em JSON, CSV, XML",
        "Integração com sistemas externos",
        "Geração de datasets para análise"
      ],
      pythonModule: "# comando de execução\n# scrapy crawl spider_name -o output.json",
      enabled: true
    }
  ]);

  const toggleMetric = (index: number) => {
    const updatedMetrics = [...metrics];
    updatedMetrics[index].enabled = !updatedMetrics[index].enabled;
    setMetrics(updatedMetrics);
    
    toast({
      title: updatedMetrics[index].enabled ? "Métrica Ativada" : "Métrica Desativada",
      description: `${updatedMetrics[index].title} foi ${updatedMetrics[index].enabled ? 'ativada' : 'desativada'} com sucesso.`,
      variant: updatedMetrics[index].enabled ? "default" : "destructive",
    });
  };

  const toggleAnalysis = (index: number) => {
    const updatedAnalysis = [...analysisTypes];
    updatedAnalysis[index].enabled = !updatedAnalysis[index].enabled;
    setAnalysisTypes(updatedAnalysis);
    
    toast({
      title: updatedAnalysis[index].enabled ? "Análise Ativada" : "Análise Desativada",
      description: `${updatedAnalysis[index].title} foi ${updatedAnalysis[index].enabled ? 'ativada' : 'desativada'} com sucesso.`,
      variant: updatedAnalysis[index].enabled ? "default" : "destructive",
    });
  };

  const enableAllMetrics = () => {
    const updatedMetrics = metrics.map(metric => ({...metric, enabled: true}));
    setMetrics(updatedMetrics);
    
    toast({
      title: "Todas as Métricas Ativadas",
      description: "Todas as métricas de monitoramento foram ativadas com sucesso.",
    });
  };

  const disableAllMetrics = () => {
    const updatedMetrics = metrics.map(metric => ({...metric, enabled: false}));
    setMetrics(updatedMetrics);
    
    toast({
      title: "Todas as Métricas Desativadas",
      description: "Todas as métricas de monitoramento foram desativadas.",
      variant: "destructive",
    });
  };

  const enableAllAnalysis = () => {
    const updatedAnalysis = analysisTypes.map(analysis => ({...analysis, enabled: true}));
    setAnalysisTypes(updatedAnalysis);
    
    toast({
      title: "Todas as Análises Ativadas",
      description: "Todos os tipos de análise do Scrapy foram ativados com sucesso.",
    });
  };

  const disableAllAnalysis = () => {
    const updatedAnalysis = analysisTypes.map(analysis => ({...analysis, enabled: false}));
    setAnalysisTypes(updatedAnalysis);
    
    toast({
      title: "Todas as Análises Desativadas",
      description: "Todos os tipos de análise do Scrapy foram desativados.",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Monitoramento</CardTitle>
        <CardDescription>
          Configure métricas e tipos de análise para seu monitoramento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="metrics" className="flex-1">Métricas de Monitoramento</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1">Tipos de Análise Scrapy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics">
            <div className="flex space-x-2 mb-4">
              <Button variant="outline" size="sm" onClick={enableAllMetrics} className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Ativar Todas
              </Button>
              <Button variant="outline" size="sm" onClick={disableAllMetrics} className="flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                Desativar Todas
              </Button>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {metrics.map((metric, index) => (
                <AccordionItem key={index} value={`metric-${index}`}>
                  <AccordionTrigger className="flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      {metric.icon}
                      <span>{metric.title}</span>
                    </div>
                    <div className="flex items-center mr-4" onClick={(e) => e.stopPropagation()}>
                      <span className="text-xs mr-2">{metric.enabled ? 'Ativo' : 'Inativo'}</span>
                      <Switch 
                        checked={metric.enabled}
                        onCheckedChange={() => toggleMetric(index)}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-8">
                      <p className="text-sm"><strong>Função:</strong> {metric.function}</p>
                      <p className="text-sm"><strong>Uso:</strong> {metric.usage}</p>
                      <p className="text-sm"><strong>Status:</strong> 
                        <span className={`ml-2 ${metric.enabled ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.enabled ? 'Monitoramento ativo' : 'Monitoramento desativado'}
                        </span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="analysis">
            <div className="flex space-x-2 mb-4">
              <Button variant="outline" size="sm" onClick={enableAllAnalysis} className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Ativar Todas
              </Button>
              <Button variant="outline" size="sm" onClick={disableAllAnalysis} className="flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                Desativar Todas
              </Button>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {analysisTypes.map((analysis, index) => (
                <AccordionItem key={index} value={`analysis-${index}`}>
                  <AccordionTrigger className="flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      {analysis.icon}
                      <span>{analysis.title}</span>
                    </div>
                    <div className="flex items-center mr-4" onClick={(e) => e.stopPropagation()}>
                      <span className="text-xs mr-2">{analysis.enabled ? 'Ativo' : 'Inativo'}</span>
                      <Switch 
                        checked={analysis.enabled}
                        onCheckedChange={() => toggleAnalysis(index)}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pl-8">
                      <p className="text-sm">{analysis.description}</p>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Casos de Uso:</h4>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {analysis.useCases.map((useCase, i) => (
                            <li key={i}>{useCase}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Exemplo de Código:</h4>
                        <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                          {analysis.pythonModule}
                        </pre>
                      </div>
                      
                      <p className="text-sm"><strong>Status:</strong> 
                        <span className={`ml-2 ${analysis.enabled ? 'text-green-500' : 'text-red-500'}`}>
                          {analysis.enabled ? 'Análise ativa' : 'Análise desativada'}
                        </span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MonitoringMetrics;
