
<?php
/**
 * Headers Helper para Hostinger
 * 
 * Este arquivo ajuda a configurar os cabeçalhos corretos para arquivos JavaScript
 * quando servidos como módulos ES6 em servidores compartilhados como a Hostinger.
 */

// Função para obter o tipo MIME baseado na extensão do arquivo
function getMimeType($filename) {
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    
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
        'mp4' => 'video/mp4',
        'webm' => 'video/webm',
        'mp3' => 'audio/mpeg',
        'wav' => 'audio/wav',
        'pdf' => 'application/pdf',
        'zip' => 'application/zip',
        'ico' => 'image/x-icon'
    ];
    
    return isset($mimeTypes[$ext]) ? $mimeTypes[$ext] : 'application/octet-stream';
}

// Obter o caminho do arquivo solicitado
$requestUri = $_SERVER['REQUEST_URI'];
$filePath = parse_url($requestUri, PHP_URL_PATH);

// Verificar se o arquivo existe
$fullPath = __DIR__ . $filePath;

if (file_exists($fullPath) && is_file($fullPath)) {
    // Obter o tipo MIME
    $mimeType = getMimeType($fullPath);
    
    // Definir os cabeçalhos apropriados
    header("Content-Type: $mimeType");
    
    // Para JavaScript modules, garantir que o tipo MIME esteja correto
    if (pathinfo($fullPath, PATHINFO_EXTENSION) === 'js') {
        header("Content-Type: application/javascript");
    }
    
    // Enviar o arquivo
    readfile($fullPath);
    exit;
}

// Se o arquivo não existir, redirecionar para o index.html (SPA)
include __DIR__ . '/index.html';
?>
