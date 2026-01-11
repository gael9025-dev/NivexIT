# 🔧 Archivo de Configuración - Nivex IT

Este archivo contiene **TODAS** las variables y configuraciones que necesitas para que el proyecto funcione correctamente.

---

## 📋 INFORMACIÓN DE LA EMPRESA

### Datos de Contacto (Ya configurados)
```
✅ EMPRESA_NOMBRE=Nivex IT
✅ EMPRESA_EMAIL=contacto@nivex.cloud
✅ EMPRESA_TELEFONO=+52 56 1190 7195
✅ EMPRESA_WHATSAPP=+52 56 1190 7195
✅ EMPRESA_DIRECCION=Ciudad de México, México
✅ EMPRESA_SITIO_WEB=nivex.cloud
```

### Redes Sociales (Opcional)
```
TWITTER_HANDLE=@nivex_cloud
LINKEDIN_URL=[COMPLETAR - URL de LinkedIn de Nivex IT]
FACEBOOK_URL=[COMPLETAR - URL de Facebook (si aplica)]
INSTAGRAM_URL=[COMPLETAR - URL de Instagram (si aplica)]
```

---

## 🔥 FIREBASE CONFIGURATION (Ya configurado)

### ✅ Variables de Firebase (ya en .env.example)
```env
✅ VITE_FIREBASE_API_KEY=AIzaSyBU8Gi2Ae8L36RLa8DGevhvSJhHe4rhAXI
✅ VITE_FIREBASE_AUTH_DOMAIN=nivex-it.firebaseapp.com
✅ VITE_FIREBASE_PROJECT_ID=nivex-it
✅ VITE_FIREBASE_STORAGE_BUCKET=nivex-it.firebasestorage.app
✅ VITE_FIREBASE_MESSAGING_SENDER_ID=585669774700
✅ VITE_FIREBASE_APP_ID=1:585669774700:web:32b08fde044595e574b749
```

**Proyecto Firebase:** nivex-it
**Console:** https://console.firebase.google.com/project/nivex-it

---

## ☁️ GOOGLE CLOUD PLATFORM (Vertex AI)

### ✅ Variables GCP (ya configuradas)
```env
✅ VITE_GCP_PROJECT_ID=nivex-it
✅ VITE_VERTEX_AI_LOCATION=us-central1
```

### 🔐 Service Account para Firebase Functions

**IMPORTANTE:** Las Firebase Functions usan automáticamente las credenciales del proyecto cuando se despliegan.
**NO necesitas** agregar estas variables al `.env` del frontend.

**Para desplegar Firebase Functions:**
```bash
cd functions
npm install
npm run deploy
```

Firebase Functions tendrá acceso automático a Vertex AI dentro del proyecto GCP `nivex-it`.

**Verificar que Vertex AI esté habilitado:**
1. Ve a: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com?project=nivex-it
2. Asegúrate de que esté **ENABLED**

---

## 📧 N8N WEBHOOK (Formulario de Contacto)

### ✅ Webhook configurado
```env
✅ VITE_N8N_WEBHOOK_URL=https://n8n.nivex.cloud/webhook-test/92ffbac4-0eff-4bbd-8b5a-2d7d492b216e
```

### Datos que envía el formulario de contacto:
```json
{
  "name": "Nombre del contacto",
  "email": "email@example.com",
  "phone": "+52 1234567890",
  "message": "Mensaje del usuario"
}
```

### Sugerencia de flujo en N8N:
```
Webhook recibe POST request →
  Extraer datos (name, email, phone, message) →
    Enviar email a: contacto@nivex.cloud
      Asunto: Nuevo contacto desde nivex.cloud
      Cuerpo HTML con los datos del formulario
```

---

## 📊 GOOGLE ANALYTICS (Deshabilitado por ahora)

### Para el futuro (cuando quieras habilitarlo):
```env
# Descomentar cuando tengas el Measurement ID
# VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Cómo obtener Measurement ID:**
1. Ve a: https://analytics.google.com/
2. Crea una propiedad para nivex.cloud
3. Copia el Measurement ID (formato: G-XXXXXXXXXX)

---

## 🖼️ ASSETS Y BRANDING

### ⚠️ Imágenes que debes actualizar:

| Asset | Ubicación | Tamaño recomendado | Estado |
|-------|-----------|-------------------|---------|
| **Logo** | `public/logo.png` | 512x512px PNG | ⚠️ Actualizar |
| **Favicon SVG** | `public/favicon.svg` | Escalable | ⚠️ Actualizar |
| **Favicon ICO** | `public/favicon.ico` | 32x32px | ⚠️ Actualizar |
| **Open Graph** | `public/og-image.png` | 1200x630px | ⚠️ Actualizar |

**Open Graph Image** es la imagen que aparece cuando compartes el sitio en:
- WhatsApp
- Facebook
- Twitter/X
- LinkedIn

**Sugerencia:** Crear una imagen con:
- Logo de Nivex IT
- Texto: "Consultoría Google Cloud Platform"
- Colores corporativos (Azul GCP)

---

## 💰 ESTIMACIÓN DE COSTOS

### Vertex AI (Chatbot con Gemini 2.0 Flash)

**Modelo:** `gemini-2.0-flash-exp`

**Pricing:**
- Input: $0.075 por 1M tokens
- Output: $0.30 por 1M tokens

**Ejemplo de conversación:**
- Usuario: "¿Qué servicios ofrecen?" (~10 tokens)
- Asistente: Respuesta de ~200 tokens
- **Total por conversación:** ~210 tokens

**Estimación mensual:**

| Conversaciones/mes | Tokens totales | Costo mensual |
|-------------------|----------------|---------------|
| 100 | 21,000 (~0.021M) | **$0.01 USD** |
| 500 | 105,000 (~0.105M) | **$0.03 USD** |
| 1,000 | 210,000 (~0.21M) | **$0.06 USD** |
| 5,000 | 1,050,000 (~1.05M) | **$0.31 USD** |
| 10,000 | 2,100,000 (~2.1M) | **$0.63 USD** |

**🎉 CONCLUSIÓN:** Para un sitio pequeño con ~1,000 conversaciones/mes = **$0.06 USD/mes**

**Cuándo te ayuda Vertex AI:**
- ✅ Responder preguntas sobre servicios 24/7
- ✅ Calificar leads automáticamente
- ✅ Reducir carga de trabajo del equipo de ventas
- ✅ Capturar información de potenciales clientes
- ✅ Dar información técnica sobre GCP

---

### Google Analytics 4 (GA4)

**Precio:** **GRATIS** hasta 10M eventos/mes

**Lo que cuenta como "evento":**
- Visita a página
- Click en botón
- Envío de formulario
- Scroll en página
- Reproducción de video

**Estimación de eventos:**

| Visitas/mes | Eventos por visita | Total eventos | Costo |
|-------------|-------------------|---------------|-------|
| 1,000 | ~20 | 20,000 | **GRATIS** |
| 5,000 | ~20 | 100,000 | **GRATIS** |
| 10,000 | ~20 | 200,000 | **GRATIS** |
| 50,000 | ~20 | 1,000,000 | **GRATIS** |
| 500,000 | ~20 | 10,000,000 | **GRATIS** |

**🎉 CONCLUSIÓN:** Google Analytics es **GRATIS** para sitios pequeños y medianos.

**Solo pagas cuando:**
- Superas 10M eventos/mes (sitios muy grandes)
- Quieres exportar datos a BigQuery (opcional)

**Cuándo te ayuda Google Analytics:**
- ✅ Ver cuántas personas visitan tu sitio
- ✅ De dónde vienen (Google, redes sociales, directo)
- ✅ Qué páginas visitan más
- ✅ Cuánto tiempo pasan en el sitio
- ✅ Qué dispositivos usan (móvil, desktop)
- ✅ Conversiones (cuántos llenan el formulario)
- ✅ Datos demográficos (edad, ubicación, intereses)

**Métricas clave que verás:**
- Usuarios activos
- Nuevos vs recurrentes
- Tasa de rebote
- Páginas más visitadas
- Conversiones del formulario
- Fuentes de tráfico (orgánico, redes, directo, referidos)

**Recomendación:** Habilitar GA4 desde el inicio para tener historial de datos, aunque sea gratis.

---

## 🚀 RESUMEN DE COSTOS MENSUALES

Para un sitio pequeño de Nivex IT (~1,000 visitas/mes):

| Servicio | Costo mensual | Notas |
|----------|---------------|-------|
| **Firebase Hosting** | $0 USD | Plan Spark (gratis hasta 10GB/mes) |
| **Firebase Firestore** | $0 USD | Gratis hasta 50K lecturas/día |
| **Vertex AI (Chatbot)** | $0.06 USD | ~1,000 conversaciones/mes |
| **Google Analytics** | $0 USD | Gratis hasta 10M eventos/mes |
| **N8N Hosting** | Ya configurado | Tu servidor |
| **Dominio nivex.cloud** | ~$12 USD/año | GoDaddy/Namecheap |
| **TOTAL** | **~$0.06 USD/mes** | ≈ $1.72 USD/año + dominio |

**🎊 RESULTADO:** Costo casi nulo para operar el sitio completo.

---

## 📋 CHECKLIST DE CONFIGURACIÓN

### Configuración Básica
- [x] Crear cuenta Firebase
- [x] Obtener credenciales Firebase
- [x] Crear archivo `.env` con todas las variables
- [x] Configurar webhook N8N

### Vertex AI (Chatbot)
- [ ] Verificar que Vertex AI API esté habilitada en GCP
- [ ] Desplegar Firebase Functions (`cd functions && npm run deploy`)
- [ ] Probar chatbot en local
- [ ] Probar chatbot en producción

### Branding
- [ ] Reemplazar logo (`public/logo.png`)
- [ ] Reemplazar favicon (`public/favicon.svg` y `.ico`)
- [ ] Crear y subir Open Graph image (`public/og-image.png`)

### Contenido
- [ ] Actualizar redes sociales en Footer (si aplica)
- [ ] Revisar servicios en la web
- [ ] Probar formulario de contacto con N8N

### Google Analytics (Futuro)
- [ ] Crear propiedad en Google Analytics
- [ ] Obtener Measurement ID
- [ ] Descomentar variable en `.env`
- [ ] Agregar código de tracking al proyecto

### Testing
- [ ] Probar formulario de contacto → N8N
- [ ] Probar chatbot con Vertex AI
- [ ] Verificar que todos los links funcionen
- [ ] Probar en mobile y desktop
- [ ] Verificar Open Graph en redes sociales

### Deploy
- [ ] Build local exitoso (`npm run build`)
- [ ] Deploy Firebase Hosting (`firebase deploy --only hosting`)
- [ ] Deploy Firebase Functions (`cd functions && firebase deploy --only functions`)
- [ ] Verificar sitio en producción

---

## 🆘 SOPORTE Y DOCUMENTACIÓN

**Firebase:**
- Console: https://console.firebase.google.com/project/nivex-it
- Docs: https://firebase.google.com/docs

**Google Cloud (Vertex AI):**
- Console: https://console.cloud.google.com/vertex-ai?project=nivex-it
- Docs: https://cloud.google.com/vertex-ai/docs

**N8N:**
- Dashboard: https://n8n.nivex.cloud
- Docs: https://docs.n8n.io/

---

**Última actualización:** 2026-01-09
**Versión del proyecto:** 2.0.0 (Firebase + Vertex AI + N8N)
