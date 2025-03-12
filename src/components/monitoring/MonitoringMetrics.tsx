import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Code, Database, FileText, Image, Link, Code2, Layout, Shield, Key, GitBranch } from "lucide-react";

interface MetricItem {
  icon: React.ReactNode;
  title: string;
  function: string;
  usage: string;
}

const metrics: MetricItem[] = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Tempo de Resposta",
    function: "Monitora o tempo que o servidor leva para responder às requisições.",
    usage: "Identifica gargalos de desempenho."
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: "Código de Status",
    function: "Verifica os códigos de status HTTP (ex: 200, 404, 500).",
    usage: "Detecta erros ou respostas inesperadas."
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Tamanho do Conteúdo",
    function: "Monitora alterações no tamanho do conteúdo enviado.",
    usage: "Identifica mudanças que podem afetar o desempenho."
  },
  {
    icon: <Code className="h-5 w-5" />,
    title: "Estrutura HTML",
    function: "Detecta mudanças na estrutura HTML.",
    usage: "Garante que a estrutura do site não seja alterada acidentalmente."
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Meta Tags",
    function: "Monitora alterações em meta tags.",
    usage: "Assegura que informações importantes, como SEO, permaneçam consistentes."
  },
  {
    icon: <Link className="h-5 w-5" />,
    title: "Links",
    function: "Verifica links quebrados e alterações.",
    usage: "Mantém a integridade dos links internos e externos."
  },
  {
    icon: <Image className="h-5 w-5" />,
    title: "Imagens",
    function: "Monitora alterações em imagens.",
    usage: "Detecta mudanças não autorizadas ou problemas de carregamento."
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "JavaScript",
    function: "Detecta mudanças em scripts.",
    usage: "Garante que o comportamento do site não seja afetado por alterações inesperadas."
  },
  {
    icon: <Layout className="h-5 w-5" />,
    title: "CSS",
    function: "Monitora alterações no estilo.",
    usage: "Mantém a consistência visual do site."
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Headers HTTP",
    function: "Monitora headers de resposta.",
    usage: "Verifica se as configurações de segurança e cache estão corretas."
  },
  {
    icon: <Key className="h-5 w-5" />,
    title: "Certificado SSL",
    function: "Verifica a validade do certificado SSL.",
    usage: "Assegura que a conexão seja segura e confiável."
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Redirecionamentos",
    function: "Monitora a cadeia de redirecionamentos.",
    usage: "Evita loops de redirecionamento ou redirecionamentos incorretos."
  }
];

const MonitoringMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas de Monitoramento</CardTitle>
        <CardDescription>
          Métricas disponíveis e suas funções no sistema de monitoramento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {metrics.map((metric, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="flex items-center gap-2">
                {metric.icon}
                {metric.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-8">
                  <p className="text-sm"><strong>Função:</strong> {metric.function}</p>
                  <p className="text-sm"><strong>Uso:</strong> {metric.usage}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MonitoringMetrics;
