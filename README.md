# Reparto de Nómina

App personal para repartir cada nómina entre cuentas y huchas: casa, cuenta conjunta,
gastos fijos, ocio (libre / coche / caprichos) y ahorro — con gasto rápido, huchas
remuneradas (interés compuesto o renta fija mensual) y una "criba" de fin de mes.

Un solo fichero (`index.html`), sin frameworks ni build. Instalable en el móvil como
app (PWA): abre el enlace de GitHub Pages, y en el navegador usa "Añadir a pantalla
de inicio" (iOS: botón compartir → Añadir a inicio; Android: Chrome ofrece el aviso
de instalar automáticamente).

## Publicarla en GitHub Pages

1. Crea un repositorio nuevo en GitHub (público, para que Pages sea gratis) y sube
   este contenido a la rama `main`.
2. En el repositorio: **Settings → Pages → Source: Deploy from a branch**,
   rama `main`, carpeta `/ (root)`. Guarda.
3. En un par de minutos estará en `https://<tu-usuario>.github.io/<repo>/`.

## Datos

Los datos se guardan en el propio navegador del móvil u ordenador donde la abras
(no hay servidor). Si abres el mismo enlace en varios dispositivos, cada uno tiene
su propia copia — usa **Ajustes → Exportar copia** para pasar los datos de uno a
otro, o **Importar copia** para restaurarlos.

## Estructura

- `index.html` — la app entera (HTML + CSS + JS).
- `manifest.json` — nombre, icono y colores para cuando se instala.
- `sw.js` — service worker: permite abrir la app sin conexión y que se instale.
- `icons/` — iconos en los tamaños que piden iOS, Android y el favicon.
