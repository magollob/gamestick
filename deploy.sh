#!/bin/bash

echo "🚀 Iniciando processo de deploy do Smart Ilha..."
echo "================================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    log_error "Node.js não está instalado!"
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    log_error "npm não está instalado!"
    exit 1
fi

log_info "Versão do Node.js: $(node --version)"
log_info "Versão do npm: $(npm --version)"

# Limpar builds anteriores
log_info "Limpando builds anteriores..."
rm -rf out
rm -rf .next
rm -rf node_modules/.cache
log_success "Cache limpo!"

# Verificar se package.json existe
if [ ! -f "package.json" ]; then
    log_error "package.json não encontrado!"
    exit 1
fi

# Instalar dependências
log_info "Instalando dependências..."
npm ci --silent
if [ $? -ne 0 ]; then
    log_error "Falha ao instalar dependências!"
    exit 1
fi
log_success "Dependências instaladas!"

# Executar build
log_info "Executando build do Next.js..."
npm run build
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    log_success "Build concluído com sucesso!"
    
    # Verificar se a pasta out foi criada
    if [ -d "out" ]; then
        log_success "Pasta 'out' criada com sucesso!"
        
        # Mostrar estatísticas do build
        log_info "Estatísticas do build:"
        echo "📁 Total de arquivos: $(find out -type f | wc -l)"
        echo "📊 Tamanho total: $(du -sh out | cut -f1)"
        
        # Verificar arquivos importantes
        if [ -f "out/index.html" ]; then
            log_success "index.html encontrado"
        else
            log_warning "index.html não encontrado!"
        fi
        
        if [ -f "out/checkout2/index.html" ]; then
            log_success "checkout2/index.html encontrado"
        else
            log_warning "checkout2/index.html não encontrado!"
        fi
        
        # Verificar se há arquivos _next
        if [ -d "out/_next" ]; then
            log_success "Pasta _next encontrada"
            echo "📦 Chunks JS: $(find out/_next -name "*.js" | wc -l)"
            echo "🎨 Arquivos CSS: $(find out/_next -name "*.css" | wc -l)"
        else
            log_warning "Pasta _next não encontrada!"
        fi
        
        echo ""
        echo "================================================"
        log_success "DEPLOY PRONTO!"
        echo "================================================"
        echo ""
        echo "📋 PRÓXIMOS PASSOS:"
        echo "1. 📁 Envie TODO o conteúdo da pasta 'out/' para seu servidor"
        echo "2. 🔧 Configure o arquivo .htaccess (já incluído em out/)"
        echo "3. 🌐 Acesse seu site para testar"
        echo ""
        echo "📂 Estrutura para upload:"
        echo "   📁 out/"
        echo "   ├── 📄 index.html"
        echo "   ├── 📁 _next/"
        echo "   ├── 📁 checkout2/"
        echo "   ├── 📄 .htaccess"
        echo "   └── 📁 outros arquivos..."
        echo ""
        log_info "Dica: Use um cliente FTP/SFTP para enviar os arquivos"
        
    else
        log_error "Pasta 'out' não foi criada!"
        exit 1
    fi
    
else
    log_error "Erro no build!"
    echo ""
    echo "🔍 POSSÍVEIS SOLUÇÕES:"
    echo "1. Verifique os erros acima"
    echo "2. Execute: npm install"
    echo "3. Verifique se todas as dependências estão instaladas"
    echo "4. Tente: rm -rf node_modules && npm install"
    exit 1
fi

echo ""
log_info "Script de deploy finalizado!"
