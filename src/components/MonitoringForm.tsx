import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MonitoringItem {
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
}

interface MonitoringFormProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
}

const transparenciaSpiderCode = `
import scrapy
from observatorio.items import DespesaPublicaItem

class PortalTransparenciaSpider(scrapy.Spider):
    name = 'portal_transparencia'
    allowed_domains = ['portaltransparencia.gov.br']
    start_urls = ['http://www.portaltransparencia.gov.br/despesas']
    
    def parse(self, response):
        # Encontrar todas as linhas de despesas na tabela
        for linha in response.css('table.listagem tbody tr'):
            despesa = DespesaPublicaItem()
            
            # Extrair dados de cada coluna
            despesa['orgao'] = linha.css('td:nth-child(1)::text').get()
            despesa['acao'] = linha.css('td:nth-child(2)::text').get()
            despesa['programa'] = linha.css('td:nth-child(3)::text').get()
            despesa['valor_empenhado'] = self.parse_valor(linha.css('td:nth-child(4)::text').get())
            despesa['valor_liquidado'] = self.parse_valor(linha.css('td:nth-child(5)::text').get())
            despesa['data_atualizacao'] = self.parse_data(linha.css('td:nth-child(6)::text').get())
            
            # Enviar o item para processamento
            yield despesa
            
        # Paginação - ir para a próxima página se existir
        next_page = response.css('a.next-page::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)
    
    def parse_valor(self, valor_texto):
        # Converter texto "R$ 1.234.567,89" para float 1234567.89
        if not valor_texto:
            return 0.0
        return float(valor_texto.replace('R$', '').replace('.', '').replace(',', '.').strip())
    
    def parse_data(self, data_texto):
        # Converter formato de data brasileira para ISO
        if not data_texto:
            return None
        # Exemplo simplificado, podem ser necessários ajustes conforme o formato
        dia, mes, ano = data_texto.split('/')
        return f"{ano}-{mes}-{dia}"
`;

const diarioOficialSpiderCode = `
import scrapy
import re
from datetime import datetime
from observatorio.items import DiarioOficialItem

class DiarioOficialSpider(scrapy.Spider):
    name = 'diario_oficial'
    allowed_domains = ['in.gov.br']
    start_urls = ['https://www.in.gov.br/leiturajornal']
    
    def parse(self, response):
        # Encontrar todas as edições disponíveis
        for edicao in response.css('div.edicao-container'):
            data_texto = edicao.css('span.data-edicao::text').get()
            
            # Extrair links para as seções do diário
            for secao in edicao.css('a.link-secao'):
                item = DiarioOficialItem()
                item['data_publicacao'] = self.parse_data(data_texto)
                item['secao'] = secao.css('::text').get().strip()
                item['url'] = secao.css('::attr(href)').get()
                
                # Seguir o link para extrair o conteúdo da seção
                yield response.follow(
                    item['url'], 
                    self.parse_secao, 
                    meta={'item': item}
                )
    
    def parse_secao(self, response):
        item = response.meta['item']
        
        # Extrair todas as publicações da seção
        for publicacao in response.css('div.publicacao-container'):
            item['titulo'] = publicacao.css('h2.titulo-publicacao::text').get()
            item['orgao'] = publicacao.css('span.orgao::text').get()
            item['conteudo'] = "\\n".join(publicacao.css('div.texto-dou ::text').getall())
            
            # Tentar extrair palavras-chave do conteúdo
            item['palavras_chave'] = self.extrair_palavras_chave(item['conteudo'])
            
            yield item
    
    def parse_data(self, data_texto):
        # Converter formato "DD/MM/YYYY" para ISO
        if not data_texto:
            return None
        match = re.search(r'(\\d{2})/(\\d{2})/(\\d{4})', data_texto)
        if match:
            dia, mes, ano = match.groups()
            return f"{ano}-{mes}-{dia}"
        return None
    
    def extrair_palavras_chave(self, texto):
        # Método simples para extrair possíveis palavras-chave
        # Em uma implementação real, usaríamos NLP mais avançado
        palavras_importantes = [
            'licitação', 'contrato', 'portaria', 'decreto',
            'lei', 'orçamento', 'concurso', 'nomeação'
        ]
        encontradas = []
        for palavra in palavras_importantes:
            if re.search(r'\\b' + palavra + r'\\b', texto.lower()):
                encontradas.append(palavra)
        return encontradas
`;

const ibgeSpiderCode = `
import scrapy
import json
from observatorio.items import IndicadorSocioeconomicoItem

class IBGESpider(scrapy.Spider):
    name = 'ibge_indicadores'
    allowed_domains = ['api.ibge.gov.br', 'servicodados.ibge.gov.br']
    
    # Lista de APIs e indicadores a serem consultados
    apis = [
        {
            'url': 'https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/1419',
            'indicador': 'PIB',
            'descricao': 'Produto Interno Bruto'
        },
        {
            'url': 'https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/28141',
            'indicador': 'IPCA',
            'descricao': 'Índice Nacional de Preços ao Consumidor Amplo'
        }
    ]
    
    def start_requests(self):
        # Iniciar requisições para cada API definida
        for api in self.apis:
            yield scrapy.Request(
                url=api['url'],
                callback=self.parse,
                meta={'api_info': api}
            )
    
    def parse(self, response):
        api_info = response.meta['api_info']
        
        # Processar resposta JSON da API
        try:
            dados = json.loads(response.text)
            
            # Iterar pelos resultados (cada indicador pode ter múltiplos períodos/localidades)
            for resultado in dados:
                nome_indicador = resultado.get('indicador', api_info['indicador'])
                
                # Extrair séries históricas
                series = resultado.get('series', [{}])[0]
                localidades = series.get('localidade', {})
                
                # Para cada localidade, extrair valores e datas
                for localidade_id, valores in localidades.items():
                    for data, valor in valores.items():
                        item = IndicadorSocioeconomicoItem()
                        item['indicador'] = nome_indicador
                        item['descricao'] = api_info['descricao']
                        item['localidade_id'] = localidade_id
                        item['data_referencia'] = data
                        item['valor'] = valor.get('v') if isinstance(valor, dict) else valor
                        item['unidade'] = resultado.get('unidade', {}).get('id')
                        item['fonte'] = 'IBGE'
                        
                        yield item
                        
        except json.JSONDecodeError:
            self.logger.error(f"Erro ao processar JSON da API: {api_info['url']}")
        except Exception as e:
            self.logger.error(f"Erro ao processar dados: {str(e)}")
`;

const apiExampleCode = `
import axios from 'axios';

// Configuração da API para monitoramento
const API_URL = "https://api.exemplo.com/dados";
const API_KEY = process.env.API_KEY; // Chave armazenada em variável de ambiente

// Função para buscar dados da API
async function fetchApiData() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      params: {
        region: 'amapa',
        from_date: '2023-01-01',
        to_date: '2023-12-31'
      }
    });
    
    // Processar os dados recebidos
    const data = response.data;
    console.log('Dados obtidos com sucesso:', data);
    
    // Salvar os dados processados
    await saveDataToDatabase(data);
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
}

// Função para salvar os dados em banco
async function saveDataToDatabase(data) {
  // Implementação do armazenamento dos dados
  // Pode usar PostgreSQL, MongoDB, etc.
  console.log('Salvando dados no banco...');
}

// Agendamento da execução do monitoramento
const schedule = require('node-schedule');

// Executa todos os dias às 3:00 da manhã
schedule.scheduleJob('0 3 * * *', async () => {
  console.log('Iniciando coleta de dados agendada...');
  try {
    await fetchApiData();
    console.log('Coleta de dados concluída com sucesso!');
  } catch (err) {
    console.error('Erro na coleta agendada:', err);
  }
});
`;

const MonitoringForm: React.FC<MonitoringFormProps> = ({ form, onSubmit }) => {
  const [activeSpider, setActiveSpider] = React.useState("transparencia");

  const spiderExamples = {
    transparencia: {
      title: "Portal de Transparência",
      description: "Spider para coleta de dados de despesas públicas do Portal da Transparência",
      code: transparenciaSpiderCode,
      path: "observatorio/spiders/governo/transparencia.py"
    },
    diario: {
      title: "Diário Oficial",
      description: "Spider para monitoramento de publicações no Diário Oficial da União",
      code: diarioOficialSpiderCode,
      path: "observatorio/spiders/governo/diario_oficial.py"
    },
    ibge: {
      title: "IBGE API",
      description: "Spider para coleta de indicadores socioeconômicos via API do IBGE",
      code: ibgeSpiderCode,
      path: "observatorio/spiders/indicadores/ibge.py"
    },
    api: {
      title: "Monitoramento via API",
      description: "Exemplo de código para monitoramento via endpoints de API",
      code: apiExampleCode,
      path: "observatorio/api/monitoring.js"
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistema de Monitoramento</CardTitle>
        <CardDescription>
          Gerencie monitoramentos automáticos de fontes de dados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="form">Adicionar Monitoramento</TabsTrigger>
            <TabsTrigger value="examples">Exemplos de Spiders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Monitoramento</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Índice de Desmatamento - Amazônia Legal" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Fonte</FormLabel>
                      <FormControl>
                        <Input placeholder="https://dados.gov.br/exemplo" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="api_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da API (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://api.exemplo.com/dados" {...field} />
                      </FormControl>
                      <FormDescription>
                        Insira o endpoint da API para monitoramento via integração direta
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value="governo">Governo</option>
                          <option value="indicadores">Indicadores</option>
                          <option value="legislacao">Legislação</option>
                          <option value="api">API</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequência de Atualização</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Selecione uma frequência</option>
                          <option value="diario">Diário</option>
                          <option value="semanal">Semanal</option>
                          <option value="quinzenal">Quinzenal</option>
                          <option value="mensal">Mensal</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">Adicionar Monitoramento</Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="examples">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button 
                  variant={activeSpider === "transparencia" ? "default" : "outline"}
                  onClick={() => setActiveSpider("transparencia")}
                >
                  Portal Transparência
                </Button>
                <Button 
                  variant={activeSpider === "diario" ? "default" : "outline"}
                  onClick={() => setActiveSpider("diario")}
                >
                  Diário Oficial
                </Button>
                <Button 
                  variant={activeSpider === "ibge" ? "default" : "outline"}
                  onClick={() => setActiveSpider("ibge")}
                >
                  IBGE
                </Button>
                <Button 
                  variant={activeSpider === "api" ? "default" : "outline"}
                  onClick={() => setActiveSpider("api")}
                >
                  API
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">{spiderExamples[activeSpider].title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{spiderExamples[activeSpider].description}</p>
                <p className="text-xs font-mono text-muted-foreground mb-3">{spiderExamples[activeSpider].path}</p>
                
                <div className="bg-muted rounded-md overflow-hidden">
                  {/* <SyntaxHighlighter 
                    language={activeSpider === "api" ? "javascript" : "python"} 
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                    showLineNumbers={true}
                  >
                    {spiderExamples[activeSpider].code.trim()}
                  </SyntaxHighlighter> */}
                  <pre>
                    <code>
                      {spiderExamples[activeSpider].code.trim()}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MonitoringForm;
