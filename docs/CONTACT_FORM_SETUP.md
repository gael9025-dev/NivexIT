# 📧 Configuración del Formulario de Contacto

Guía rápida para configurar dónde se guardan los contactos del formulario.

---

## Estado Actual

✅ **Formulario funciona** pero solo muestra los datos en consola (para testing)
⚠️ **No se guardan** los contactos permanentemente

---

## Opciones de Configuración

### OPCIÓN 1: Firestore (GRATIS) ⭐ RECOMENDADA

**Ventajas:**
- ✅ Totalmente gratis (50K escrituras/día en free tier)
- ✅ Ya tienes Firebase configurado
- ✅ Panel de administración en Firebase Console
- ✅ Búsqueda y filtros incorporados

**Pasos:**

1. **Habilitar Firestore**
   ```bash
   # Ir a: https://console.firebase.google.com/project/nivex-it/firestore
   # Clic en "Create database"
   # Mode: Production
   # Location: southamerica-east1 (São Paulo)
   ```

2. **Instalar Firebase SDK**
   ```bash
   npm install firebase
   ```

3. **Actualizar .env**
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=nivex-it.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=nivex-it
   VITE_FIREBASE_STORAGE_BUCKET=nivex-it.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123:web:abc
   ```

4. **Actualizar ContactMultiStep.tsx**
   ```typescript
   // Línea 1: Agregar import
   import { saveContact } from '@/integrations/firebase/client';

   // Línea 103-109: Descomentar
   const result = await saveContact(validatedData);
   if (!result.success) throw new Error("Error al guardar");

   // Línea 123: Comentar (o eliminar) la línea de console.log
   ```

5. **Configurar Reglas de Seguridad**
   En Firebase Console → Firestore → Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /contacts/{contactId} {
         allow create: if request.auth == null;
         allow read: if request.auth != null;
       }
     }
   }
   ```
   Clic en "Publish"

6. **Ver Contactos**
   - Firebase Console → Firestore → Data
   - Colección: `contacts`

**Costo:** $0 USD/mes (hasta 20K contactos/día)

---

### OPCIÓN 2: Make.com Webhook

**Ventajas:**
- ✅ Envío automático de emails
- ✅ Integración con CRM (HubSpot, Salesforce, etc.)
- ✅ Automatizaciones complejas

**Pasos:**

1. **Crear Webhook en Make.com**
   - Ir a: https://make.com
   - Crear nuevo Scenario
   - Agregar módulo "Webhooks" → "Custom webhook"
   - Copiar la URL del webhook (ej: `https://hook.us2.make.com/xyz123...`)

2. **Configurar Acción**
   - Agregar módulo "Email" → "Send an email"
   - Configurar destinatario, asunto, mensaje
   - Activar el scenario

3. **Actualizar ContactMultiStep.tsx**
   ```typescript
   // Línea 114: Reemplazar con tu webhook real
   const response = await fetch("https://hook.us2.make.com/TU_WEBHOOK_REAL", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(validatedData),
   });
   if (!response.ok) throw new Error("Error al enviar");
   ```

4. **Descomentar líneas 113-120** en ContactMultiStep.tsx

**Costo:**
- Free tier: 1,000 operaciones/mes
- Pro: $9 USD/mes (10,000 operaciones)

---

### OPCIÓN 3: Firebase Cloud Functions + Email

**Ventajas:**
- ✅ Envío de emails automático
- ✅ Todo en GCP
- ✅ Serverless

**Pasos:**

1. **Crear Cloud Function**
   ```bash
   firebase init functions
   ```

2. **Instalar nodemailer**
   ```bash
   cd functions
   npm install nodemailer
   ```

3. **Crear función de email**
   ```typescript
   // functions/src/index.ts
   import * as functions from 'firebase-functions';
   import * as nodemailer from 'nodemailer';

   export const sendContactEmail = functions.https.onCall(async (data) => {
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'contacto@nivex.cloud',
         pass: process.env.EMAIL_PASSWORD
       }
     });

     await transporter.sendMail({
       from: 'contacto@nivex.cloud',
       to: 'egrb@nivex.cloud',
       subject: `Nuevo contacto: ${data.name}`,
       html: `
         <h2>Nuevo contacto desde el sitio web</h2>
         <p><strong>Nombre:</strong> ${data.name}</p>
         <p><strong>Email:</strong> ${data.email}</p>
         <p><strong>Empresa:</strong> ${data.company}</p>
         <p><strong>Mensaje:</strong> ${data.message}</p>
       `
     });

     return { success: true };
   });
   ```

4. **Deploy**
   ```bash
   firebase deploy --only functions
   ```

5. **Actualizar ContactMultiStep.tsx**
   ```typescript
   import { getFunctions, httpsCallable } from 'firebase/functions';

   const functions = getFunctions();
   const sendEmail = httpsCallable(functions, 'sendContactEmail');

   await sendEmail(validatedData);
   ```

**Costo:** $0.40 por 1M invocaciones (primeros 2M gratis/mes)

---

## Recomendación

Para empezar rápido:

1. **Hoy**: Usar modo consola (ya está configurado)
2. **Esta semana**: Configurar Firestore (30 min, gratis)
3. **Más adelante**: Agregar Cloud Functions para emails automáticos

---

## Ver Contactos Recibidos

### Mientras uses Console.log (temporal)

1. Abrir DevTools en el navegador (F12)
2. Ir a pestaña "Console"
3. Los contactos aparecerán como: `📧 Contacto recibido: {...}`

### Con Firestore

1. Firebase Console → Firestore → Data
2. Colección: `contacts`
3. Ver, buscar, filtrar, exportar

### Con Make.com

1. Make.com Dashboard → History
2. Ver todas las ejecuciones
3. Datos guardados según configuración

---

## Próximos Pasos

Después de configurar la base de datos:

1. ✅ Crear panel de admin para ver contactos
2. 📧 Configurar emails automáticos de confirmación
3. 🔔 Notificaciones push/Slack cuando llega contacto nuevo
4. 📊 Dashboard de métricas (leads, conversión, etc.)

---

**Tiempo de configuración:**
- Firestore: ~30 minutos
- Make.com: ~15 minutos
- Cloud Functions: ~1 hora

**¿Necesitas ayuda?** → contacto@nivex.cloud
