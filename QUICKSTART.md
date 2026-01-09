# ⚡ Quickstart - Nivex IT

Guía rápida para tener el sitio corriendo en **menos de 10 minutos**.

---

## 🎯 Objetivo

Al final de esta guía tendrás:
- ✅ Proyecto corriendo localmente
- ✅ Build de producción generado
- ✅ Desplegado en Firebase Hosting

---

## 📦 Paso 1: Setup Inicial (2 min)

```bash
# Clonar proyecto
git clone <tu-repo-url>
cd nivex-next-level-elevate-39566-main

# Setup automatizado
npm run setup

# Editar .env con tus credenciales de Supabase
nano .env  # o usar tu editor favorito
```

**Variables mínimas requeridas:**
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
VITE_SUPABASE_PROJECT_ID=abc123
```

---

## 🚀 Paso 2: Desarrollo Local (1 min)

```bash
# Iniciar dev server
npm run dev

# Abrir navegador
open http://localhost:8080
```

✅ **Verificar**: El sitio carga correctamente con todos los componentes

---

## 🏗️ Paso 3: Build de Producción (2 min)

```bash
# Generar build optimizado
npm run build

# Preview del build
npm run preview
```

✅ **Verificar**: No hay errores en el build y preview funciona

---

## ☁️ Paso 4: Desplegar en Firebase (5 min)

### A. Configurar Firebase (primera vez)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Crear proyecto en Firebase Console
# https://console.firebase.google.com/
# Nombre: nivex-cloud

# Inicializar (ya está configurado, solo si es necesario)
firebase init hosting
```

### B. Deploy

```bash
# Opción 1: Script automatizado
npm run deploy

# Opción 2: Manual
npm run build
firebase deploy --only hosting
```

### C. Verificar

```bash
# Ver URL de deployment
firebase hosting:sites:list

# Abrir en navegador
open https://nivex-cloud.web.app
```

✅ **¡Listo!** Tu sitio está en producción

---

## 🔗 Paso 5: Dominio Personalizado (Opcional)

```bash
# En Firebase Console
# 1. Ir a Hosting → Add custom domain
# 2. Agregar: nivex.cloud
# 3. Configurar DNS según instrucciones
```

**Registros DNS típicos:**
```
A     @     151.101.1.195
A     @     151.101.65.195
CNAME www   nivex-cloud.web.app.
```

---

## 🤖 Paso 6: Configurar Chatbot (Opcional)

### Opción A: Continuar con Lovable (temporal)

```bash
# En Supabase Dashboard → Edge Functions → Secrets
# Agregar:
LOVABLE_API_KEY=tu-lovable-api-key
```

### Opción B: Migrar a Vertex AI (recomendado)

Ver guía completa: [docs/CHATBOT_MIGRATION.md](docs/CHATBOT_MIGRATION.md)

```bash
# Resumen:
# 1. Habilitar Vertex AI en GCP
# 2. Crear service account
# 3. Configurar secrets en Supabase
# 4. Deploy edge function
supabase functions deploy chat-vertex
```

---

## 📊 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Dev server
npm run build            # Build producción
npm run preview          # Preview build

# Deployment
npm run deploy           # Script interactivo
npm run deploy:prod      # Deploy directo a prod
npm run deploy:preview   # Deploy a preview channel

# Utilidades
npm run lint             # Linter
npm run clean            # Limpiar todo
npm run check            # Lint + Build

# Firebase
firebase hosting:logs    # Ver logs
firebase projects:list   # Listar proyectos
```

---

## 🆘 Problemas Comunes

### "Build falla"

```bash
rm -rf node_modules dist
npm install
npm run build
```

### "Firebase deploy falla"

```bash
firebase logout
firebase login
firebase use nivex-cloud
```

### "Chatbot no responde"

1. Verificar `LOVABLE_API_KEY` en Supabase Secrets
2. Ver logs: `supabase functions logs chat`
3. Verificar edge function está desplegada

### "Variables de entorno no funcionan"

- Verificar nombres empiezan con `VITE_`
- Reiniciar dev server después de cambiar `.env`
- En producción, configurar en GitHub Secrets para CI/CD

---

## 📚 Siguiente Pasos

1. ✅ **Completado**: Sitio desplegado
2. 📖 Leer: [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)
3. 🏗️ Revisar: [ARCHITECTURE.md](docs/ARCHITECTURE.md)
4. 🤖 Migrar: [CHATBOT_MIGRATION.md](docs/CHATBOT_MIGRATION.md)
5. ⚙️ Configurar: CI/CD con GitHub Actions

---

## 🎉 ¡Felicidades!

Tu sitio web está desplegado y corriendo en Google Cloud Platform.

**URLs importantes:**
- 🌐 Producción: https://nivex.cloud (después de DNS)
- 🚀 Firebase: https://nivex-cloud.web.app
- 📊 Firebase Console: https://console.firebase.google.com
- 🗄️ Supabase Dashboard: https://supabase.com/dashboard

**¿Necesitas ayuda?** → contacto@nivex.cloud

---

**Tiempo total**: ~10 minutos ⏱️
**Dificultad**: Principiante 🟢
**Última actualización**: 2026-01-08
