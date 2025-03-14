
<?php
/**
 * Frontend Redirector for Simple HTML/CSS/JS App
 * 
 * Este arquivo serve como ponto de entrada para servidores PHP,
 * redirecionando o tráfego para o aplicativo HTML/CSS/JS.
 */

// Incluir configuração específica para Hostinger
if (file_exists(__DIR__ . '/hostinger-config.php')) {
    include_once __DIR__ . '/hostinger-config.php';
}

// Ativar exibição de erros para debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Log de erros
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');
error_log("Iniciando carregamento da aplicação");

// Verificar se estamos acessando um arquivo JavaScript ou CSS
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$extension = pathinfo($requestUri, PATHINFO_EXTENSION);

// Se for um arquivo estático, garantir o tipo MIME correto
if (in_array($extension, ['js', 'mjs', 'css'])) {
    $filePath = __DIR__ . parse_url($requestUri, PHP_URL_PATH);
    
    if (file_exists($filePath) && is_file($filePath)) {
        if ($extension === 'js' || $extension === 'mjs') {
            header('Content-Type: application/javascript');
        } else if ($extension === 'css') {
            header('Content-Type: text/css');
        }
        header('X-Content-Type-Options: nosniff');
        readfile($filePath);
        exit;
    }
}

// Verificar se estamos acessando o arquivo diretamente
if (php_sapi_name() !== 'cli') {
    // Definir cabeçalhos adequados
    header('Content-Type: text/html; charset=utf-8');
    
    // Caminho do arquivo index.html
    $indexFile = __DIR__ . '/index.html';
    
    // Verificar se o arquivo index.html existe
    if (file_exists($indexFile)) {
        error_log("Arquivo encontrado: index.html na raiz");
        
        // Verificar se o arquivo pode ser lido
        if (is_readable($indexFile)) {
            // Ler e servir o arquivo
            $content = file_get_contents($indexFile);
            
            // Verifica se o conteúdo foi lido corretamente
            if ($content !== false) {
                // Modificar o HTML para a Hostinger se necessário
                if (function_exists('isHostinger') && isHostinger() && function_exists('modifyHtmlForHostinger')) {
                    $content = modifyHtmlForHostinger($content);
                    error_log("HTML modificado para Hostinger");
                }
                
                echo $content;
                error_log("Arquivo servido com sucesso");
            } else {
                http_response_code(500);
                error_log("Erro: Conteúdo não pôde ser lido de " . $indexFile);
                echo '<h1>Erro ao ler o arquivo</h1>';
                echo '<p>Não foi possível ler o conteúdo do arquivo index.html. Verifique os logs para mais detalhes.</p>';
            }
        } else {
            http_response_code(500);
            error_log("Erro: Arquivo não tem permissão de leitura: " . $indexFile);
            echo '<h1>Erro de permissão</h1>';
            echo '<p>O arquivo index.html foi encontrado, mas não pode ser lido devido a permissões. Verifique as permissões do arquivo.</p>';
            echo '<p>Caminho do arquivo: ' . $indexFile . '</p>';
            echo '<p>Permissões atuais: ' . substr(sprintf('%o', fileperms($indexFile)), -4) . '</p>';
        }
    } else {
        // Erro se não encontrar o arquivo
        http_response_code(500);
        error_log("Erro: Arquivo index.html não encontrado");
        echo '<h1>Erro na configuração</h1>';
        echo '<p>Arquivo index.html não encontrado. Verifique se os arquivos foram enviados corretamente.</p>';
        echo '<p>Diretório atual: ' . __DIR__ . '</p>';
        
        // Listar arquivos do diretório atual para debug
        echo '<p>Arquivos no diretório raiz:</p><pre>';
        print_r(scandir(__DIR__));
        echo '</pre>';
    }
    exit;
}
?>