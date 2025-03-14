<?php
/**
 * JavaScript/CSS Proxy para Hostinger
 * 
 * Este arquivo serve como um proxy para arquivos JavaScript e CSS,
 * garantindo que sejam servidos com o tipo MIME correto.
 * 
 * Uso: js-proxy.php?file=/caminho/para/arquivo.js
 */

// Ativar exibição de erros para debugging
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

// Log de erros
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/js-proxy-error.log');

// Verificar se o parâmetro file foi fornecido
if (!isset($_GET['file']) || empty($_GET['file'])) {
    http_response_code(400);
    exit('Parâmetro "file" não fornecido');
}

// Obter o caminho do arquivo
$filePath = $_GET['file'];

// Verificar se o caminho contém "../" para evitar directory traversal
if (strpos($filePath, '../') !== false) {
    http_response_code(403);
    exit('Acesso negado');
}

// Construir o caminho completo do arquivo
$fullPath = __DIR__ . $filePath;

// Verificar se o arquivo existe
if (!file_exists($fullPath) || !is_file($fullPath)) {
    http_response_code(404);
    exit('Arquivo não encontrado');
}

// Verificar a extensão do arquivo
$extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));

// Definir o cabeçalho Content-Type apropriado
if ($extension === 'js' || $extension === 'mjs') {
    header('Content-Type: application/javascript');
} elseif ($extension === 'css') {
    header('Content-Type: text/css');
} else {
    http_response_code(403);
    exit('Tipo de arquivo não permitido');
}

// Adicionar cabeçalho de segurança
header('X-Content-Type-Options: nosniff');

// Enviar o conteúdo do arquivo
readfile($fullPath);
exit;
?>