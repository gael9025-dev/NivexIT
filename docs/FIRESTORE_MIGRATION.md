# 🔥 Migración a Firestore - Base de Datos GCP Económica

Guía completa para migrar de Supabase a **Firestore** (Google Cloud Platform).

---

## ✅ ¿Por Qué Firestore?

### Comparación de Costos

| Base de Datos | Costo Inicial | Escalabilidad | Mantenimiento |
|---------------|---------------|---------------|---------------|
| **Firestore** ⭐ | **$0-2/mes** | Automática | Cero |
| Cloud SQL | $9.50/mes (mínimo) | Manual | Alto |
| Supabase (nuevo) | $0/mes (free tier) | Limitada | Bajo |
| Cloud Spanner | $90/mes (mínimo) | Infinita | Medio |

### Free Tier de Firestore (Generoso)

| Recurso | Límite Gratuito/Día |
|---------|---------------------|
| **Lecturas** | 50,000 |
| **Escrituras** | 20,000 |
| **Deletes** | 20,000 |
| **Storage** | 1 GB |
| **Network egress** | 10 GB/mes |

**Proyección para tu sitio:**
- Con 5,000 visitas/mes → ~167 visitas/día
- Estimado: 500-1,000 lecturas/día
- **Costo real: $0 USD/mes** (dentro del free tier)

---

## 🚀 Migración Paso a Paso

### Paso 1: Habilitar Firestore en Firebase

```bash
# 1. Ir a Firebase Console
# https://console.firebase.google.com/project/nivex-cloud/firestore

# 2. Clic en "Create database"

# 3. Seleccionar modo:
#    → Production mode (recomendado)

# 4. Seleccionar ubicación:
#    → southamerica-east1 (São Paulo) - Para LATAM
#    → us-central (Iowa) - Si prefieres US

# 5. Clic en "Enable"
```

### Paso 2: Instalar Firebase SDK

```bash
npm install firebase
```

### Paso 3: Obtener Credenciales

En Firebase Console → Project Settings (⚙️) → General:

Scroll down a **"Your apps"** → Web app → Config:

```javascript
{
  apiKey: "AIza...",
  authDomain: "nivex-cloud.firebaseapp.com",
  projectId: "nivex-cloud",
  storageBucket: "nivex-cloud.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc"
}
```

### Paso 4: Actualizar Variables de Entorno

Edita tu archivo `.env`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIza_tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=nivex-cloud.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nivex-cloud
VITE_FIREBASE_STORAGE_BUCKET=nivex-cloud.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc

# GCP (Vertex AI para Chatbot)
VITE_GCP_PROJECT_ID=nivex-cloud
VITE_VERTEX_AI_LOCATION=us-central1
```

### Paso 5: Configurar Reglas de Seguridad en Firestore

En Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Colección de contactos
    match /contacts/{contactId} {
      // Permitir escritura desde el frontend
      allow create: if request.auth == null;

      // Solo lectura con autenticación (para admin futuro)
      allow read: if request.auth != null;
    }

    // Colección de leads
    match /leads/{leadId} {
      allow create: if request.auth == null;
      allow read, update, delete: if request.auth != null;
    }

    // Por defecto: denegar todo
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Publicar reglas:** Clic en "Publish"

### Paso 6: Código de Ejemplo - Guardar Contactos

Ya creé el archivo `src/integrations/firebase/client.ts`. Aquí un ejemplo de uso:

**Ejemplo en tu componente Contact:**

```typescript
// src/components/ContactMultiStep.tsx o Contact.tsx
import { saveContact } from '@/integrations/firebase/client';

const handleSubmit = async (data: ContactFormData) => {
  try {
    // Guardar en Firestore
    const result = await saveContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    if (result.success) {
      toast.success("¡Mensaje enviado! Te contactaremos pronto.");
    } else {
      toast.error("Error al enviar mensaje. Intenta nuevamente.");
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error("Error inesperado.");
  }
};
```

### Paso 7: Probar Localmente

```bash
# Reiniciar dev server
npm run dev

# Probar el formulario de contacto
# Verificar en Firebase Console → Firestore → contacts
```

### Paso 8: Configurar GitHub Actions (CI/CD)

Actualizar secrets en GitHub:

```
VITE_FIREBASE_API_KEY = AIza...
VITE_FIREBASE_AUTH_DOMAIN = nivex-cloud.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = nivex-cloud
VITE_FIREBASE_STORAGE_BUCKET = nivex-cloud.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = 123456789
VITE_FIREBASE_APP_ID = 1:123:web:abc
```

### Paso 9: Deploy a Producción

```bash
npm run deploy
```

---

## 📊 Estructura de Datos Recomendada

### Colección: `contacts`

```javascript
{
  id: "auto-generated-id",
  name: "Juan Pérez",
  email: "juan@empresa.com",
  phone: "+52 55 1234 5678",
  company: "Empresa SA",
  message: "Necesito consultoría en GCP...",
  source: "website", // website, chatbot, etc.
  status: "new", // new, contacted, qualified, closed
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Colección: `leads`

```javascript
{
  id: "auto-generated-id",
  contactId: "reference-to-contact",
  industry: "fintech",
  budget: "medium", // low, medium, high
  timeline: "3-months",
  services: ["migration", "security"],
  priority: "high",
  assignedTo: "sales-team-member-id",
  createdAt: Timestamp,
  closedAt: Timestamp | null
}
```

### Colección: `chatbot_conversations` (opcional)

```javascript
{
  id: "auto-generated-id",
  sessionId: "uuid",
  messages: [
    { role: "user", content: "¿Qué servicios ofrecen?", timestamp: Timestamp },
    { role: "assistant", content: "Ofrecemos...", timestamp: Timestamp }
  ],
  email: "user@email.com" | null,
  resolved: true,
  createdAt: Timestamp
}
```

---

## 🔒 Seguridad Adicional

### App Check (Recomendado para Producción)

Protege tu Firestore de accesos no autorizados:

```bash
# 1. Habilitar App Check en Firebase Console
# 2. Configurar reCAPTCHA v3 para web

# 3. Agregar SDK en tu app
npm install firebase/app-check
```

```typescript
// src/integrations/firebase/client.ts
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Después de initializeApp
if (import.meta.env.PROD) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('tu-recaptcha-site-key'),
    isTokenAutoRefreshEnabled: true
  });
}
```

---

## 🎯 Migrar el Chatbot

### Opción 1: Mantener Supabase Edge Functions

Si prefieres mantener Supabase solo para edge functions del chatbot:

```bash
# Mantener variables de Supabase en .env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...

# Firestore para datos de contactos
# Supabase edge functions para chatbot
```

### Opción 2: Migrar Chatbot a Cloud Functions (Firebase)

```bash
# Crear función en Firebase
firebase init functions

# Crear función similar a chat-vertex
# Ver: functions/src/chat.ts
```

Ejemplo básico:

```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import { VertexAI } from '@google-cloud/vertexai';

export const chat = functions.https.onCall(async (data, context) => {
  const { messages } = data;

  const vertexAI = new VertexAI({
    project: 'nivex-cloud',
    location: 'us-central1',
  });

  const model = vertexAI.preview.getGenerativeModel({
    model: 'gemini-2.0-flash',
  });

  const result = await model.generateContent({
    contents: messages,
  });

  return { response: result.response.text() };
});
```

---

## 💰 Proyección de Costos Reales

### Escenario 1: Inicio (1,000 visitas/mes)

| Operación | Cantidad/día | Costo |
|-----------|--------------|-------|
| Lecturas | 500 | $0.00 (free) |
| Escrituras | 20 | $0.00 (free) |
| Storage | 10 MB | $0.00 (free) |
| **TOTAL** | | **$0.00/mes** |

### Escenario 2: Crecimiento (10,000 visitas/mes)

| Operación | Cantidad/día | Costo |
|-----------|--------------|-------|
| Lecturas | 5,000 | $0.00 (free) |
| Escrituras | 200 | $0.00 (free) |
| Storage | 100 MB | $0.00 (free) |
| **TOTAL** | | **$0.00/mes** |

### Escenario 3: Producción (100,000 visitas/mes)

| Operación | Cantidad/día | Costo mensual |
|-----------|--------------|---------------|
| Lecturas | 100,000 | $1.80 |
| Escrituras | 5,000 | $0.54 |
| Storage | 1 GB | $0.18 |
| **TOTAL** | | **~$2.52/mes** |

**Comparado con Cloud SQL**: $9.50/mes mínimo → **Ahorro del 73%**

---

## 📚 Queries Comunes en Firestore

### Obtener todos los contactos nuevos

```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';

const getNewContacts = async () => {
  const q = query(
    collection(db, 'contacts'),
    where('status', '==', 'new')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

### Actualizar status de un contacto

```typescript
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';

const updateContactStatus = async (contactId: string, status: string) => {
  const contactRef = doc(db, 'contacts', contactId);
  await updateDoc(contactRef, {
    status,
    updatedAt: serverTimestamp()
  });
};
```

### Escuchar cambios en tiempo real

```typescript
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';

const unsubscribe = onSnapshot(
  collection(db, 'contacts'),
  (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        console.log('Nuevo contacto:', change.doc.data());
        // Notificación push, email, etc.
      }
    });
  }
);
```

---

## ✅ Checklist de Migración

- [ ] Habilitar Firestore en Firebase Console
- [ ] Obtener credenciales de Firebase
- [ ] Instalar `firebase` npm package
- [ ] Actualizar `.env` con variables Firebase
- [ ] Configurar reglas de seguridad
- [ ] Crear cliente Firebase (`src/integrations/firebase/client.ts`)
- [ ] Actualizar formulario de contacto
- [ ] Probar localmente
- [ ] Actualizar GitHub Secrets (CI/CD)
- [ ] Deploy a producción
- [ ] Verificar que los datos se guardan en Firestore

---

## 🆘 Troubleshooting

### Error: "Missing or insufficient permissions"
- Verificar reglas de seguridad en Firestore
- Permitir `allow create: if request.auth == null;` para contactos

### Error: "Firebase: Firebase App named '[DEFAULT]' already exists"
- Ya inicializaste Firebase. Usa `getApp()` en vez de `initializeApp()`

### Datos no se guardan
- Verificar que las credenciales en `.env` son correctas
- Verificar en Firebase Console → Firestore → Data

---

## 🎉 Ventajas de Firestore vs Supabase

| Feature | Firestore | Supabase |
|---------|-----------|----------|
| **Costo inicial** | $0 (1GB free) | $0 (500MB free) |
| **Escalabilidad** | Automática | Manual (upgrade) |
| **Latencia** | 10-50ms | 50-200ms |
| **Integración GCP** | Nativa | Externa |
| **Mantenimiento** | Cero | Bajo |
| **Vendor lock-in** | Alto (GCP) | Medio |

---

**Tiempo estimado de migración**: 30-45 minutos

**¿Necesitas ayuda?** → contacto@nivex.cloud
