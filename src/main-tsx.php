<?php
/**
 * Servidor para o arquivo main.tsx
 * 
 * Este arquivo serve o main.tsx com o tipo MIME correto.
 */

// Caminho para o arquivo main.tsx
$filePath = __DIR__ . '/main.tsx';

// Verificar se o arquivo existe
if (file_exists($filePath) && is_file($filePath)) {
    // Definir o cabeçalho Content-Type para JavaScript module
    header('Content-Type: application/javascript; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    
    // Desativar cache
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Enviar o conteúdo do arquivo
    readfile($filePath);
    exit;
} else {
    // Se o arquivo não existir, retornar erro 404
    http_response_code(404);
    echo 'Arquivo não encontrado';
}
?>
