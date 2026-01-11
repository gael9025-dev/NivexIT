# Nivex IT - Sitio Web Corporativo

Sitio web oficial de **Nivex IT**, consultora especializada en **Google Cloud Platform (GCP)** para empresas en México y LATAM.

## 🚀 Stack Tecnológico

- **Framework**: React 20 + TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Hosting**: Firebase Hosting (GCP)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **State Management**: TanStack React Query v5

## 📋 Requisitos Previos

- Node.js 18+ ([instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm o bun
- Cuenta de Supabase (para backend)
- Firebase CLI (para deployment)

## 🛠️ Instalación y Desarrollo Local

```bash
# Clonar repositorio
git clone <tu-repo-url>
cd nivex-next-level-elevate-39566-main

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:8080`

## 📦 Build de Producción

```bash
# Generar build optimizado
npm run build

# Preview del build
npm run preview
```

Los archivos optimizados se generan en la carpeta `dist/`

## 🌐 Despliegue en GCP (Firebase Hosting)

### Configuración inicial

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar proyecto
firebase init hosting
```

### Deploy

```bash
# Build + Deploy
npm run build
firebase deploy --only hosting

# Deploy con canal de preview
firebase hosting:channel:deploy preview
```

### Configurar dominio personalizado

1. En Firebase Console: **Hosting** → **Add custom domain**
2. Agregar `nivex.cloud` y `www.nivex.cloud`
3. Configurar registros DNS según indicaciones de Firebase

## 🔧 Variables de Entorno

Crear archivo `.env` en la raíz:

```env
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-public-anon-key

# Google Cloud (para Vertex AI - opcional)
VITE_GCP_PROJECT_ID=nivex-it
VITE_VERTEX_AI_LOCATION=us-central1
```

## 📂 Estructura del Proyecto

```
nivex-next-level-elevate-39566-main/
├── public/               # Assets estáticos
│   ├── logo.png         # Logo principal
│   ├── favicon.ico      # Favicon
│   └── og-image.png     # Open Graph image
├── src/
│   ├── components/      # Componentes React
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Team.tsx
│   │   └── ui/         # shadcn/ui components
│   ├── pages/          # Páginas principales
│   ├── integrations/   # Integraciones (Supabase)
│   └── App.tsx
├── supabase/
│   └── functions/      # Edge Functions
│       └── chat/       # Chatbot IA
├── firebase.json       # Configuración Firebase
└── vite.config.ts      # Configuración Vite
```

## 🤖 Chatbot IA

El chatbot utiliza actualmente Lovable AI Gateway (temporal). Para producción, se recomienda migrar a **Vertex AI (Gemini)**:

### Migración a Vertex AI

1. Habilitar Vertex AI API en GCP:
```bash
gcloud services enable aiplatform.googleapis.com
```

2. Descomentar código en `supabase/functions/chat/index.ts`
3. Configurar secretos en Supabase:
```bash
supabase secrets set GCP_PROJECT_ID=nivex-it
supabase secrets set GCP_ACCESS_TOKEN=<service-account-token>
```

## 📊 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot-reload (puerto 8080)
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
```

## 🎨 Branding

### Colores principales
- **Primary**: Azul GCP (`#4285F4`)
- **Accent**: Azul oscuro (`#1967D2`)
- **Success**: Verde (`#34A853`)
- **Warning**: Amarillo (`#FBBC04`)

### Logo
El logo se renderiza con componentes SVG en:
- `src/components/Navbar.tsx` (Hexagon + CloudCog)
- `src/components/Footer.tsx` (Cloud + Shield)

Para usar logo PNG, reemplazar `/public/logo.png`

## 🔐 Seguridad

- ✅ Variables sensibles en `.env` (no commitear)
- ✅ CORS configurado en Supabase Edge Functions
- ✅ SSL/HTTPS automático con Firebase Hosting
- ✅ Validación de formularios con Zod

## 📈 SEO

- Metadata configurada en `index.html`
- Open Graph tags para redes sociales
- Sitemap automático con Firebase
- `robots.txt` en `/public`

## 🆘 Troubleshooting

### Build falla
```bash
rm -rf node_modules dist package-lock.json
npm install
npm run build
```

### Chatbot no responde
- Verificar `LOVABLE_API_KEY` en Supabase Secrets
- Revisar logs: `supabase functions logs chat`

### Firebase deploy falla
```bash
firebase logout
firebase login
firebase init hosting --force
```

## 📞 Contacto

- **Email**: contacto@nivex.cloud
- **WhatsApp**: +52 55 6669 9281
- **Sitio**: [nivex.cloud](https://nivex.cloud)

## 📄 Licencia

© 2025 Nivex IT. Todos los derechos reservados.
