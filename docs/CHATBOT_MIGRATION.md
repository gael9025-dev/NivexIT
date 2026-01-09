# Guía de Migración del Chatbot a Vertex AI

Esta guía te ayudará a migrar el chatbot de Lovable AI Gateway a **Vertex AI (Gemini)** de Google Cloud Platform.

## 📋 Requisitos Previos

1. Proyecto de Google Cloud Platform activo
2. Billing habilitado en el proyecto GCP
3. Cuenta de Supabase con proyecto configurado
4. Acceso al dashboard de Supabase

## 🚀 Paso 1: Habilitar Vertex AI en GCP

```bash
# Autenticarse en GCP
gcloud auth login

# Configurar proyecto
gcloud config set project nivex-cloud

# Habilitar Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Verificar que está habilitado
gcloud services list --enabled | grep aiplatform
```

## 🔐 Paso 2: Crear Service Account

```bash
# Crear service account
gcloud iam service-accounts create nivex-chatbot \
    --display-name="Nivex IT Chatbot" \
    --description="Service account para Vertex AI chatbot"

# Asignar permisos de Vertex AI
gcloud projects add-iam-policy-binding nivex-cloud \
    --member="serviceAccount:nivex-chatbot@nivex-cloud.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

# Generar y descargar la key JSON
gcloud iam service-accounts keys create ~/nivex-chatbot-key.json \
    --iam-account=nivex-chatbot@nivex-cloud.iam.gserviceaccount.com

# Mostrar contenido de la key (copiar para siguiente paso)
cat ~/nivex-chatbot-key.json
```

## 📝 Paso 3: Configurar Secrets en Supabase

1. Ir a Supabase Dashboard: https://supabase.com/dashboard
2. Seleccionar tu proyecto
3. Ir a **Settings** → **Edge Functions** → **Secrets**
4. Agregar los siguientes secrets:

```bash
# Opción A: Via Supabase CLI
supabase secrets set GCP_PROJECT_ID=nivex-cloud
supabase secrets set GCP_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"nivex-cloud",...}'

# Opción B: Via Dashboard (recomendado)
# Agregar manualmente en el dashboard:
# - Name: GCP_PROJECT_ID
#   Value: nivex-cloud
#
# - Name: GCP_SERVICE_ACCOUNT_KEY
#   Value: [pegar contenido completo del JSON key]
```

## 🔧 Paso 4: Desplegar el Edge Function

```bash
# Instalar Supabase CLI si no lo tienes
npm install -g supabase

# Login a Supabase
supabase login

# Link al proyecto
supabase link --project-ref pzzjxogustcgncrxaedj

# Desplegar la nueva función
supabase functions deploy chat-vertex
```

## 🔄 Paso 5: Actualizar el Frontend

Modificar `src/components/Chatbot.tsx` para usar el nuevo endpoint:

```typescript
// Cambiar de:
const { data, error } = await supabase.functions.invoke("chat", {
  body: { messages }
});

// A:
const { data, error } = await supabase.functions.invoke("chat-vertex", {
  body: { messages }
});
```

O renombrar la función para mantener el mismo endpoint:

```bash
# Eliminar función antigua
supabase functions delete chat

# Renombrar carpeta
mv supabase/functions/chat-vertex supabase/functions/chat

# Re-desplegar
supabase functions deploy chat
```

## 🧪 Paso 6: Probar el Chatbot

### Prueba Local (Desarrollo)

```bash
# Iniciar Supabase localmente
supabase start

# Servir función localmente
supabase functions serve chat --env-file .env.local

# En otra terminal, probar con curl
curl -X POST http://localhost:54321/functions/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "¿Qué servicios ofrece Nivex IT?"}
    ]
  }'
```

### Prueba en Producción

1. Abrir tu sitio en: https://nivex.cloud
2. Hacer clic en el botón del chatbot (esquina inferior derecha)
3. Enviar mensaje de prueba
4. Verificar respuesta del modelo Gemini

## 📊 Monitoreo y Logs

### Ver logs de Supabase Edge Functions

```bash
# Logs en tiempo real
supabase functions logs chat --tail

# Logs de errores
supabase functions logs chat --level error
```

### Ver logs en GCP

```bash
# Ver logs de Vertex AI
gcloud logging read "resource.type=aiplatform.googleapis.com/Endpoint" --limit 50

# Ver métricas de uso
gcloud monitoring dashboards list
```

## 💰 Costos Estimados

### Vertex AI (Gemini 2.0 Flash)

| Métrica | Precio | Estimado Mensual |
|---------|--------|------------------|
| Input tokens | $0.075 / 1M tokens | ~$0.02 |
| Output tokens | $0.30 / 1M tokens | ~$0.08 |
| **Total** | | **~$0.10 USD/mes** |

*Basado en 1000 conversaciones/mes con promedio de 500 tokens por conversación*

### Comparación con Lovable

| Servicio | Costo Mensual | Latencia | Control |
|----------|---------------|----------|---------|
| **Lovable AI** | Variable (depende de plan) | ~300ms | Limitado |
| **Vertex AI** | $0.10 - $2 | ~200ms | Total |

## 🔒 Seguridad y Mejores Prácticas

1. **Nunca commitear service account keys** en git
   ```bash
   # Agregar a .gitignore
   echo "*-key.json" >> .gitignore
   ```

2. **Rotar service account keys regularmente**
   ```bash
   # Crear nueva key
   gcloud iam service-accounts keys create ~/new-key.json \
     --iam-account=nivex-chatbot@nivex-cloud.iam.gserviceaccount.com

   # Actualizar en Supabase Secrets
   supabase secrets set GCP_SERVICE_ACCOUNT_KEY="$(cat ~/new-key.json)"

   # Eliminar key antigua
   gcloud iam service-accounts keys delete [KEY-ID] \
     --iam-account=nivex-chatbot@nivex-cloud.iam.gserviceaccount.com
   ```

3. **Configurar rate limiting**
   - Implementar límite de requests por IP
   - Configurar timeout en Edge Function
   - Monitorear uso con Cloud Monitoring

## 🆘 Troubleshooting

### Error: "GCP credentials not configured"
- Verificar que los secrets estén configurados en Supabase
- Revisar que el nombre sea exactamente `GCP_PROJECT_ID` y `GCP_SERVICE_ACCOUNT_KEY`

### Error: "Permission denied calling Vertex AI API"
- Verificar que el service account tenga el rol `roles/aiplatform.user`
- Confirmar que Vertex AI API esté habilitada

### Error: "Invalid service account key"
- Verificar que el JSON key esté completo y bien formateado
- No debe tener saltos de línea extra ni caracteres especiales

### Latencia alta (>1s)
- Verificar región del modelo (usar `us-central1`)
- Reducir `maxOutputTokens` si no necesitas respuestas largas
- Implementar caché para preguntas frecuentes

## 📚 Recursos Adicionales

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Gemini API Reference](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing)

## ✅ Checklist de Migración

- [ ] Habilitar Vertex AI API en GCP
- [ ] Crear service account con permisos
- [ ] Generar y descargar JSON key
- [ ] Configurar secrets en Supabase
- [ ] Desplegar edge function `chat-vertex`
- [ ] Actualizar frontend para usar nuevo endpoint
- [ ] Probar chatbot en desarrollo
- [ ] Probar chatbot en producción
- [ ] Configurar monitoreo y alertas
- [ ] Documentar proceso para el equipo
- [ ] Eliminar dependencia de Lovable AI

---

**¿Necesitas ayuda?** Contacta al equipo técnico en contacto@nivex.cloud
