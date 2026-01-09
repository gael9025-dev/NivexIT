#!/bin/bash

###############################################################################
# Script de Deployment Automatizado para Nivex IT
# Despliega el sitio web a Firebase Hosting con validaciones
###############################################################################

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║         NIVEX IT - Deployment Script v1.0               ║"
echo "║         Firebase Hosting Deployment                     ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Función para logging
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

log_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Validar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    log_error "package.json no encontrado. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

log_success "Directorio de proyecto validado"

# Validar que Node.js está instalado
if ! command -v node &> /dev/null; then
    log_error "Node.js no está instalado. Por favor instala Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v)
log_success "Node.js detectado: $NODE_VERSION"

# Validar que Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    log_error "Firebase CLI no está instalado."
    log_info "Instálalo con: npm install -g firebase-tools"
    exit 1
fi

FIREBASE_VERSION=$(firebase --version)
log_success "Firebase CLI detectado: $FIREBASE_VERSION"

# Validar archivo .env
if [ ! -f ".env" ]; then
    log_warning "Archivo .env no encontrado"
    log_info "Copiando .env.example a .env..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        log_warning "Por favor configura las variables en .env antes de continuar"
        exit 1
    else
        log_error ".env.example tampoco existe"
        exit 1
    fi
fi

log_success "Archivo .env encontrado"

# Preguntar tipo de deployment
echo ""
log_info "Tipo de deployment:"
echo "  1) Producción (https://nivex.cloud)"
echo "  2) Preview/Staging"
echo "  3) Solo Build (sin deploy)"
read -p "Selecciona una opción [1-3]: " DEPLOY_TYPE

# Limpiar builds anteriores
log_info "Limpiando builds anteriores..."
rm -rf dist/
log_success "Build anterior eliminado"

# Instalar/actualizar dependencias
log_info "Instalando dependencias..."
npm ci --prefer-offline --no-audit
log_success "Dependencias instaladas"

# Ejecutar linter (opcional pero recomendado)
log_info "Ejecutando linter..."
npm run lint || log_warning "Linter encontró warnings (no crítico)"

# Build del proyecto
log_info "Construyendo proyecto para producción..."
npm run build

if [ ! -d "dist" ]; then
    log_error "Build falló - carpeta dist/ no generada"
    exit 1
fi

log_success "Build completado exitosamente"

# Validar que index.html existe
if [ ! -f "dist/index.html" ]; then
    log_error "dist/index.html no encontrado"
    exit 1
fi

# Mostrar tamaño del build
BUILD_SIZE=$(du -sh dist | cut -f1)
log_info "Tamaño del build: ${BUILD_SIZE}"

# Deploy según tipo seleccionado
case $DEPLOY_TYPE in
    1)
        log_info "Desplegando a PRODUCCIÓN..."
        firebase deploy --only hosting
        log_success "✨ Deployment completado!"
        log_success "🌐 Sitio disponible en: https://nivex.cloud"
        ;;
    2)
        log_info "Creando preview channel..."
        CHANNEL_ID="preview-$(date +%Y%m%d-%H%M%S)"
        firebase hosting:channel:deploy $CHANNEL_ID
        log_success "✨ Preview creado!"
        log_info "Preview disponible por 7 días"
        ;;
    3)
        log_success "Build completado. No se realizó deployment."
        log_info "Para desplegar manualmente: firebase deploy --only hosting"
        ;;
    *)
        log_error "Opción inválida"
        exit 1
        ;;
esac

echo ""
log_success "════════════════════════════════════════"
log_success "  Deployment completado exitosamente"
log_success "════════════════════════════════════════"
echo ""

# Mostrar siguiente pasos
if [ "$DEPLOY_TYPE" == "1" ]; then
    log_info "Próximos pasos sugeridos:"
    echo "  • Verificar el sitio en producción"
    echo "  • Probar el chatbot"
    echo "  • Verificar métricas en Firebase Console"
    echo "  • Revisar logs: firebase hosting:logs"
fi
