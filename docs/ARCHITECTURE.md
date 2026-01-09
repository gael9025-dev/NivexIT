# 🏗️ Arquitectura del Sistema - Nivex IT

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  nivex.cloud   │
                    │   (DNS/CDN)    │
                    └────────┬───────┘
                             │
                             ▼
         ┌───────────────────────────────────────┐
         │    Firebase Hosting (GCP)             │
         │  - Static files (HTML, CSS, JS)       │
         │  - Global CDN                         │
         │  - SSL/HTTPS automático               │
         │  - Caching inteligente                │
         └───────────────┬───────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌────────────────┐              ┌────────────────┐
│  React SPA     │              │  Static Assets │
│  - TypeScript  │              │  - Images      │
│  - Tailwind    │              │  - Fonts       │
│  - shadcn/ui   │              │  - Icons       │
└────────┬───────┘              └────────────────┘
         │
         │ API Calls
         ▼
┌─────────────────────────────────────────────┐
│         Supabase (Backend)                  │
├─────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐        │
│  │ PostgreSQL   │  │ Edge Functions│        │
│  │ Database     │  │ (Deno)        │        │
│  │              │  │               │        │
│  │ - Contactos  │  │ - chat        │        │
│  │ - Leads      │  │ - chat-vertex │        │
│  │ - Analytics  │  └───────┬───────┘        │
│  └──────────────┘          │                │
│                            │                │
└────────────────────────────┼────────────────┘
                             │
                             ▼
                  ┌──────────────────┐
                  │   Vertex AI      │
                  │   (Gemini 2.0)   │
                  │                  │
                  │ - Chatbot IA     │
                  │ - GCP Native     │
                  └──────────────────┘

┌─────────────────────────────────────────────┐
│         Servicios Externos                  │
├─────────────────────────────────────────────┤
│  - Make.com (Webhook contacto)              │
│  - Google Analytics (opcional)              │
│  - Lovable AI (temporal - migrar a Vertex) │
└─────────────────────────────────────────────┘
```

---

## 🔧 Stack Tecnológico Detallado

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3 | Framework UI |
| **TypeScript** | 5.8 | Tipado estático |
| **Vite** | 5.4 | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Styling framework |
| **shadcn/ui** | Latest | Component library |
| **React Router** | 6.30 | Client-side routing |
| **TanStack Query** | 5.83 | Data fetching & caching |
| **React Hook Form** | 7.61 | Form management |
| **Zod** | 3.25 | Schema validation |
| **Lucide React** | Latest | Icon library |
| **Framer Motion** | 12.23 | Animations |

### Backend & Infraestructura

| Servicio | Propósito | Tier |
|----------|-----------|------|
| **Firebase Hosting** | CDN + Static hosting | Spark (Free) |
| **Supabase** | PostgreSQL + Auth + Functions | Free tier |
| **Vertex AI (Gemini)** | Chatbot IA | Pay-as-you-go |
| **Cloud Build** | CI/CD (opcional) | Free tier |
| **GitHub Actions** | CI/CD | Free (public repos) |

### Herramientas de Desarrollo

- **ESLint**: Linting
- **Prettier**: Code formatting (implícito en Lovable)
- **Git**: Version control
- **Firebase CLI**: Deployment
- **Supabase CLI**: Edge functions

---

## 🌐 Flujo de Datos

### 1. Carga Inicial de la Página

```
Usuario → DNS → Firebase CDN → dist/index.html
  ↓
React App Bootstrap
  ↓
Cargar chunks de JavaScript (lazy loading)
  ↓
Renderizar UI
```

### 2. Interacción con Formulario de Contacto

```
Usuario llena formulario
  ↓
Validación con Zod
  ↓
Submit → Make.com Webhook
  ↓
Notificación por email
  ↓
(Opcional) Guardar en Supabase DB
```

### 3. Chatbot IA

```
Usuario escribe mensaje
  ↓
Frontend → Supabase Edge Function (/chat)
  ↓
Edge Function → Vertex AI API
  ↓
Gemini procesa prompt
  ↓
Streaming response
  ↓
Frontend muestra respuesta
```

---

## 💰 Análisis de Costos Mensual

### Escenario 1: Inicio (< 1,000 visitas/mes)

| Servicio | Uso | Costo Mensual |
|----------|-----|---------------|
| **Firebase Hosting** | 1 GB transferencia | $0.00 (Free tier) |
| **Supabase Free Tier** | 500 MB DB, 2 GB storage | $0.00 |
| **Vertex AI (Gemini)** | 100K tokens | $0.01 |
| **GitHub Actions** | 2,000 minutos/mes | $0.00 (Free) |
| **Dominio nivex.cloud** | Anual / 12 | ~$1.00 |
| **TOTAL** | | **~$1.01 USD/mes** |

### Escenario 2: Crecimiento (5,000 visitas/mes)

| Servicio | Uso | Costo Mensual |
|----------|-----|---------------|
| **Firebase Hosting** | 10 GB transferencia | $0.15 |
| **Supabase Free Tier** | 2 GB DB | $0.00 |
| **Vertex AI (Gemini)** | 1M tokens | $0.11 |
| **GitHub Actions** | Free tier | $0.00 |
| **Dominio** | Anual / 12 | ~$1.00 |
| **TOTAL** | | **~$1.26 USD/mes** |

### Escenario 3: Producción (50,000 visitas/mes)

| Servicio | Uso | Costo Mensual |
|----------|-----|---------------|
| **Firebase Hosting** | 100 GB transferencia | $1.50 |
| **Supabase Pro** | 8 GB DB + backups | $25.00 |
| **Vertex AI (Gemini)** | 10M tokens | $1.13 |
| **Cloud Build** | 100 builds/mes | $0.00 (Free tier) |
| **Dominio** | | ~$1.00 |
| **TOTAL** | | **~$28.63 USD/mes** |

### Comparación con Alternativas

| Hosting | Costo Inicial | Escalabilidad | Latencia LATAM |
|---------|---------------|---------------|----------------|
| **Firebase (GCP)** ⭐ | $0-2/mes | Excelente | ~50ms |
| **Vercel** | $0-20/mes | Buena | ~80ms |
| **Netlify** | $0-19/mes | Buena | ~100ms |
| **AWS Amplify** | $0.15/GB | Excelente | ~60ms |
| **DigitalOcean** | $6/mes | Manual | ~40ms |

**Recomendación**: Firebase Hosting por:
- ✅ Mejor free tier
- ✅ CDN global de Google
- ✅ Integración nativa con GCP
- ✅ SSL automático
- ✅ Deploy instantáneo

---

## 🔒 Seguridad

### Implementaciones Actuales

1. **HTTPS/SSL**
   - Certificado automático de Firebase
   - TLS 1.3 enforced
   - HSTS headers

2. **CORS**
   - Configurado en Supabase Edge Functions
   - Whitelist de dominios

3. **Secrets Management**
   - Variables de entorno en `.env` (gitignored)
   - Supabase Secrets para API keys
   - GitHub Secrets para CI/CD

4. **Validación de Inputs**
   - Zod schemas en formularios
   - Sanitización de inputs
   - Rate limiting en Edge Functions (recomendado)

5. **CSP (Content Security Policy)**
   - Configurado en headers de Firebase

### Recomendaciones Adicionales

```javascript
// Agregar a firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          }
        ]
      }
    ]
  }
}
```

---

## 📈 Performance

### Métricas Target (Lighthouse)

| Métrica | Target | Actual |
|---------|--------|--------|
| Performance | > 90 | TBD |
| Accessibility | > 95 | TBD |
| Best Practices | > 90 | TBD |
| SEO | > 95 | TBD |

### Optimizaciones Implementadas

1. **Code Splitting**
   - React Router lazy loading
   - Vite automatic chunking

2. **Asset Optimization**
   - Images: WebP format
   - Fonts: Google Fonts con preconnect
   - CSS: Tailwind purge

3. **Caching**
   - Static assets: 1 año
   - HTML: no-cache
   - Service Worker (opcional)

4. **CDN**
   - Firebase Hosting = Google CDN
   - 30+ edge locations globalmente

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
Trigger: Push to main
  ↓
1. Checkout code
  ↓
2. Setup Node.js 18
  ↓
3. Install dependencies (npm ci)
  ↓
4. Run linter (npm run lint)
  ↓
5. Build project (npm run build)
  ↓
6. Deploy to Firebase
  ↓
7. Notify on success/failure
```

### Tiempos Estimados

- Build: ~2 min
- Deploy: ~30 seg
- Total: **~2.5 min**

---

## 🌍 Regiones y Latencia

### Firebase Hosting Regions

Firebase Hosting usa el CDN de Google Cloud con edge locations en:

- 🇲🇽 México
- 🇧🇷 Brasil
- 🇺🇸 Estados Unidos (múltiples)
- 🇪🇺 Europa
- 🇦🇸 Asia-Pacífico

### Latencia Esperada (desde México)

- CDN Hit: ~20-50ms
- API Call (Supabase): ~100-200ms
- Chatbot (Vertex AI): ~500-1000ms (streaming)

---

## 📊 Monitoreo

### Métricas Clave a Monitorear

1. **Uptime**
   - Target: 99.9%
   - Tool: Firebase Status

2. **Response Time**
   - Target: < 200ms (P95)
   - Tool: Firebase Performance

3. **Error Rate**
   - Target: < 0.1%
   - Tool: Firebase Crashlytics

4. **Chatbot Usage**
   - Requests/día
   - Tokens consumidos
   - Errores de IA

### Dashboards Recomendados

- Firebase Console (Hosting, Functions)
- GCP Cloud Monitoring (Vertex AI)
- Supabase Dashboard (DB, Auth)
- GitHub Insights (CI/CD)

---

## 🔮 Roadmap Técnico

### Corto Plazo (1-2 meses)

- [ ] Migrar chatbot a Vertex AI
- [ ] Implementar Google Analytics 4
- [ ] Configurar alertas de monitoreo
- [ ] Optimizar SEO (sitemap, structured data)
- [ ] Agregar service worker para PWA

### Mediano Plazo (3-6 meses)

- [ ] Implementar A/B testing
- [ ] Agregar blog técnico (Markdown)
- [ ] Sistema de cache avanzado
- [ ] Internacionalización (i18n)
- [ ] Dashboard de métricas custom

### Largo Plazo (6-12 meses)

- [ ] Mobile app (React Native)
- [ ] Portal de clientes
- [ ] Integración CRM
- [ ] API pública
- [ ] Sistema de tickets

---

## 📚 Documentación Relacionada

- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Chatbot Migration](./CHATBOT_MIGRATION.md)
- [README](../README.md)

---

**Última actualización**: 2026-01-08
**Versión**: 1.0
**Maintainer**: Equipo Nivex IT
