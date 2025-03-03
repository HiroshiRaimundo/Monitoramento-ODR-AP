
export const pandasScriptTemplate = (siteUrl: string, siteName: string) => `
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import requests
from bs4 import BeautifulSoup

# Configurações do site a ser monitorado
SITE_URL = "${siteUrl}"
SITE_NAME = "${siteName}"

# Função para coletar dados do site
def coletar_dados():
    try:
        response = requests.get(SITE_URL)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Aqui você deve personalizar a extração conforme a estrutura do site
        # Este é apenas um exemplo genérico
        dados = []
        tabelas = soup.find_all('table')
        
        for tabela in tabelas:
            for linha in tabela.find_all('tr'):
                colunas = linha.find_all('td')
                if colunas:
                    dados.append([col.text.strip() for col in colunas])
        
        # Criar DataFrame
        df = pd.DataFrame(dados)
        return df
    except Exception as e:
        print(f"Erro ao coletar dados de {SITE_NAME}: {str(e)}")
        return pd.DataFrame()

# Análise dos dados
def analisar_dados(df):
    if df.empty:
        print("Sem dados para analisar")
        return
    
    # Resumo estatístico
    print("Resumo estatístico:")
    print(df.describe())
    
    # Visualizações básicas
    try:
        plt.figure(figsize=(10, 6))
        df.iloc[:, 0].value_counts().plot(kind='bar')
        plt.title(f'Análise de {SITE_NAME}')
        plt.tight_layout()
        plt.savefig(f'{SITE_NAME.replace(" ", "_")}_analise.png')
    except Exception as e:
        print(f"Erro ao gerar visualização: {str(e)}")

# Execução principal
if __name__ == "__main__":
    print(f"Iniciando monitoramento de {SITE_NAME}")
    df = coletar_dados()
    if not df.empty:
        df.to_csv(f'{SITE_NAME.replace(" ", "_")}_dados.csv', index=False)
        print(f"Dados salvos em {SITE_NAME.replace(' ', '_')}_dados.csv")
        analisar_dados(df)
`;

export const jupyterNotebookTemplate = (siteUrl: string, siteName: string) => `
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Análise de Dados: ${siteName}\\n",
    "Este notebook demonstra como analisar os dados coletados do site ${siteUrl}"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\\n",
    "import numpy as np\\n",
    "import matplotlib.pyplot as plt\\n",
    "import seaborn as sns\\n",
    "import requests\\n",
    "from bs4 import BeautifulSoup\\n",
    "\\n",
    "# Configuração visual\\n",
    "plt.style.use('ggplot')\\n",
    "sns.set(style='whitegrid')\\n",
    "%matplotlib inline"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Configurações do site a ser monitorado\\n",
    "SITE_URL = \\"${siteUrl}\\"\\n",
    "SITE_NAME = \\"${siteName}\\"\\n",
    "\\n",
    "print(f\\"Analisando dados de {SITE_NAME}\\")\\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Função para coletar dados do site\\n",
    "def coletar_dados():\\n",
    "    try:\\n",
    "        response = requests.get(SITE_URL)\\n",
    "        response.raise_for_status()\\n",
    "        \\n",
    "        soup = BeautifulSoup(response.text, 'html.parser')\\n",
    "        \\n",
    "        # Personalizar a extração para este site específico\\n",
    "        # Este é apenas um exemplo genérico\\n",
    "        dados = []\\n",
    "        tabelas = soup.find_all('table')\\n",
    "        \\n",
    "        for tabela in tabelas:\\n",
    "            for linha in tabela.find_all('tr'):\\n",
    "                colunas = linha.find_all('td')\\n",
    "                if colunas:\\n",
    "                    dados.append([col.text.strip() for col in colunas])\\n",
    "        \\n",
    "        # Criar DataFrame\\n",
    "        df = pd.DataFrame(dados)\\n",
    "        return df\\n",
    "    except Exception as e:\\n",
    "        print(f\\"Erro ao coletar dados: {str(e)}\\")\\n",
    "        return pd.DataFrame()\\n",
    "\\n",
    "# Coletar dados\\n",
    "df = coletar_dados()\\n",
    "df.head()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Análise Exploratória"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Análise estatística básica\\n",
    "df.describe()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Visualizações\\n",
    "plt.figure(figsize=(10, 6))\\n",
    "try:\\n",
    "    df.iloc[:, 0].value_counts().plot(kind='bar')\\n",
    "    plt.title(f'Análise de {SITE_NAME}')\\n",
    "    plt.tight_layout()\\n",
    "except:\\n",
    "    print(\\"Erro ao gerar visualização com os dados disponíveis\\")\\n",
    "plt.show()"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.10"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
`;

export const powerBIScriptTemplate = (siteName: string) => `
# Power BI Script - Análise de ${siteName}

# 1. Importar os dados do site monitorado
let
    Source = Csv.Document(File.Contents("C:\\Dados\\${siteName.replace(/ /g, "_")}_dados.csv"),[Delimiter=",", Columns=25, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Cabeçalhos Promovidos" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Tipo Alterado" = Table.TransformColumnTypes(#"Cabeçalhos Promovidos",{{"Data", type date}})
in
    #"Tipo Alterado"

# 2. Criar medidas para análise
Total de Registros = COUNTROWS('${siteName.replace(/ /g, "_")}_dados')

Registros por Mês = 
CALCULATE(
    COUNTROWS('${siteName.replace(/ /g, "_")}_dados'),
    DATESBETWEEN('${siteName.replace(/ /g, "_")}_dados'[Data], STARTOFMONTH('${siteName.replace(/ /g, "_")}_dados'[Data]), ENDOFMONTH('${siteName.replace(/ /g, "_")}_dados'[Data]))
)
`;

export const templates = {
  pandas: pandasScriptTemplate,
  jupyter: jupyterNotebookTemplate,
  powerbi: powerBIScriptTemplate
};
