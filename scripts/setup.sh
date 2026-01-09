#!/bin/bash

###############################################################################
# Script de Setup Inicial para Nivex IT
# Configura el entorno de desarrollo local
###############################################################################

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║         NIVEX IT - Setup Script v1.0                    ║"
echo "║         Configuración de Entorno de Desarrollo          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}[!] Node.js no está instalado${NC}"
    echo "Por favor instala Node.js 18+ desde: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}[✓] Node.js instalado:${NC} $(node -v)"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}[!] npm no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}[✓] npm instalado:${NC} $(npm -v)"

# Instalar dependencias
echo -e "${BLUE}[INFO] Instalando dependencias...${NC}"
npm install

# Crear .env si no existe
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}[!] Creando archivo .env desde .env.example${NC}"
    cp .env.example .env
    echo -e "${GREEN}[✓] Archivo .env creado${NC}"
    echo -e "${YELLOW}[!] Por favor configura las variables en .env:${NC}"
    echo "    - VITE_SUPABASE_URL"
    echo "    - VITE_SUPABASE_PUBLISHABLE_KEY"
    echo "    - VITE_SUPABASE_PROJECT_ID"
else
    echo -e "${GREEN}[✓] Archivo .env ya existe${NC}"
fi

# Verificar Firebase CLI (opcional)
if command -v firebase &> /dev/null; then
    echo -e "${GREEN}[✓] Firebase CLI instalado:${NC} $(firebase --version)"
else
    echo -e "${YELLOW}[!] Firebase CLI no instalado (opcional)${NC}"
    echo "Para instalarlo: npm install -g firebase-tools"
fi

# Verificar Supabase CLI (opcional)
if command -v supabase &> /dev/null; then
    echo -e "${GREEN}[✓] Supabase CLI instalado:${NC} $(supabase --version)"
else
    echo -e "${YELLOW}[!] Supabase CLI no instalado (opcional)${NC}"
    echo "Para instalarlo: npm install -g supabase"
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}  Setup completado exitosamente${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Próximos pasos:${NC}"
echo "  1. Configura las variables en .env"
echo "  2. Ejecuta: npm run dev"
echo "  3. Abre: http://localhost:8080"
echo ""
