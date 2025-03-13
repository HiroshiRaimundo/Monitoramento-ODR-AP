<?php
/**
 * TSX Handler para Hostinger
 * 
 * Este arquivo serve arquivos TSX como JavaScript para o navegador.
 */

// Obter o caminho do arquivo solicitado
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$filePath = parse_url($requestUri, PHP_URL_PATH);

// Verificar se é um arquivo TSX
if (pathinfo($filePath, PATHINFO_EXTENSION) === 'tsx') {
    $fullPath = __DIR__ . $filePath;
    
    // Verificar se o arquivo existe
    if (file_exists($fullPath) && is_file($fullPath)) {
        // Definir o cabeçalho Content-Type para JavaScript
        header('Content-Type: application/javascript');
        
        // Enviar o conteúdo do arquivo
        readfile($fullPath);
        exit;
    }
}

// Se não for um arquivo TSX ou o arquivo não existir, redirecionar para o index.html
include __DIR__ . '/index.html';
?>
