# 🌐 Nivex IT - Sitio Web Corporativo

> Consultoría especializada en **Google Cloud Platform** para empresas en México y Latinoamérica
>
> **"Donde la nube encuentra el suelo"**

[![Firebase](https://img.shields.io/badge/Firebase-12.7-orange?logo=firebase)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación-y-configuración)
- [Desarrollo Local](#-desarrollo-local)
- [Deployment](#-deployment)
- [Componentes](#-componentes-principales)
- [Servicios](#-servicios-e-integraciones)
- [Cambios Rápidos](#-guía-de-cambios-rápidos)
- [Variables](#-variables-de-entorno)
- [Scripts](#-scripts-disponibles)
- [Contacto](#-contacto)

---

## 🎯 Descripción General

**Nivex IT** es una plataforma web corporativa moderna para consultoría en **Google Cloud Platform (GCP)**.

### Características Principales

✨ **Catálogo Completo de Servicios** - 9 categorías, 30+ servicios GCP
📊 **Experiencia Comprobada** - 6 industrias, casos de éxito
🤖 **Chatbot IA** - Vertex AI (Gemini 2.0) - actualmente deshabilitado
📝 **Formulario Inteligente** - Multi-paso con N8N
🎨 **Diseño Profesional** - Responsive, 60+ componentes UI
⚡ **Ultra Rápido** - Vite + React + TypeScript

### URLs del Proyecto

- **Producción:** https://nivex.cloud
- **Firebase:** https://nivex-it.web.app

---

## 🚀 Stack Tecnológico

### Frontend Core

- **React** 18.3 - Framework UI
- **TypeScript** 5.8 - Tipo seguro
- **Vite** 5.4 - Build ultra-rápido
- **Tailwind CSS** 3.4 - Utilidades CSS
- **shadcn/ui** - 60+ componentes (Radix UI)

### Librerías Principales

- **React Router** 6.30 - Routing SPA
- **React Hook Form** 7.61 - Gestión de formularios
- **Zod** 3.25 - Validación de esquemas
- **Framer Motion** 12.23 - Animaciones
- **Lucide React** 0.462 - Iconografía
- **TanStack Query** 5.83 - State management

### Backend & Cloud

- **Firebase** - Hosting + Firestore + Functions
- **Google Vertex AI** - Chatbot IA (Gemini 2.0)
- **N8N** - Automatización workflows
- **Google Cloud Platform** - Infraestructura

---

## 📁 Estructura del Proyecto

```
NivexIT/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.tsx      # Navegación
│   │   ├── Hero.tsx        # Hero principal
│   │   ├── Services.tsx    # Servicios
│   │   ├── Contact.tsx     # Contacto
│   │   ├── Chatbot.tsx     # Chat IA (deshabilitado)
│   │   └── ui/             # 60+ componentes shadcn/ui
│   ├── pages/              # Páginas del sitio
│   │   ├── Index.tsx       # Página principal
│   │   ├── PrivacyPolicy.tsx
│   │   ├── NDA.tsx
│   │   └── NotFound.tsx
│   ├── data/               # Datos del sitio
│   └── integrations/       # Firebase, etc
│
├── functions/              # Firebase Cloud Functions
│   └── src/index.js       # Chatbot con Vertex AI
│
├── docs/                   # Documentación
│   ├── ARCHITECTURE.md
│   ├── CONTACT_FORM_SETUP.md
│   └── GUIA_CAMBIOS_RAPIDOS.md
│
├── .env                    # Variables de entorno
├── firebase.json           # Config Firebase
├── tailwind.config.ts      # Config Tailwind
├── vite.config.ts          # Config Vite
└── package.json            # Dependencias
```

---

## 🛠️ Instalación y Configuración

### Requisitos

- Node.js 20+
- npm 10+ o Bun
- Firebase CLI
- Git

### Instalación

```bash
# 1. Clonar repositorio
git clone <tu-repo-url>
cd NivexIT

# 2. Instalar dependencias
npm install

# 3. Configurar .env
cp .env.example .env
# Edita .env con tus credenciales

# 4. Login Firebase
firebase login
firebase use nivex-it
```

### Variables de Entorno (.env)

```env
# FIREBASE
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_PROJECT_ID=nivex-it
VITE_FIREBASE_APP_ID=tu_app_id

# FIREBASE FUNCTIONS
VITE_FIREBASE_FUNCTIONS_URL=https://...

# GOOGLE CLOUD
VITE_GCP_PROJECT_ID=nivex-it
VITE_VERTEX_AI_LOCATION=us-central1

# N8N WEBHOOK
VITE_N8N_WEBHOOK_URL=https://n8n.nivex.cloud/webhook/...

# GOOGLE ANALYTICS (opcional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> Ver [CONFIG.md](CONFIG.md) para documentación completa.

---

## 💻 Desarrollo Local

```bash
# Iniciar dev server
npm run dev
```

Sitio disponible en: **http://localhost:8080**

```bash
# Linter
npm run lint

# Build preview
npm run build
npm run preview
```

---

## 🚢 Deployment

### Deploy a Firebase

```bash
# Build + Deploy
npm run deploy

# O paso por paso
npm run build
firebase deploy --only hosting
```

### Deploy Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### Deploy Completo

```bash
npm run build
firebase deploy
```

---

## 🧩 Componentes Principales

### Secciones del Sitio

| Componente | Descripción |
|------------|-------------|
| **Navbar** | Navegación fija con scroll detection |
| **Hero** | Sección principal con CTA |
| **Services** | 9 categorías de servicios |
| **Experience** | 6 industrias atendidas |
| **Methodology** | 4 pasos de implementación |
| **About** | Información de Nivex IT |
| **Contact** | Formulario multi-paso |
| **Footer** | Pie de página con links |

### Páginas

- `/` - Página principal
- `/aviso-privacidad` - Política de privacidad
- `/nda` - Acuerdo de confidencialidad
- `*` - 404 Not Found

---

## 🔌 Servicios e Integraciones

### Firebase/GCP

- ✅ **Hosting** - CDN global
- ✅ **Firestore** - Base de datos NoSQL
- ✅ **Functions** - Serverless functions
- ✅ **Vertex AI** - IA/ML (Gemini 2.0)

### N8N Automation

**Webhook:** `https://n8n.nivex.cloud/webhook-test/...`

**Flujo:**
1. Usuario llena formulario
2. Validación con Zod
3. POST a N8N webhook
4. N8N procesa y notifica

**Datos enviados:**
```typescript
{
  name, email, phone, company,
  companySize, challenge, urgency,
  budget, message, privacy
}
```

### Vertex AI Chatbot

- **Modelo:** Gemini 2.0 Flash
- **Estado:** Deshabilitado
- **Ubicación:** `functions/src/index.js`
- **Costo:** ~$0.06/mes (1K conversaciones)

**Reactivar:**
1. Descomentar en `pages/Index.tsx`
2. Verificar Vertex AI en GCP
3. Redesplegar

---

## ✏️ Guía de Cambios Rápidos

### Cambiar Teléfono

**Archivos:**
- `src/components/Footer.tsx` (línea ~77)
- `src/components/Contact.tsx` (línea ~30)
- `src/pages/PrivacyPolicy.tsx`
- `CONFIG.md`

```tsx
<a href="tel:+525566699281">
  +52 55 6669 9281
</a>
```

### Cambiar Email

**Archivos:**
- `src/components/Footer.tsx`
- `src/components/Contact.tsx`
- `src/pages/PrivacyPolicy.tsx`

```tsx
<a href="mailto:sales@nivex.cloud">
  sales@nivex.cloud
</a>
```

### Cambiar Colores

Edita `src/index.css`:

```css
:root {
  --accent: 217 91% 60%;    /* Azul principal */
  --primary: 221 83% 53%;   /* Azul secundario */
}
```

> Ver [docs/GUIA_CAMBIOS_RAPIDOS.md](docs/GUIA_CAMBIOS_RAPIDOS.md) para más.

---

## 🔑 Variables de Entorno

### Requeridas

| Variable | Descripción |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | API Key de Firebase |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto |
| `VITE_N8N_WEBHOOK_URL` | URL webhook N8N |
| `VITE_GCP_PROJECT_ID` | ID proyecto GCP |

### Opcionales

| Variable | Descripción |
|----------|-------------|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics |
| `NODE_ENV` | Entorno (`production`) |

> Ver [CONFIG.md](CONFIG.md) para todas las variables.

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Dev server (puerto 8080)
npm run build        # Build producción
npm run preview      # Preview build
npm run lint         # ESLint
```

### Deployment

```bash
npm run deploy       # Build + deploy
npm run deploy:prod  # Deploy producción
```

### Firebase

```bash
firebase deploy --only hosting    # Solo hosting
firebase deploy --only functions  # Solo functions
firebase deploy                   # Todo
```

### Utilidades

```bash
npm run clean        # Limpiar dist/
npm run check        # Lint + build
```

---

## 📞 Contacto

### Nivex IT

- **Website:** [nivex.cloud](https://nivex.cloud)
- **Email:** sales@nivex.cloud
- **Teléfono:** +52 55 6669 9281
- **Ubicación:** Ciudad de México, México

### Redes Sociales

- **LinkedIn:** [linkedin.com/company/nivex-it](https://www.linkedin.com/company/nivex-it)
- **GitHub:** [github.com/nivex-it](https://github.com/nivex-it)

---

## 📚 Documentación Adicional

- 📖 [README.md](README.md) - Esta documentación
- ⚙️ [CONFIG.md](CONFIG.md) - Configuración detallada
- 🏗️ [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Arquitectura
- ✏️ [docs/GUIA_CAMBIOS_RAPIDOS.md](docs/GUIA_CAMBIOS_RAPIDOS.md) - Cambios comunes
- 📝 [docs/CONTACT_FORM_SETUP.md](docs/CONTACT_FORM_SETUP.md) - Setup formulario

---

## 🔄 Changelog

### v1.0.0 (2026-01-11)

#### ✨ Features
- ✅ Sitio completo con 8 secciones
- ✅ 30+ servicios en 9 categorías
- ✅ Formulario multi-paso + N8N
- ✅ Chatbot IA (Vertex AI)
- ✅ Diseño responsive
- ✅ 60+ componentes UI
- ✅ SEO optimizado

#### 🔧 Configuration
- ✅ Firebase Hosting
- ✅ Cloud Functions
- ✅ Dominio personalizado (nivex.cloud)
- ✅ SSL automático

---

**Hecho con ❤️ por Nivex IT**

*"Donde la nube encuentra el suelo"*
