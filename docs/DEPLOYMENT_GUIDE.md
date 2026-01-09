# 🚀 Guía Completa de Deployment - Nivex IT

Esta guía te llevará paso a paso desde la configuración inicial hasta tener tu sitio web desplegado en producción en **Google Cloud Platform** usando **Firebase Hosting**.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Setup Local](#setup-local)
3. [Configuración de Firebase](#configuración-de-firebase)
4. [Configuración de Supabase](#configuración-de-supabase)
5. [Primer Deployment](#primer-deployment)
6. [Configuración de Dominio Personalizado](#configuración-de-dominio-personalizado)
7. [CI/CD con GitHub Actions](#cicd-con-github-actions)
8. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)

---

## 1️⃣ Requisitos Previos

### Software Necesario

```bash
# Node.js 18 o superior
node -v  # Debe ser >= 18.0.0

# npm (viene con Node.js)
npm -v

# Git
git --version
```

### Cuentas Requeridas

- ✅ Cuenta de Google Cloud Platform (GCP)
- ✅ Cuenta de Supabase
- ✅ Cuenta de GitHub (para CI/CD)
- ✅ Dominio registrado (nivex.cloud)

---

## 2️⃣ Setup Local

### Paso 1: Clonar el Repositorio

```bash
# Clonar proyecto
git clone <tu-repo-url>
cd nivex-next-level-elevate-39566-main
```

### Paso 2: Ejecutar Setup Automatizado

```bash
# Ejecutar script de setup
npm run setup

# O manualmente:
npm install
cp .env.example .env
```

### Paso 3: Configurar Variables de Entorno

Editar `.env` con tus credenciales:

```env
# Supabase (obtener en: https://supabase.com/dashboard/project/_/settings/api)
VITE_SUPABASE_PROJECT_ID=tu-project-id
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...

# Opcional: GCP para Vertex AI
VITE_GCP_PROJECT_ID=nivex-cloud
VITE_VERTEX_AI_LOCATION=us-central1
```

### Paso 4: Probar Localmente

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
open http://localhost:8080
```

✅ **Checkpoint**: El sitio debe cargar correctamente en localhost:8080

---

## 3️⃣ Configuración de Firebase

### Paso 1: Crear Proyecto en Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Clic en "Add project"
3. Nombre del proyecto: `nivex-cloud`
4. Deshabilitar Google Analytics (opcional)
5. Crear proyecto

### Paso 2: Instalar Firebase CLI

```bash
# Instalar globalmente
npm install -g firebase-tools

# Verificar instalación
firebase --version

# Login a Firebase
firebase login
```

### Paso 3: Inicializar Firebase en el Proyecto

```bash
# Ya está configurado, pero si necesitas re-inicializar:
firebase init hosting

# Configuración:
# - Project: nivex-cloud
# - Public directory: dist
# - Single-page app: Yes
# - GitHub deploys: No (lo haremos después)
```

### Paso 4: Primer Deploy de Prueba

```bash
# Build del proyecto
npm run build

# Deploy a Firebase
firebase deploy --only hosting

# Output esperado:
# ✔ Deploy complete!
# Hosting URL: https://nivex-cloud.web.app
```

✅ **Checkpoint**: Tu sitio debe estar accesible en `https://nivex-cloud.web.app`

---

## 4️⃣ Configuración de Supabase

### Paso 1: Crear Proyecto en Supabase

1. Ir a [Supabase Dashboard](https://supabase.com/dashboard)
2. Crear nuevo proyecto
3. Nombre: `nivex-it`
4. Database Password: (guardar en lugar seguro)
5. Region: `South America (São Paulo)` o `US East (N. Virginia)`

### Paso 2: Obtener Credenciales

1. En Dashboard → Settings → API
2. Copiar:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Project Ref → `VITE_SUPABASE_PROJECT_ID`

### Paso 3: Configurar Edge Functions (Chatbot)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link al proyecto
supabase link --project-ref tu-project-ref

# Deploy edge functions
supabase functions deploy chat
```

### Paso 4: Configurar Secrets para Chatbot

```bash
# Opción 1: Continuar usando Lovable (temporal)
supabase secrets set LOVABLE_API_KEY=tu-lovable-api-key

# Opción 2: Migrar a Vertex AI (recomendado)
# Ver: docs/CHATBOT_MIGRATION.md
```

✅ **Checkpoint**: El chatbot debe responder en tu sitio local

---

## 5️⃣ Primer Deployment

### Opción A: Deployment Manual

```bash
# Script interactivo
npm run deploy

# O paso a paso:
npm run build
firebase deploy --only hosting
```

### Opción B: Deployment con Script Automatizado

```bash
# Ver scripts/deploy.sh para más detalles
./scripts/deploy.sh

# Seleccionar opción:
# 1) Producción
# 2) Preview
# 3) Solo Build
```

### Verificar Deployment

```bash
# Ver logs
firebase hosting:logs

# Información del proyecto
firebase projects:list

# URL de hosting
firebase hosting:sites:list
```

✅ **Checkpoint**: Tu sitio está desplegado y accesible

---

## 6️⃣ Configuración de Dominio Personalizado

### Paso 1: Agregar Dominio en Firebase

1. Firebase Console → Hosting → Add custom domain
2. Ingresar: `nivex.cloud`
3. Firebase te proporcionará registros DNS

### Paso 2: Configurar DNS

En tu proveedor de dominio, agregar estos registros:

```dns
Tipo    Nombre    Valor                          TTL
----    ------    -----                          ---
A       @         151.101.1.195                  1h
A       @         151.101.65.195                 1h
A       @         151.101.129.195                1h
A       @         151.101.193.195                1h

CNAME   www       nivex-cloud.web.app.           1h

TXT     @         google-site-verification=...   1h
```

**Nota**: Las IPs específicas las proporciona Firebase al conectar el dominio.

### Paso 3: Agregar www subdomain

Repetir proceso para `www.nivex.cloud`

### Paso 4: Forzar HTTPS

Ya está configurado en `firebase.json`:

```json
{
  "hosting": {
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

### Paso 5: Verificar Propagación DNS

```bash
# Verificar DNS (puede tomar 24-48 horas)
nslookup nivex.cloud
dig nivex.cloud

# Cuando esté listo, Firebase mostrará:
# ✓ Connected
```

✅ **Checkpoint**: Tu sitio debe estar accesible en https://nivex.cloud con SSL

---

## 7️⃣ CI/CD con GitHub Actions

### Paso 1: Generar Service Account Token

```bash
# En Firebase
firebase login:ci

# Copiar el token que se muestra
# Ejemplo: 1//0eH...
```

### Paso 2: Configurar Secrets en GitHub

1. Ir a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Agregar secrets:

```
FIREBASE_SERVICE_ACCOUNT_NIVEX_CLOUD = (Service account JSON)
VITE_SUPABASE_URL = https://...
VITE_SUPABASE_PUBLISHABLE_KEY = eyJ...
VITE_SUPABASE_PROJECT_ID = xxx
```

### Paso 3: Verificar Workflow

El archivo `.github/workflows/deploy-firebase.yml` ya está configurado.

### Paso 4: Probar CI/CD

```bash
# Hacer commit y push
git add .
git commit -m "feat: setup CI/CD"
git push origin main

# Ver en GitHub Actions
# https://github.com/tu-usuario/tu-repo/actions
```

✅ **Checkpoint**: Los deploys se ejecutan automáticamente en cada push a main

---

## 8️⃣ Monitoreo y Mantenimiento

### Métricas de Firebase

```bash
# Ver estadísticas de hosting
firebase hosting:stats

# Ver logs en tiempo real
firebase hosting:logs --tail
```

### Dashboard de Firebase

1. Firebase Console → Hosting
2. Métricas disponibles:
   - Requests/minuto
   - Bandwidth usado
   - Países de origen
   - Errores 4xx/5xx

### Configurar Alertas

1. Firebase Console → Integrations
2. Conectar con Cloud Monitoring
3. Crear alertas para:
   - Errores 5xx > 1%
   - Latencia > 1s
   - Bandwidth > umbral

### Respaldos y Rollbacks

```bash
# Ver historial de deploys
firebase hosting:releases:list

# Rollback a versión anterior
firebase hosting:rollback [RELEASE_ID]
```

### Optimización Continua

```bash
# Analizar bundle size
npm run build
ls -lh dist/assets/

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage
```

---

## 🎯 Checklist Final de Deployment

### Pre-Deployment
- [ ] Variables de entorno configuradas
- [ ] Build local exitoso (`npm run build`)
- [ ] Tests pasando (`npm run lint`)
- [ ] Chatbot funcional
- [ ] Formulario de contacto probado

### Deployment
- [ ] Firebase project creado
- [ ] Primer deploy exitoso
- [ ] Sitio accesible en `.web.app`
- [ ] Supabase edge functions desplegadas

### Post-Deployment
- [ ] Dominio personalizado configurado
- [ ] SSL/HTTPS activo
- [ ] CI/CD configurado
- [ ] Monitoreo activo
- [ ] Documentación actualizada

### SEO y Performance
- [ ] Meta tags configurados
- [ ] Open Graph images
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Lighthouse score > 90

---

## 🆘 Troubleshooting Común

### Build falla

```bash
# Limpiar y reinstalar
npm run clean
npm install
npm run build
```

### Firebase deploy falla

```bash
# Re-login
firebase logout
firebase login
firebase use nivex-cloud
firebase deploy --only hosting
```

### Dominio no resuelve

- Esperar propagación DNS (24-48h)
- Verificar registros DNS con `dig nivex.cloud`
- Verificar en Firebase Console que esté "Connected"

### CI/CD falla

- Verificar secrets en GitHub
- Revisar logs en Actions tab
- Verificar permisos del service account

---

## 📚 Recursos Adicionales

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Vertex AI Migration Guide](./CHATBOT_MIGRATION.md)

---

**¿Necesitas ayuda?** Contacta al equipo en contacto@nivex.cloud
