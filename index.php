
<?php
/**
 * Frontend Redirector for React App
 * 
 * Este arquivo serve como ponto de entrada para servidores PHP,
 * redirecionando o tráfego para o aplicativo React.
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
error_log("Iniciando carregamento da aplicação React");

// Verificar se estamos acessando um arquivo JavaScript
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$extension = pathinfo($requestUri, PATHINFO_EXTENSION);

// Se for um arquivo JavaScript, garantir o tipo MIME correto
if ($extension === 'js' || $extension === 'mjs') {
    $filePath = __DIR__ . parse_url($requestUri, PHP_URL_PATH);
    
    if (file_exists($filePath) && is_file($filePath)) {
        header('Content-Type: application/javascript');
        readfile($filePath);
        exit;
    }
}

// Verificar se estamos acessando o arquivo diretamente
if (php_sapi_name() !== 'cli') {
    // Definir cabeçalhos adequados
    header('Content-Type: text/html; charset=utf-8');
    
    // Caminho do arquivo index.html
    $indexFile = '';
    $baseDir = __DIR__;
    
    // Verificar se o arquivo index.html existe
    if (file_exists($baseDir . '/index.html')) {
        $indexFile = $baseDir . '/index.html';
        error_log("Arquivo encontrado: index.html na raiz");
    } else if (file_exists($baseDir . '/dist/index.html')) {
        $indexFile = $baseDir . '/dist/index.html';
        error_log("Arquivo encontrado: index.html em dist/");
    } else {
        // Tentar encontrar em outras pastas comuns
        $possiblePaths = ['/public/index.html', '/build/index.html', '/www/index.html'];
        foreach ($possiblePaths as $path) {
            if (file_exists($baseDir . $path)) {
                $indexFile = $baseDir . $path;
                error_log("Arquivo encontrado: " . $path);
                break;
            }
        }
    }
    
    if (!empty($indexFile)) {
        error_log("Tentando servir arquivo: " . $indexFile);
        
        // Verificar se o arquivo pode ser lido
        if (is_readable($indexFile)) {
            // Ler e servir o arquivo
            $content = file_get_contents($indexFile);
            
            // Verifica se o conteúdo foi lido corretamente
            if ($content !== false) {
                // Verificar se os arquivos JS/CSS estão sendo carregados corretamente
                if (strpos($content, '<script') === false) {
                    error_log("AVISO: Não encontradas tags <script> no HTML");
                }
                
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
        error_log("Erro: Arquivo index.html não encontrado em nenhum local padrão");
        echo '<h1>Erro na configuração</h1>';
        echo '<p>Arquivo index.html não encontrado. Verifique se o build foi concluído corretamente.</p>';
        echo '<p>Diretório atual: ' . $baseDir . '</p>';
        
        // Listar arquivos do diretório atual para debug
        echo '<p>Arquivos no diretório raiz:</p><pre>';
        print_r(scandir($baseDir));
        echo '</pre>';
        
        // Se existir o diretório dist, mostrar seu conteúdo também
        if (is_dir($baseDir . '/dist')) {
            echo '<p>Arquivos no diretório dist:</p><pre>';
            print_r(scandir($baseDir . '/dist'));
            echo '</pre>';
        }
    }
    exit;
}
?>
