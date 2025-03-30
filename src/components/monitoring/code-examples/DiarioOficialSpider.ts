
export const diarioOficialSpiderCode = `
import scrapy
import re
import os
import tempfile
from datetime import datetime
from scrapy.http import Request
import PyPDF2
from io import BytesIO
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
                
                # Verificar se o link é para um PDF
                if item['url'] and item['url'].endswith('.pdf'):
                    # Baixar diretamente o PDF
                    yield Request(
                        url=item['url'],
                        callback=self.parse_pdf,
                        meta={'item': item}
                    )
                else:
                    # Se não for PDF, seguir o link para encontrar os PDFs na página
                    yield response.follow(
                        item['url'], 
                        self.parse_secao, 
                        meta={'item': item}
                    )
    
    def parse_secao(self, response):
        item = response.meta['item']
        
        # Buscar links de PDF na página
        pdf_links = response.css('a[href$=".pdf"]::attr(href)').getall()
        
        if pdf_links:
            # Se encontrou PDFs, baixar cada um
            for pdf_link in pdf_links:
                yield Request(
                    url=pdf_link,
                    callback=self.parse_pdf,
                    meta={'item': item.copy()}
                )
        else:
            # Se não encontrou PDFs, extrair as publicações normalmente como HTML
            for publicacao in response.css('div.publicacao-container'):
                item['titulo'] = publicacao.css('h2.titulo-publicacao::text').get()
                item['orgao'] = publicacao.css('span.orgao::text').get()
                item['conteudo'] = "\\n".join(publicacao.css('div.texto-dou ::text').getall())
                
                # Tentar extrair palavras-chave do conteúdo
                item['palavras_chave'] = self.extrair_palavras_chave(item['conteudo'])
                
                yield item
    
    def parse_pdf(self, response):
        """Processa o arquivo PDF baixado."""
        item = response.meta['item']
        
        try:
            # Converter resposta para BytesIO para processamento do PDF
            pdf_file = BytesIO(response.body)
            
            # Usar PyPDF2 para extrair o texto
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            # Extrair texto de todas as páginas
            text_content = ""
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text_content += page.extract_text() + "\\n"
            
            # Atualizar o item com informações extraídas do PDF
            # Tentar extrair um título do início do texto
            linhas = text_content.split('\\n')
            item['titulo'] = next((linha.strip() for linha in linhas if linha.strip()), 'Documento sem título')
            
            # Tentar identificar o órgão a partir do texto
            item['orgao'] = self.extrair_orgao(text_content)
            item['conteudo'] = text_content
            item['formato'] = 'PDF'
            item['tamanho'] = len(response.body)
            item['nome_arquivo'] = os.path.basename(response.url)
            
            # Extrair palavras-chave do conteúdo do PDF
            item['palavras_chave'] = self.extrair_palavras_chave(text_content)
            
            self.logger.info(f"PDF processado com sucesso: {item['nome_arquivo']}")
            
            yield item
            
        except Exception as e:
            self.logger.error(f"Erro ao processar PDF {response.url}: {str(e)}")
    
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
        # Método melhorado para extrair possíveis palavras-chave
        palavras_importantes = [
            'licitação', 'contrato', 'portaria', 'decreto',
            'lei', 'orçamento', 'concurso', 'nomeação',
            'edital', 'pregão', 'convênio', 'acordo', 'termo',
            'resolução', 'projeto', 'processo', 'aditivo'
        ]
        encontradas = []
        
        if not texto:
            return encontradas
            
        texto_lower = texto.lower()
        for palavra in palavras_importantes:
            if re.search(r'\\b' + palavra + r'\\b', texto_lower):
                encontradas.append(palavra)
                
        return encontradas
    
    def extrair_orgao(self, texto):
        # Tentar extrair o nome do órgão do texto
        orgaos_comuns = [
            'Ministério', 'Secretaria', 'Instituto', 'Agência',
            'Fundação', 'Conselho', 'Departamento', 'Diretoria'
        ]
        
        if not texto:
            return "Órgão não identificado"
            
        # Buscar por padrões comuns de nomes de órgãos
        for orgao in orgaos_comuns:
            match = re.search(r'(' + orgao + r'[^\\n.]{5,50})', texto)
            if match:
                return match.group(1).strip()
                
        return "Órgão não identificado"

# Importante: Para usar este spider, você precisará instalar as seguintes dependências:
# pip install scrapy PyPDF2
`;

