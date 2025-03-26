
<?php
/**
 * Configuração específica para Hostinger
 * 
 * Este arquivo contém configurações específicas para a hospedagem na Hostinger.
 * Inclua este arquivo no início do seu index.php para aplicar as configurações.
 */

// Configurações de erro
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/hostinger-error.log');

// Função para verificar se estamos na Hostinger
function isHostinger() {
    $serverName = $_SERVER['SERVER_NAME'] ?? '';
    $hostingerSignatures = [
        'hostinger',
        '.hstgr.',
        '.web-hosting.',
    ];
    
    foreach ($hostingerSignatures as $signature) {
        if (strpos($serverName, $signature) !== false) {
            return true;
        }
    }
    
    return false;
}

// Função para modificar o HTML para usar o proxy JS
function modifyHtmlForHostinger($html) {
    // Substituir scripts de módulo para usar o proxy
    $html = preg_replace(
        '/<script type="module" src="(\/[^"]+\.js)"><\/script>/',
        '<script type="module" src="/js-proxy.php?file=$1"></script>',
        $html
    );
    
    return $html;
}

// Função para servir arquivos estáticos com o tipo MIME correto
function serveStaticFile($filePath) {
    $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    
    $mimeTypes = [
        'js' => 'application/javascript',
        'mjs' => 'application/javascript',
        'css' => 'text/css',
        'html' => 'text/html',
        'json' => 'application/json',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'otf' => 'font/otf',
        'eot' => 'application/vnd.ms-fontobject',
    ];
    
    $mimeType = $mimeTypes[$extension] ?? 'application/octet-stream';
    
    header("Content-Type: $mimeType");
    header('X-Content-Type-Options: nosniff');
    readfile($filePath);
    exit;
}

// Verificar se estamos acessando um arquivo estático
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$extension = strtolower(pathinfo($requestUri, PATHINFO_EXTENSION));

// Lista de extensões de arquivos estáticos
$staticExtensions = ['js', 'mjs', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'woff', 'woff2', 'ttf', 'otf', 'eot', 'ico'];

// Se for um arquivo estático, servir com o tipo MIME correto
if (in_array($extension, $staticExtensions)) {
    $filePath = __DIR__ . parse_url($requestUri, PHP_URL_PATH);
    
    if (file_exists($filePath) && is_file($filePath)) {
        serveStaticFile($filePath);
    }
}
?>
