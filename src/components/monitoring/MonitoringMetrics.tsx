
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Code, Database, FileText, Image, Link, Code2, Layout, Shield, Key, GitBranch, CheckCircle, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MetricItem {
  icon: React.ReactNode;
  title: string;
  function: string;
  usage: string;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas de Monitoramento</CardTitle>
        <CardDescription>
          Métricas disponíveis e suas funções no sistema de monitoramento
        </CardDescription>
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" onClick={enableAllMetrics} className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Ativar Todas
          </Button>
          <Button variant="outline" size="sm" onClick={disableAllMetrics} className="flex items-center gap-1">
            <XCircle className="h-4 w-4" />
            Desativar Todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {metrics.map((metric, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
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
      </CardContent>
    </Card>
  );
};

export default MonitoringMetrics;
