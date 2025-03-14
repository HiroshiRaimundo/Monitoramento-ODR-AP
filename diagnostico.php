<?php
/**
 * Arquivo de diagnóstico para identificar problemas no servidor
 */

// Configurações de exibição de erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Cabeçalho HTML
echo '<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnóstico do Servidor</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 1200px; margin: 0 auto; }
        h1, h2 { color: #2c3e50; }
        .section { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .success { color: green; }
        .warning { color: orange; }
        .error { color: red; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
        pre { background: #f5f5f5; padding: 10px; overflow: auto; }
    </style>
</head>
<body>
    <h1>Diagnóstico do Servidor</h1>';

// Informações do servidor
echo '<div class="section">
    <h2>Informações do Servidor</h2>
    <table>
        <tr><th>Item</th><th>Valor</th></tr>
        <tr><td>PHP Version</td><td>' . phpversion() . '</td></tr>
        <tr><td>Server Software</td><td>' . ($_SERVER['SERVER_SOFTWARE'] ?? 'Desconhecido') . '</td></tr>
        <tr><td>Server Name</td><td>' . ($_SERVER['SERVER_NAME'] ?? 'Desconhecido') . '</td></tr>
        <tr><td>Document Root</td><td>' . ($_SERVER['DOCUMENT_ROOT'] ?? 'Desconhecido') . '</td></tr>
        <tr><td>Request URI</td><td>' . ($_SERVER['REQUEST_URI'] ?? 'Desconhecido') . '</td></tr>
        <tr><td>Script Filename</td><td>' . ($_SERVER['SCRIPT_FILENAME'] ?? 'Desconhecido') . '</td></tr>
    </table>
</div>';

// Verificar arquivos principais
echo '<div class="section">
    <h2>Verificação de Arquivos Principais</h2>
    <table>
        <tr><th>Arquivo</th><th>Status</th><th>Permissões</th><th>Tamanho</th></tr>';

$files_to_check = [
    'index.html',
    'index.php',
    'style.css',
    'script.js',
    '.htaccess',
    'js-proxy.php',
    'hostinger-config.php',
    'public/favicon.ico',
    'public/og-image.png'
];

foreach ($files_to_check as $file) {
    $exists = file_exists(__DIR__ . '/' . $file);
    $permissions = $exists ? substr(sprintf('%o', fileperms(__DIR__ . '/' . $file)), -4) : 'N/A';
    $size = $exists ? filesize(__DIR__ . '/' . $file) . ' bytes' : 'N/A';
    $status_class = $exists ? 'success' : 'error';
    $status_text = $exists ? 'Encontrado' : 'Não encontrado';
    
    echo '<tr>
        <td>' . $file . '</td>
        <td class="' . $status_class . '">' . $status_text . '</td>
        <td>' . $permissions . '</td>
        <td>' . $size . '</td>
    </tr>';
}

echo '</table>
</div>';

// Verificar extensões PHP
echo '<div class="section">
    <h2>Extensões PHP</h2>
    <table>
        <tr><th>Extensão</th><th>Status</th></tr>';

$required_extensions = [
    'json',
    'curl',
    'mbstring',
    'fileinfo'
];

foreach ($required_extensions as $ext) {
    $loaded = extension_loaded($ext);
    $status_class = $loaded ? 'success' : 'error';
    $status_text = $loaded ? 'Carregada' : 'Não carregada';
    
    echo '<tr>
        <td>' . $ext . '</td>
        <td class="' . $status_class . '">' . $status_text . '</td>
    </tr>';
}

echo '</table>
</div>';

// Verificar configurações do PHP
echo '<div class="section">
    <h2>Configurações do PHP</h2>
    <table>
        <tr><th>Configuração</th><th>Valor</th></tr>
        <tr><td>display_errors</td><td>' . ini_get('display_errors') . '</td></tr>
        <tr><td>max_execution_time</td><td>' . ini_get('max_execution_time') . '</td></tr>
        <tr><td>memory_limit</td><td>' . ini_get('memory_limit') . '</td></tr>
        <tr><td>post_max_size</td><td>' . ini_get('post_max_size') . '</td></tr>
        <tr><td>upload_max_filesize</td><td>' . ini_get('upload_max_filesize') . '</td></tr>
    </table>
</div>';

// Testar conexão com CDNs
echo '<div class="section">
    <h2>Teste de Conexão com CDNs</h2>
    <table>
        <tr><th>CDN</th><th>Status</th></tr>';

$cdns_to_check = [
    'https://cdn.jsdelivr.net' => 'jsDelivr',
    'https://unpkg.com' => 'Unpkg',
    'https://fonts.googleapis.com' => 'Google Fonts',
    'https://fonts.gstatic.com' => 'Google Fonts Static'
];

foreach ($cdns_to_check as $url => $name) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $success = ($http_code >= 200 && $http_code < 300);
    $status_class = $success ? 'success' : 'error';
    $status_text = $success ? 'Acessível (' . $http_code . ')' : 'Inacessível (' . $http_code . ')';
    
    echo '<tr>
        <td>' . $name . ' (' . $url . ')</td>
        <td class="' . $status_class . '">' . $status_text . '</td>
    </tr>';
}

echo '</table>
</div>';

// Listar arquivos no diretório
echo '<div class="section">
    <h2>Arquivos no Diretório Raiz</h2>
    <pre>';
print_r(scandir(__DIR__));
echo '</pre>
</div>';

// Rodapé
echo '<div class="section">
    <p>Diagnóstico gerado em: ' . date('Y-m-d H:i:s') . '</p>
</div>
</body>
</html>';
?>