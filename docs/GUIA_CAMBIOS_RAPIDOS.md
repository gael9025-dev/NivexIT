# 📝 Guía de Cambios Rápidos - Nivex IT

Esta guía te muestra cómo hacer cambios comunes en el sitio web sin necesidad de conocimientos técnicos profundos.

---

## 📞 Cambiar Número de Teléfono

El número de teléfono aparece en múltiples lugares del sitio. Para cambiarlo:

### Archivos a modificar:

1. **src/components/Footer.tsx** (línea ~77)
   ```tsx
   <a href="tel:+525566699281" className="hover:text-accent transition-colors">
     +52 55 6669 9281
   </a>
   ```

2. **src/components/Contact.tsx** (línea ~30)
   ```tsx
   {
     icon: Phone,
     title: "Teléfono",
     info: "+52 55 6669 9281",
     link: "tel:+525566699281",
   }
   ```

3. **src/pages/PrivacyPolicy.tsx** (línea ~119)
   ```tsx
   <a href="tel:+525566699281">+52 55 6669 9281</a>
   ```

4. **CONFIG.md** (línea ~13-14)
   ```
   EMPRESA_TELEFONO=+52 55 6669 9281
   EMPRESA_WHATSAPP=+52 55 6669 9281
   ```

5. **README.md** (buscar el número y reemplazar)

6. **functions/src/index.js** (en el system prompt del chatbot, línea ~65)

### Comando rápido para buscar todas las ocurrencias:

```bash
grep -r "55 6669 9281" src/
```

### Después de hacer los cambios:

```bash
npm run build
firebase deploy --only hosting
```

---

## 📧 Cambiar Email de Contacto

### Archivos a modificar:

1. **src/components/Footer.tsx**
   - Busca: `sales@nivex.cloud`
   - Reemplaza con tu nuevo email

2. **src/components/Contact.tsx**
   ```tsx
   {
     icon: Mail,
     title: "Email",
     info: "sales@nivex.cloud",  // <-- Cambiar aquí
     link: "mailto:sales@nivex.cloud",  // <-- Y aquí
   }
   ```

3. **src/pages/PrivacyPolicy.tsx**
   - Busca y reemplaza `contacto@nivex.cloud`

4. **CONFIG.md**
   ```
   EMPRESA_EMAIL=sales@nivex.cloud
   ```

---

## 🏢 Cambiar Nombre de la Empresa

### Archivos a modificar:

1. **src/components/Footer.tsx** (línea ~33)
   ```tsx
   <span className="text-2xl font-bold text-gradient">Nivex IT</span>
   ```

2. **src/components/Navbar.tsx** (buscar "Nivex IT")

3. **src/pages/PrivacyPolicy.tsx** (múltiples referencias)

4. **CONFIG.md**
   ```
   EMPRESA_NOMBRE=Nivex IT
   ```

5. **package.json**
   ```json
   "name": "nivex-it"
   ```

6. **index.html** (título del sitio)
   ```html
   <title>Nivex IT - Consultoría Google Cloud Platform</title>
   ```

---

## 📍 Cambiar Ubicación/Dirección

### Archivos a modificar:

1. **src/components/Footer.tsx** (línea ~80)
   ```tsx
   <li>Ciudad de México, México</li>
   ```

2. **src/components/Contact.tsx** (línea ~35)
   ```tsx
   {
     icon: MapPin,
     title: "Ubicación",
     info: "Ciudad de México, México",  // <-- Cambiar aquí
   }
   ```

3. **CONFIG.md**
   ```
   EMPRESA_DIRECCION=Ciudad de México, México
   ```

---

## 🎨 Cambiar Colores del Sitio

Los colores se definen en **src/index.css** (líneas ~10-30):

```css
:root {
  --accent: 217 91% 60%;        /* Azul principal */
  --primary: 221 83% 53%;       /* Azul secundario */
  --secondary: 210 40% 96.1%;  /* Gris claro */
  /* ... más colores */
}
```

### Formato de colores:
Los colores usan formato HSL (Hue, Saturation, Lightness):
- **Hue (Matiz)**: 0-360 (rojo=0, verde=120, azul=240)
- **Saturation (Saturación)**: 0-100% (0%=gris, 100%=color vivo)
- **Lightness (Luminosidad)**: 0-100% (0%=negro, 50%=color medio, 100%=blanco)

**Ejemplo para cambiar a verde:**
```css
--accent: 142 71% 45%;  /* Verde */
--primary: 158 64% 52%; /* Verde más claro */
```

---

## 📝 Cambiar Textos del Hero (Página Principal)

Archivo: **src/components/Hero.tsx**

```tsx
<h1>
  <span className="text-gradient">Nivex IT</span>
  <br />
  Consultoría Especializada en Google Cloud Platform
</h1>

<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
  Transformamos infraestructuras críticas con soluciones enterprise...
</p>
```

---

## 🔗 Cambiar Enlaces de Redes Sociales

Archivo: **src/components/Footer.tsx** (líneas ~84-100)

```tsx
<a
  href="https://www.linkedin.com/company/nivex-it"  // <-- Cambiar aquí
  target="_blank"
  rel="noopener noreferrer"
>
  <Linkedin className="w-5 h-5" />
</a>

<a
  href="https://github.com/nivex-it"  // <-- Cambiar aquí
  target="_blank"
  rel="noopener noreferrer"
>
  <Github className="w-5 h-5" />
</a>
```

---

## 🛠️ Workflow Completo para Cualquier Cambio

### 1. Hacer cambios en los archivos

Usa VSCode, Vim, o cualquier editor de código.

### 2. Verificar cambios localmente

```bash
npm run dev
```

Abre http://localhost:8080 en tu navegador.

### 3. Construir para producción

```bash
npm run build
```

### 4. Desplegar a Firebase

```bash
firebase deploy --only hosting
```

### 5. Verificar el sitio en producción

- Firebase: https://nivex-it.web.app
- Tu dominio: https://nivex.cloud

---

## 🔍 Herramientas Útiles

### Buscar texto en todos los archivos:

```bash
# Linux/Mac/WSL
grep -r "texto a buscar" src/

# Windows (PowerShell)
Select-String -Path "src\*" -Pattern "texto a buscar" -Recurse
```

### Reemplazar texto en múltiples archivos:

```bash
# Linux/Mac/WSL
find src/ -type f -name "*.tsx" -exec sed -i 's/texto_viejo/texto_nuevo/g' {} +

# Mejor usar el editor VSCode:
# Ctrl+Shift+F → Buscar
# Ctrl+Shift+H → Buscar y reemplazar
```

---

## ⚠️ Importante

### Archivos que NO debes modificar (a menos que sepas lo que haces):

- `package.json` (dependencias del proyecto)
- `vite.config.ts` (configuración de Vite)
- `tsconfig.json` (configuración de TypeScript)
- `tailwind.config.ts` (configuración de Tailwind)
- Cualquier archivo en `node_modules/`

### Siempre hacer backup antes de cambios importantes:

```bash
# Crear backup del proyecto
cp -r /ruta/al/proyecto /ruta/backup/proyecto-backup-$(date +%Y%m%d)
```

### Probar siempre localmente antes de desplegar:

```bash
npm run dev  # Verificar que todo funciona
npm run build  # Verificar que compila sin errores
firebase deploy --only hosting  # Desplegar solo si todo está OK
```

---

## 📞 ¿Necesitas Ayuda?

Si algo sale mal o necesitas hacer cambios más complejos:

1. Revisa los logs de error en la terminal
2. Busca el error en Google o Stack Overflow
3. Consulta la documentación oficial:
   - React: https://react.dev
   - Vite: https://vitejs.dev
   - Tailwind CSS: https://tailwindcss.com
   - Firebase: https://firebase.google.com/docs

---

**Última actualización:** 2026-01-11
