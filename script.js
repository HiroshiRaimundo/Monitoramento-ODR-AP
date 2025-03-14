// Configuração do Supabase
const SUPABASE_URL = "https://jiywqroiovphdultgaet.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppeXdxcm9pb3ZwaGR1bHRnYWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NzgwNTgsImV4cCI6MjA1NjI1NDA1OH0._auAk9bzk85D7BDy4OTEelHBHh68Z3xQ3Kn-BNoaE3I";

// Elementos DOM
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const contentElement = document.getElementById('content');
const monitoringListElement = document.getElementById('monitoring-list');

// Inicializar Supabase
let supabase;

// Função para inicializar o Supabase
function initSupabase() {
  try {
    // Verificar se o objeto supabase está disponível globalmente
    if (typeof supabase === 'undefined') {
      if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('Supabase inicializado com sucesso (via window.supabase)');
      } else {
        console.error('Erro: Objeto supabase não encontrado. Verifique se o script do Supabase foi carregado corretamente.');
        showError('Erro ao inicializar o banco de dados. Por favor, recarregue a página.');
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Erro ao inicializar Supabase:', error);
    showError('Erro ao inicializar o banco de dados. Por favor, recarregue a página.');
    return false;
  }
}

// Função para buscar os dados de monitoramento
async function fetchMonitoringItems() {
  if (!initSupabase()) return;
  
  try {
    // Buscar dados da tabela monitoring_items (ou outra tabela relevante)
    const { data, error } = await supabase
      .from('monitoring_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Se não houver dados, mostrar mensagem
    if (!data || data.length === 0) {
      monitoringListElement.innerHTML = '<p class="no-data">Nenhum item de monitoramento encontrado.</p>';
    } else {
      // Renderizar os itens de monitoramento
      renderMonitoringItems(data);
    }
    
    // Esconder loading e mostrar conteúdo
    loadingElement.style.display = 'none';
    contentElement.style.display = 'block';
    
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    showError('Erro ao carregar dados. Por favor, tente novamente mais tarde.');
  }
}

// Função para renderizar os itens de monitoramento
function renderMonitoringItems(items) {
  monitoringListElement.innerHTML = '';
  
  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'monitoring-item';
    
    // Construir o HTML do item
    itemElement.innerHTML = `
      <h3>${escapeHtml(item.name || 'Sem nome')}</h3>
      <p><strong>URL:</strong> ${escapeHtml(item.url || 'N/A')}</p>
      <p><strong>Frequência:</strong> ${escapeHtml(item.frequency || 'N/A')}</p>
      <p><strong>Responsável:</strong> ${escapeHtml(item.responsible || 'N/A')}</p>
      <p><strong>Status:</strong> ${escapeHtml(item.status || 'N/A')}</p>
    `;
    
    monitoringListElement.appendChild(itemElement);
  });
}

// Função para mostrar mensagens de erro
function showError(message) {
  loadingElement.style.display = 'none';
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Função para escapar HTML e prevenir XSS
function escapeHtml(unsafe) {
  if (unsafe === null || unsafe === undefined) return '';
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Iniciar o carregamento dos dados quando a página carregar
document.addEventListener('DOMContentLoaded', fetchMonitoringItems);

// Adicionar tratamento de erros global
window.addEventListener('error', function(event) {
  console.error('Erro global capturado:', event.error);
  showError('Ocorreu um erro inesperado. Por favor, recarregue a página.');
});