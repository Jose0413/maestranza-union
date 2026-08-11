# Maestranza Union — sitio web

Sitio web de una sola página para un taller de construcciones metálicas.
Secciones: **Inicio → Nosotros → Servicios → Galería → Contacto**.

Es HTML, CSS y JavaScript puros (sin frameworks ni build), así que no necesita instalación ni `npm install`: se abre y se sube tal cual.

## Estructura del proyecto

```
maestranza-union/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   └── script.js       # Scroll reveal, nav lateral, formulario
├── assets/
│   ├── logo.png          # Logo de la empresa
│   └── gallery/          # Fotos reales del taller (hero, nosotros, servicios, galería)
└── README.md
```

## Ver el sitio en tu computador

No necesitas servidor: abre `index.html` directamente en el navegador (doble clic, o clic derecho → "Abrir con").

## Subirlo a un repositorio (GitHub)

1. Crea un repositorio nuevo en [github.com](https://github.com), por ejemplo `maestranza-union`.
2. En tu computador, dentro de la carpeta `maestranza-union`:
   ```bash
   git init
   git add .
   git commit -m "Sitio web Maestranza Union"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/maestranza-union.git
   git push -u origin main
   ```
3. Reemplaza `TU-USUARIO` por tu usuario de GitHub.

## Dónde hostearlo gratis

Todas estas opciones son gratuitas para un sitio estático como este y se conectan directo a tu repositorio de GitHub (cada vez que hagas `git push`, el sitio se actualiza solo):

### Opción 1 — GitHub Pages (la más simple, mismo lugar que el repo)
1. En GitHub, entra a tu repositorio → **Settings** → **Pages**.
2. En "Source", elige la rama `main` y la carpeta `/ (root)`.
3. Guarda. En 1–2 minutos tu sitio queda publicado en:
   `https://TU-USUARIO.github.io/maestranza-union/`

### Opción 2 — Netlify
1. Entra a [netlify.com](https://www.netlify.com) y crea una cuenta (puede ser con tu cuenta de GitHub).
2. "Add new site" → "Import an existing project" → conecta GitHub → elige el repo `maestranza-union`.
3. Deja las opciones por defecto (no hay build command, es HTML plano) y publica.
4. Netlify te da una URL tipo `https://maestranza-union.netlify.app` y puedes conectar un dominio propio gratis.

### Opción 3 — Vercel
1. Entra a [vercel.com](https://vercel.com), conecta tu cuenta de GitHub.
2. "Add New" → "Project" → elige el repo.
3. Framework: "Other" (sitio estático). Deploy.

### Opción 4 — Cloudflare Pages
1. Entra a [pages.cloudflare.com](https://pages.cloudflare.com), conecta GitHub.
2. Elige el repo, sin build command, carpeta de salida `/`.
3. Deploy.

**Recomendación:** si solo quieres algo simple y gratis conectado a tu repo, usa **GitHub Pages**. Si más adelante quieres dominio propio, certificados automáticos y despliegues más rápidos, **Netlify** o **Cloudflare Pages** son igual de gratuitos y un poco más cómodos de administrar.

## Hacer que el formulario de contacto funcione (Vercel + Formspree)

Vercel hostea el sitio, pero no procesa formularios por su cuenta (a diferencia de Netlify). El formulario ya está preparado para conectarse a **Formspree**, un servicio gratuito que recibe el envío y te lo manda al correo.

1. Entra a [formspree.io](https://formspree.io) y crea una cuenta gratis (hasta 50 envíos al mes).
2. Crea un nuevo formulario ("New Form") y usa tu correo de contacto, por ejemplo `contacto@maestranzaunion.cl`.
3. Formspree te da un endpoint como `https://formspree.io/f/abcd1234`.
4. Abre `index.html`, busca esta línea (dentro de la sección `#contacto`):
   ```html
   <form id="contact-form" action="https://formspree.io/f/TU_ID_DE_FORMSPREE" method="POST">
   ```
   y reemplaza `TU_ID_DE_FORMSPREE` por el ID que te dio Formspree.
5. Guarda, haz `git add . && git commit -m "Conectar formulario" && git push`.
6. Vercel vuelve a desplegar solo. Prueba el formulario en tu URL de Vercel — el primer envío real, Formspree te pedirá confirmar el formulario haciendo clic en un link que te llega al correo. Después de esa confirmación, los envíos llegan directo.

No necesitas tocar nada más: `js/script.js` ya envía los datos por `fetch` y muestra "Solicitud enviada ✓" o un aviso de error si algo falla.

## Personalizar contenido

- **Textos y datos de contacto:** edita directamente `index.html` (teléfono, correo, dirección están cerca del final, en la sección `#contacto`).
- **Colores:** están centralizados como variables al inicio de `css/styles.css` (bloque `:root`), tomados del azul del logo (`#0A499A`).
- **Logo:** reemplaza `assets/logo.png` por una versión en mayor resolución si la tienes, manteniendo el mismo nombre de archivo.
- **Fotos:** están en `assets/gallery/`. Para cambiar una foto, reemplaza el archivo manteniendo el mismo nombre, o agrega uno nuevo y actualiza la ruta `src="assets/gallery/..."` correspondiente en `index.html` (hero, sección Nosotros, tarjetas de Servicios y Galería).
