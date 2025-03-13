<?php
/**
 * Diagnóstico do Servidor
 * 
 * Este arquivo verifica a configuração do servidor e exibe informações
 * úteis para diagnóstico de problemas com MIME types e módulos JavaScript.
 */

// Ativar exibição de erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Função para verificar se um módulo está carregado
function checkModule($moduleName) {
    return extension_loaded($moduleName) ? 'Sim' : 'Não';
}

// Função para verificar se uma função está disponível
function checkFunction($functionName) {
    return function_exists($functionName) ? 'Sim' : 'Não';
}

// Função para verificar se um arquivo existe e tem permissão de leitura
function checkFile($filePath) {
    if (!file_exists($filePath)) {
        return 'Não existe';
    }
    
    if (!is_readable($filePath)) {
        return 'Existe, mas não tem permissão de leitura';
    }
    
    return 'Existe e tem permissão de leitura';
}

// Obter informações do servidor
$serverInfo = [
    'PHP Version' => phpversion(),
    'Server Software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Desconhecido',
    'Server Name' => $_SERVER['SERVER_NAME'] ?? 'Desconhecido',
    'Server Protocol' => $_SERVER['SERVER_PROTOCOL'] ?? 'Desconhecido',
    'Document Root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Desconhecido',
    'Request URI' => $_SERVER['REQUEST_URI'] ?? 'Desconhecido',
    'Script Filename' => $_SERVER['SCRIPT_FILENAME'] ?? 'Desconhecido',
    'Server Admin' => $_SERVER['SERVER_ADMIN'] ?? 'Desconhecido',
    'Server Signature' => $_SERVER['SERVER_SIGNATURE'] ?? 'Desconhecido',
];

// Verificar módulos importantes
$moduleInfo = [
    'mod_rewrite' => checkFunction('apache_get_modules') && in_array('mod_rewrite', apache_get_modules()) ? 'Sim' : 'Desconhecido',
    'mod_headers' => checkFunction('apache_get_modules') && in_array('mod_headers', apache_get_modules()) ? 'Sim' : 'Desconhecido',
    'mod_mime' => checkFunction('apache_get_modules') && in_array('mod_mime', apache_get_modules()) ? 'Sim' : 'Desconhecido',
    'mod_expires' => checkFunction('apache_get_modules') && in_array('mod_expires', apache_get_modules()) ? 'Sim' : 'Desconhecido',
];

// Verificar arquivos importantes
$fileInfo = [
    'index.html' => checkFile(__DIR__ . '/index.html'),
    'index.php' => checkFile(__DIR__ . '/index.php'),
    '.htaccess' => checkFile(__DIR__ . '/.htaccess'),
    'js-proxy.php' => checkFile(__DIR__ . '/js-proxy.php'),
    'hostinger-config.php' => checkFile(__DIR__ . '/hostinger-config.php'),
    'dist/index.html' => checkFile(__DIR__ . '/dist/index.html'),
    'src/main.tsx' => checkFile(__DIR__ . '/src/main.tsx'),
];

// Verificar MIME types
$mimeTypes = [
    'js' => function_exists('mime_content_type') ? @mime_content_type(__DIR__ . '/src/main.tsx') : 'Função mime_content_type não disponível',
    'html' => function_exists('mime_content_type') ? @mime_content_type(__DIR__ . '/index.html') : 'Função mime_content_type não disponível',
];

// Exibir informações
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnóstico do Servidor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        h1, h2 {
            color: #0066cc;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .success {
            color: green;
        }
        .warning {
            color: orange;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Diagnóstico do Servidor</h1>
    
    <h2>Informações do Servidor</h2>
    <table>
        <tr>
            <th>Configuração</th>
            <th>Valor</th>
        </tr>
        <?php foreach ($serverInfo as $key => $value): ?>
        <tr>
            <td><?php echo htmlspecialchars($key); ?></td>
            <td><?php echo htmlspecialchars($value); ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    
    <h2>Módulos Apache</h2>
    <table>
        <tr>
            <th>Módulo</th>
            <th>Carregado</th>
        </tr>
        <?php foreach ($moduleInfo as $key => $value): ?>
        <tr>
            <td><?php echo htmlspecialchars($key); ?></td>
            <td class="<?php echo $value === 'Sim' ? 'success' : ($value === 'Não' ? 'error' : 'warning'); ?>">
                <?php echo htmlspecialchars($value); ?>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
    
    <h2>Arquivos Importantes</h2>
    <table>
        <tr>
            <th>Arquivo</th>
            <th>Status</th>
        </tr>
        <?php foreach ($fileInfo as $key => $value): ?>
        <tr>
            <td><?php echo htmlspecialchars($key); ?></td>
            <td class="<?php echo $value === 'Existe e tem permissão de leitura' ? 'success' : 'error'; ?>">
                <?php echo htmlspecialchars($value); ?>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
    
    <h2>MIME Types</h2>
    <table>
        <tr>
            <th>Extensão</th>
            <th>MIME Type</th>
        </tr>
        <?php foreach ($mimeTypes as $key => $value): ?>
        <tr>
            <td><?php echo htmlspecialchars($key); ?></td>
            <td><?php echo htmlspecialchars($value); ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    
    <h2>Teste de JavaScript Module</h2>
    <div id="js-test-result">Testando carregamento de módulo JavaScript...</div>
    
    <script type="module">
        document.getElementById('js-test-result').textContent = 'Módulo JavaScript carregado com sucesso!';
    </script>
    
    <noscript>
        <p class="error">JavaScript está desativado no seu navegador.</p>
    </noscript>
</body>
</html>
